import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client. The URL and anon key are expected to be
// provided via environment variables. Because this repository does not
// include actual credentials, developers should create a `.env.local` file
// at the root of the project and define VITE_SUPABASE_URL and
// VITE_SUPABASE_ANON_KEY variables pointing to their Supabase instance.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);