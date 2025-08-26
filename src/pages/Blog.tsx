import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Hero from '../components/Hero';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  tags: string[];
}

// Blog index page. Fetches all posts from Supabase and lists them.
export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('id, title, excerpt, slug, tags')
          .order('created_at', { ascending: false });
        if (error) throw error;
        setPosts((data as any[]) || []);
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
      <Hero heading="Blog" subheading="Sharing insights, tutorials and case studies across AI/ML, data and web development." />
      <div className="container">
        {loading && <p>Loading posts…</p>}
        {error && <p>Error loading posts: {error}</p>}
        {!loading && posts.length === 0 && <p>No blog posts available.</p>}
        <ul>
          {posts.map((post) => (
            <li key={post.id} style={{ marginBottom: '1.5rem' }}>
              <Link to={`/blog/${post.slug}`} style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                {post.title}
              </Link>
              <p style={{ margin: '0.25rem 0', color: 'var(--color-muted)' }}>{post.excerpt}</p>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-accent)' }}>
                {post.tags?.join(', ')}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}