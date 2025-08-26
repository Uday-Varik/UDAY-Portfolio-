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

// AI/ML engineer page. Fetches blog posts tagged with 'ai' from Supabase and
// lists them. Projects and case studies could be added similarly.
export default function AIPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('id, title, excerpt, slug, tags')
          .contains('tags', ['ai']);
        if (error) {
          throw error;
        }
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
        heading="AI/ML Engineer"
        subheading="Designing and implementing machine learning models, building AI-driven products and exploring cutting-edge research."
      />
      <div className="container">
        <h2>Featured Projects</h2>
        <p>
          Below are a few representative AI/ML projects. Each project delves into a problem statement, outlines the approach and highlights the impact.
        </p>
        {/* Sample projects list. Replace with dynamic content if desired. */}
        <ul>
          <li>
            <strong>Smart Recommendation System:</strong> A personalised recommendation engine for an e‑commerce platform using collaborative filtering and neural networks.
          </li>
          <li>
            <strong>Speech Emotion Recognition:</strong> A deep learning model that identifies emotional tone in voice recordings to improve call‑centre experiences.
          </li>
        </ul>

        <h2 style={{ marginTop: '2rem' }}>Latest AI Posts</h2>
        {loading && <p>Loading posts…</p>}
        {error && <p>Error loading posts: {error}</p>}
        {!loading && posts.length === 0 && <p>No AI posts yet.</p>}
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