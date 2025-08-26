import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Hero from '../components/Hero';

interface Study {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  tags: string[];
}

// CaseStudies page lists all case studies saved in Supabase.
export default function CaseStudies() {
  const [studies, setStudies] = useState<Study[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStudies() {
      try {
        const { data, error } = await supabase
          .from('case_studies')
          .select('id, title, excerpt, slug, tags')
          .order('created_at', { ascending: false });
        if (error) throw error;
        setStudies((data as any[]) || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchStudies();
  }, []);

  return (
    <>
      <Hero heading="Case Studies" subheading="Deep dives into complex problems, research and solutions." />
      <div className="container">
        {loading && <p>Loading case studies…</p>}
        {error && <p>Error loading case studies: {error}</p>}
        {!loading && studies.length === 0 && <p>No case studies available.</p>}
        <ul>
          {studies.map((study) => (
            <li key={study.id} style={{ marginBottom: '1.5rem' }}>
              <Link to={`/case-studies/${study.slug}`} style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                {study.title}
              </Link>
              <p style={{ margin: '0.25rem 0', color: 'var(--color-muted)' }}>{study.excerpt}</p>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-accent)' }}>
                {study.tags?.join(', ')}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}