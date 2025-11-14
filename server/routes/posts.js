const express = require('express');
const { body } = require('express-validator');
const multer = require('multer');
const path = require('path');
const {
  getPosts, getPost, createPost, updatePost, deletePost, addComment
} = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// list / search / paginate
router.get('/', getPosts);

// get single
router.get('/:id', getPost);

// create (protected)
router.post(
  '/',
  protect,
  upload.single('featuredImage'),
  [
    body('title').notEmpty().withMessage('Title required'),
    body('content').notEmpty().withMessage('Content required'),
    body('category').notEmpty().withMessage('Category required')
  ],
  createPost
);

// update
router.put('/:id', protect, upload.single('featuredImage'), updatePost);

// delete
router.delete('/:id', protect, deletePost);

// comments
router.post('/:id/comments', protect, addComment);

module.exports = router;
