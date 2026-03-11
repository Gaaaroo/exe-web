# Bật đăng nhập Google (Supabase Auth)

Để trang **Đăng nhập / Đăng ký bằng Google** hoạt động, cần cấu hình Supabase và Google:

## 1. Redirect URL trong Supabase (bắt buộc)

Nếu thiếu bước này, sau khi đăng nhập Google bạn sẽ bị lỗi **bad_oauth_state** (redirect về trang chủ kèm lỗi).

1. Vào **[Supabase Dashboard](https://supabase.com/dashboard)** → chọn project.
2. **Authentication** → **URL Configuration**.
3. Trong **Redirect URLs**, thêm đúng URL callback của app:
   - Dev: `http://localhost:3000/auth/callback`
   - Production: `https://yourdomain.com/auth/callback`
4. **Site URL** có thể để `http://localhost:3000` (dev) hoặc domain production.
5. **Save**.

## 2. Bật Google provider

1. **Authentication** → **Providers** → tìm **Google** → bật **Enable**.
2. Điền **Client ID** và **Client secret** từ [Google Cloud Console](https://console.cloud.google.com/apis/credentials):
   - Tạo OAuth 2.0 Client ID (Web application).
   - **Authorized redirect URIs** (trong Google): `https://<project-ref>.supabase.co/auth/v1/callback` (copy từ mục "Callback URL" trong Supabase, tab Google).
3. **Save**.

Sau khi bật, người dùng bấm "Tiếp tục với Google" trên `/login` sẽ được chuyển sang Google đăng nhập, rồi quay về `/auth/callback` và về đúng trang (vd. `/#purchase`).

---

## Debug khi lỗi "no_code" (không có code trên callback)

Khi thấy redirect về `/login?error=no_code`, nghĩa là trang `/auth/callback` **không nhận được tham số `code`** từ Supabase. Làm lần lượt:

### Bước 1: Mở F12 → tab Console

- Vào `/login`, bấm **Tiếp tục với Google**.
- Trước khi chuyển sang Google, trong Console sẽ có log:
  - `[Login DEBUG] redirectTo ...` → URL mà app mong Supabase redirect về (phải là `http://localhost:3000/auth/callback?next=...`).

### Bước 2: Sau khi chọn tài khoản Google, xem URL thực tế

- Khi bị đẩy về `/auth/callback` rồi sang `/login?error=no_code`, **ngay lúc vừa vào `/auth/callback`** (trước khi redirect sang login), xem:
  - **Thanh địa chỉ trình duyệt**: URL đầy đủ là gì?
    - Đúng dạng: `http://localhost:3000/auth/callback?code=xxx&state=yyy&next=%2F` (có `code` và `state`).
    - Sai: chỉ `http://localhost:3000/auth/callback?next=%2F` (không có `code`) → Supabase không gửi code về đúng URL.
  - **F12 → Console**: có log `[Auth callback DEBUG]` in ra:
    - `URL (pathname + search)`: phần path + query (không có hash). Nếu ở đây không có `code` thì code có thể nằm trong hash; xem tiếp mục "Có hash (#...) không?".
    - `code từ query` / `code từ hash`: biết code có được đọc từ query hay từ hash.

### Bước 3: Kiểm tra Supabase Dashboard

1. **Authentication** → **URL Configuration**.
2. **Redirect URLs**:
   - Phải có **chính xác**: `http://localhost:3000/auth/callback` (giống hệt log `redirectTo` trong Bước 1).
   - Không thêm dấu `/` cuối (trừ khi bạn đổi code app dùng URL có trailing slash).
   - **Save** sau khi sửa.
3. **Site URL**: thường để `http://localhost:3000` khi dev. Nếu bạn thấy redirect về `http://localhost:3000/?code=...` (trang chủ có `code`) thì Site URL đang được dùng; khi đó cần đảm bảo Redirect URLs có `http://localhost:3000/auth/callback` và trùng với `redirectTo` trong app.

### Bước 4: Thử lại và ghi lại kết quả

- Xóa cache / dùng Incognito nếu cần.
- Đăng nhập Google lại, ghi lại:
  - URL đầy đủ trên thanh địa chỉ khi vừa vào `/auth/callback`.
  - Nội dung log `[Auth callback DEBUG]` trong Console.

Nếu Redirect URLs đã đúng mà vẫn không có `code` trên URL callback, gửi lại hai thông tin trên (URL + log) để kiểm tra tiếp.
