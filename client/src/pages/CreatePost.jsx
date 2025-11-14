import { useState, useEffect, useContext } from "react";
import { categoryService, postServiceMultipart } from "../services/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function CreatePost() {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  // Load categories on mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await categoryService.getAllCategories();
        console.log('Categories loaded:', data); // debug log
        setCategories(data);
        if (data.length > 0) setCategory(data[0]._id); // default to first category
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    };
    loadCategories();
  }, []);

  if (!user) {
    return (
      <p>
        Please <a href="/login">login</a> to create posts.
      </p>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append('title', title);
    fd.append('excerpt', excerpt);
    fd.append('content', content);
    fd.append('category', category);
    if (file) fd.append('featuredImage', file);

    try {
      await postServiceMultipart.createPostMultipart(fd);
      navigate('/');
    } catch (error) {
      console.error('Failed to create post:', error);
      alert('Error creating post. Check console for details.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-3">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="p-2 border"
        required
      />
      <input
        value={excerpt}
        onChange={(e) => setExcerpt(e.target.value)}
        placeholder="Excerpt"
        className="p-2 border"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content (HTML OK)"
        className="p-2 border h-48"
        required
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="p-2 border"
        required
      >
        {categories.length === 0 && <option>Loading categories...</option>}
        {categories.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button className="px-3 py-1 bg-green-600 text-white rounded">
        Create Post
      </button>
    </form>
  );
}
