import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
}

// Data professional page. Fetches blog posts tagged with 'data' from Supabase and
// lists representative projects.
export default function DataPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('id, title, excerpt, slug, tags')
          .contains('tags', ['data']);
        if (error) throw error;
        setPosts(
          data?.map((row: any) => ({
            id: row.id,
            title: row.title,
            excerpt: row.excerpt,
            slug: row.slug,
          })) || []
        );
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <>
      <Hero
        heading="Data Professional"
        subheading="Turning raw data into meaningful stories through analysis, modelling and visualisation."
      />
      <div className="container">
        <h2>Featured Data Projects</h2>
        <ul>
          <li>
            <strong>Customer Churn Prediction:</strong> Built an end‑to‑end pipeline to predict customer churn for a telecom company, achieving 92% ROC‑AUC.
          </li>
          <li>
            <strong>Interactive Sales Dashboard:</strong> Designed Tableau dashboards to analyse sales data across regions, uncovering 30% improvement opportunities.
          </li>
        </ul>

        <h2 style={{ marginTop: '2rem' }}>Latest Data Posts</h2>
        {loading && <p>Loading posts…</p>}
        {error && <p>Error loading posts: {error}</p>}
        {!loading && posts.length === 0 && <p>No data posts yet.</p>}
        <ul>
          {posts.map((post) => (
            <li key={post.id} style={{ marginBottom: '1rem' }}>
              <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              <p style={{ margin: 0 }}>{post.excerpt}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}