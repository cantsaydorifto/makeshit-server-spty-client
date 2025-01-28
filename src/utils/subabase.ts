import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  Bun.env.SUPABASE_URL as string,
  Bun.env.SUPABASE_KEY as string
);

export default supabase;
