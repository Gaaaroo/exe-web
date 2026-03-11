import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/** true nếu đã set đủ URL + Anon Key trong .env.local (đã kết nối Supabase) */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

/**
 * Supabase client dùng ở phía browser (Client Components).
 * Cần set NEXT_PUBLIC_SUPABASE_URL và NEXT_PUBLIC_SUPABASE_ANON_KEY trong .env.local.
 */
export const supabase: SupabaseClient =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : (createPlaceholderClient() as unknown as SupabaseClient);

function createPlaceholderClient() {
  return {
    auth: {
      async getSession() {
        return { data: { session: null }, error: null };
      },
    },
    functions: {
      async invoke(_name: string, _options?: unknown) {
        return {
          data: null,
          error: new Error(
            "Supabase chưa cấu hình. Thêm NEXT_PUBLIC_SUPABASE_URL và NEXT_PUBLIC_SUPABASE_ANON_KEY vào .env.local."
          ),
        };
      },
    },
    from(_table: string) {
      return {
        async select(_columns: string) {
          return { data: null, error: null };
        },
      };
    },
  };
}
