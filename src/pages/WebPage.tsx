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

// Web developer page. Fetches blog posts tagged with 'web' and lists sample projects.
export default function WebPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('id, title, excerpt, slug, tags')
          .contains('tags', ['web']);
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
        heading="Web Developer"
        subheading="Crafting performant and accessible websites with modern frameworks and robust backends."
      />
      <div className="container">
        <h2>Featured Web Projects</h2>
        <ul>
          <li>
            <strong>Responsive Portfolio Template:</strong> A modern portfolio template built with React and Tailwind CSS featuring dark mode and dynamic content.
          </li>
          <li>
            <strong>Real‑time Chat Application:</strong> A web app using WebSockets to enable real‑time messaging with authentication and state management.
          </li>
        </ul>

        <h2 style={{ marginTop: '2rem' }}>Latest Web Posts</h2>
        {loading && <p>Loading posts…</p>}
        {error && <p>Error loading posts: {error}</p>}
        {!loading && posts.length === 0 && <p>No web posts yet.</p>}
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