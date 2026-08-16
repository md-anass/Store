// public/js/supabase-config.js

// Replace these with your actual Supabase keys!
const SUPABASE_URL = 'https://rkoaezmxbsfqvecmgjjs.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrb2Flem14YnNmcXZlY21nampzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY4ODczMjcsImV4cCI6MjEwMjQ2MzMyN30.l4-99sXg8VNmpTG0KQ6G7tu2YRxgCyqbRM2UoBRIV5E';

// Initialize the Supabase Client
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);