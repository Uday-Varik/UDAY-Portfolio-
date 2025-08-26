import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Hero from '../components/Hero';
import { supabase } from '../supabaseClient';

interface Post {
  id: string;
  title: string;
  content: string;
  tags: string[];
}

// BlogPost page displays the full content of a single blog post by slug.
export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('id, title, content, tags')
          .eq('slug', id)
          .single();
        if (error) throw error;
        setPost(data as any);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  return (
    <>
      {loading && <Hero heading="Loading…" />}
      {error && <Hero heading="Error" subheading={error} />}
      {post && (
        <>
          <Hero heading={post.title} subheading={post.tags?.join(', ')} />
          <div className="container">
            {/* Basic rendering of HTML content. It is assumed that the content stored in Supabase is sanitized HTML. */}
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </>
      )}
    </>
  );
}