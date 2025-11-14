import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { postService } from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    postService.getPost(id).then(setPost);
  }, [id]);

  const addComment = async (e) => {
    e.preventDefault();
    if (!user) return window.location.href = '/login';
    await postService.addComment(id, { content: commentText });
    const updated = await postService.getPost(id);
    setPost(updated);
    setCommentText('');
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      {post.featuredImage && <img src={import.meta.env.VITE_UPLOADS_URL + post.featuredImage.replace('/uploads','')} alt="" className="mb-4 max-w-full" />}
      <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }} />
      <section className="mt-6">
        <h3 className="font-semibold">Comments</h3>
        {post.comments.map((c, i) => <div key={i} className="border p-2 my-2">{c.content}<div className="text-xs text-gray-500">By {c.user}</div></div>)}
        <form onSubmit={addComment} className="mt-3">
          <textarea required value={commentText} onChange={e=>setCommentText(e.target.value)} className="w-full p-2 border rounded" />
          <button className="mt-2 px-3 py-1 bg-blue-600 text-white rounded">Add Comment</button>
        </form>
      </section>
    </div>
  );
}
