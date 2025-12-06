import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

// SUPABASE URL + KEYS USED HERE
const supabase = createClient(
  process.env.SUPABASE_URL,              // SUPABASE URL
  process.env.SUPABASE_SERVICE_ROLE_KEY  // SERVICE ROLE / JWT KEY
)

export default supabase
