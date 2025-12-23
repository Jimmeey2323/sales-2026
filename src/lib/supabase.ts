import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://fjjszvvhgrkycviqftdg.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNmMzE4ZjZjLTczMjYtNGVkMy04YzJlLWNhZTQ4N2Y3NWM2OSJ9.eyJwcm9qZWN0SWQiOiJmampzenZ2aGdya3ljdmlxZnRkZyIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzY2NDcwMzA3LCJleHAiOjIwODE4MzAzMDcsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.vLs2Qj5l5Aqn4WccpYhtXD407pt4-J1zpfvQIkOiWq0';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };