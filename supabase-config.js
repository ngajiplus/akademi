const SUPABASE_URL =
  "https://ksgywgdrfskqsufchbcm.supabase.co";

const SUPABASE_ANON_KEY =
  "sb_publishable_HmFKwHMCISfN_YOoiLx3-A_MWnG9yG7";


const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
  );
