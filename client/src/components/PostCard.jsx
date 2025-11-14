import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <article className="bg-white p-4 rounded shadow-sm">
      <h2 className="text-xl font-semibold"><Link to={`/posts/${post._id}`}>{post.title}</Link></h2>
      <p className="text-sm text-gray-600">{post.excerpt || post.content.slice(0,120)+'...'}</p>
      <div className="text-xs text-gray-500 mt-2">By {post.author?.name || 'Unknown'}</div>
    </article>
  );
}
