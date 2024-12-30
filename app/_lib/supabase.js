import { createClient } from "@supabase/supabase-js";

const supabasePublicUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

export const supabase = createClient(supabasePublicUrl, supabaseServiceKey);
