import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Use real client now that user has provided keys
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

console.log('Supabase initialized with live connection.')
