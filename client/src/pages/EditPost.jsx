import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { postService, categoryService } from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function EditPost() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    postService.getPost(id).then(setPost);
    categoryService.getAllCategories().then(setCategories);
  },[id]);

  if (!post) return <p>Loading...</p>;
  if (!user || user.id !== post.author?._id) return <p>Not allowed to edit</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: re-use create form logic - send FormData if changing image
    const updates = { title: post.title, content: post.content, category: post.category._id };
    await postService.updatePost(id, updates);
    navigate(`/posts/${id}`);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-3">
      <input value={post.title} onChange={e=>setPost({...post, title: e.target.value})} className="p-2 border" />
      <textarea value={post.content} onChange={e=>setPost({...post, content: e.target.value})} className="p-2 border h-48" />
      <select value={post.category?._id || ''} onChange={e=>setPost({...post, category: { _id: e.target.value }})} className="p-2 border">
        {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
      </select>
      <button className="px-3 py-1 bg-yellow-600 text-white rounded">Save</button>
    </form>
  );
}
