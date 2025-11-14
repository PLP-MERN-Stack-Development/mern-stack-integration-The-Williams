const mongoose = require('mongoose');
const Post = require('../models/Post');
const { validationResult } = require('express-validator');

// GET /api/posts
exports.getPosts = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = '', category } = req.query;
    page = Number(page); limit = Number(limit);
    const filter = { isPublished: true };
    if (search) filter.$text = { $search: search };
    if (category) filter.category = category;

    const total = await Post.countDocuments(filter);
    const posts = await Post.find(filter)
      .populate('author', 'name')
      .populate('category', 'name')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    res.json({ total, page, limit, posts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single post
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name')
      .populate('category', 'name');
    if (!post) return res.status(404).json({ message: 'Not found' });
    await post.incrementViewCount();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE post
exports.createPost = async (req, res) => {
  const errs = validationResult(req);
  if (!errs.isEmpty()) return res.status(400).json({ errors: errs.array() });

  try {
    const { title, excerpt, content, category } = req.body;

    if (!title || !content || !category) {
      return res.status(400).json({ message: 'Title, content, and category are required' });
    }

    // Ensure author is a valid ObjectId
    const author = req.user.id;
    if (!mongoose.Types.ObjectId.isValid(author)) {
      return res.status(400).json({ message: 'Invalid author ID' });
    }

    // Handle optional featured image
    const featuredImage = req.file ? `/uploads/${req.file.filename}` : 'default-post.jpg';

    // Ensure slug is generated even if pre-save hook misfires
    let slug = title
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');

    const post = new Post({
        title,
        excerpt,
        content,
        category,
        author,
        featuredImage,
        slug,
        
        isPublished: true
    });

    await post.save();

    console.log('Post created:', post);

    res.status(201).json(post);
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ message: err.message });
  }
};

// UPDATE post
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Not found' });

    // only author or admin can update
    if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const { title, excerpt, content, category } = req.body;
    const updates = { title, excerpt, content, category };

    if (req.file) updates.featuredImage = `/uploads/${req.file.filename}`;

    const updated = await Post.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(updated);
  } catch (err) {
    console.error('Error updating post:', err);
    res.status(500).json({ message: err.message });
  }
};

// DELETE post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Not found' });
    if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin')
      return res.status(403).json({ message: 'Forbidden' });

    await post.remove();
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json({ message: err.message });
  }
};

// ADD comment
exports.addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Not found' });

    await post.addComment(req.user._id, content);
    res.status(201).json(post);
  } catch (err) {
    console.error('Error adding comment:', err);
    res.status(500).json({ message: err.message });
  }
};
