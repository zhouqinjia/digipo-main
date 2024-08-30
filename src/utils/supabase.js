import { createClient } from '@supabase/supabase-js'
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZienRscmxqbnB6eWJmdnhrdGJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2Mzk0OTMsImV4cCI6MjA0MDIxNTQ5M30.mmqW6_0NRMl6rSPhpZj1P_c_FjdFVFOBk7geBXoAc7o'
const supabase = createClient('https://vbztlrljnpzybfvxktbq.supabase.co', apiKey)

export default  supabase