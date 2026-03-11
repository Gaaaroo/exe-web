# Bật đăng nhập Google (Supabase Auth)

Để trang **Đăng nhập / Đăng ký bằng Google** hoạt động, cần bật Google provider trong Supabase:

1. Vào **[Supabase Dashboard](https://supabase.com/dashboard)** → chọn project.
2. **Authentication** → **Providers** → tìm **Google** → bật **Enable**.
3. Điền **Client ID** và **Client secret** từ [Google Cloud Console](https://console.cloud.google.com/apis/credentials):
   - Tạo OAuth 2.0 Client ID (Web application).
   - Authorized redirect URIs: `https://<project-ref>.supabase.co/auth/v1/callback` (copy từ mục "Callback URL" trong Supabase).
4. **Save**.

Sau khi bật, người dùng bấm "Tiếp tục với Google" trên `/login` sẽ được chuyển sang Google đăng nhập, xong quay lại site (và về đúng trang/ hash đã gửi qua `?next=`, ví dụ `/#purchase`).
