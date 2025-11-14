import usePosts from "../hooks/usePosts";
import PostCard from "../components/postcard.jsx";

export default function Home() {
  const { data, loading } = usePosts(1, 10);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-bold">Latest Posts</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {data.posts.map(p => <PostCard key={p._id} post={p} />)}
      </div>
    </div>
  );
}
