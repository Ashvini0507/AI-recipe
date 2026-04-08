const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let supabase;

if (!supabaseUrl || !supabaseKey || supabaseUrl === 'your_supabase_url') {
    console.warn('⚠️ Supabase URL or Key missing in .env file. Backend will run in fallback mode.');
    // Mock or null client to prevent crash
    supabase = null;
} else {
    try {
        supabase = createClient(supabaseUrl, supabaseKey);
    } catch (error) {
        console.error('Failed to initialize Supabase:', error.message);
        supabase = null;
    }
}

module.exports = supabase;
