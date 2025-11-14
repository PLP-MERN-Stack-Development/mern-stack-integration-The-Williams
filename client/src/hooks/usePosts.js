import { useState, useEffect } from "react";
import { postService } from "../services/api";

export default function usePosts(page = 1, limit = 10, category = null) {
  const [data, setData] = useState({ posts: [], total: 0, page, limit });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = async (p = page) => {
    setLoading(true);
    try {
      const res = await postService.getAllPosts(p, limit, category);
      setData(res);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => { fetch(); }, [page, limit, category]);

  return { data, loading, error, refetch: fetch };
}
