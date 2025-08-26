import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Hero from '../components/Hero';
import { supabase } from '../supabaseClient';

interface Study {
  id: string;
  title: string;
  content: string;
  tags: string[];
}

// CaseStudy page displays a single case study identified by slug.
export default function CaseStudy() {
  const { id } = useParams<{ id: string }>();
  const [study, setStudy] = useState<Study | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStudy() {
      try {
        const { data, error } = await supabase
          .from('case_studies')
          .select('id, title, content, tags')
          .eq('slug', id)
          .single();
        if (error) throw error;
        setStudy(data as any);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchStudy();
  }, [id]);

  return (
    <>
      {loading && <Hero heading="Loading…" />}
      {error && <Hero heading="Error" subheading={error} />}
      {study && (
        <>
          <Hero heading={study.title} subheading={study.tags?.join(', ')} />
          <div className="container">
            <div dangerouslySetInnerHTML={{ __html: study.content }} />
          </div>
        </>
      )}
    </>
  );
}