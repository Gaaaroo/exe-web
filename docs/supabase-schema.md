# Supabase – Bảng và RLS

Tài liệu schema dùng cho Supabase: bảng `profiles`, `orders` và chính sách bảo mật (RLS). Chạy các đoạn SQL dưới đây trong **Supabase Dashboard → SQL Editor** để tạo bảng và bật RLS.

---

## 1. Bảng lưu trạng thái mua game của User

```sql
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  has_purchased boolean default false, -- Quan trọng nhất: Mua hay chưa?
  created_at timestamp with time zone default now()
);
```

---

## 2. Bảng lưu đơn hàng thanh toán

```sql
create table public.orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) not null,
  amount bigint not null, -- Số tiền (VD: 200000)
  payos_order_code text unique, -- Mã gửi sang PayOS
  status text default 'PENDING', -- PENDING hoặc PAID
  created_at timestamp with time zone default now()
);
```

---

## 3. Bảo mật (RLS) – Chỉ cho phép User xem dữ liệu của chính mình

```sql
alter table public.profiles enable row level security;
alter table public.orders enable row level security;

create policy "User can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "User can view own orders" on public.orders for select using (auth.uid() = user_id);
```

---

## Lưu ý

- Chạy lần lượt: (1) → (2) → (3). Bảng `profiles` phải tạo trước vì `orders` tham chiếu `profiles(id)`.
- `profiles.id` trỏ tới `auth.users` – Supabase tự tạo bản ghi trong `auth.users` khi user đăng ký/đăng nhập; có thể dùng Trigger hoặc Edge Function để tự tạo bản ghi tương ứng trong `profiles` khi user mới xuất hiện.
- Cần thêm policy **INSERT/UPDATE** cho `profiles` và `orders` nếu backend hoặc Edge Function sẽ ghi dữ liệu (ví dụ: cập nhật `has_purchased`, tạo đơn hàng).
