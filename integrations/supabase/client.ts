export const supabase = {
  auth: {
    async getSession() {
      return { data: { session: null }, error: null };
    },
  },
  functions: {
    async invoke(_name: string, _options?: unknown) {
      return {
        data: null,
        error: new Error("Supabase is not configured. Please set up Supabase client."),
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


