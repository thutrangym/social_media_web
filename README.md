# 🚀 DevShareLite - Mạng xã hội cộng đồng tập trung (Next.js 15 Full-Stack)


## 💡 Giới thiệu dự án

**DevShareLite** là một nền tảng mạng xã hội được xây dựng nhằm tạo ra một **không gian cộng đồng tập trung** để người dùng chia sẻ kiến thức, kinh nghiệm, và thảo luận về các chủ đề cụ thể.

Thay vì dựa vào các nền tảng mạng xã hội quá rộng lớn, DevShareLite cung cấp trải nghiệm **nhanh, mượt mà** và **tập trung vào nội dung chất lượng**. Dự án được phát triển dựa trên kiến trúc **Next.js 15 full-stack** hiện đại, tận dụng triệt để các tính năng tối ưu hóa hiệu suất từ Server-Side Rendering.

## ✨ Tính năng nổi bật

### Cho Người dùng (User)
* **Xác thực đa dạng:** Đăng ký/Đăng nhập bằng Email/Mật khẩu hoặc **Google OAuth** (sử dụng Lucia Auth).
* **Tương tác nội dung cốt lõi:** Đăng bài viết mới (hỗ trợ văn bản và tệp đa phương tiện]), bình luận, thích (**Like**), và lưu bài viết (**Bookmark**).
* **Trải nghiệm mượt mà:** Sử dụng **Optimistic Updates** (cập nhật lạc quan) để giao diện phản hồi tức thì.
* **Tin nhắn Real-time (DM):** Gửi tin nhắn riêng tư với độ trễ thấp thông qua tích hợp **Stream API**.
* **Cá nhân hóa:** Quản lý hồ sơ, danh sách bài viết đã lưu, và theo dõi các tác giả quan tâm.

### Cho Quản trị viên (Admin)
* **Kiểm duyệt nội dung:** Quyền xóa bất kỳ bài viết, bình luận hoặc tài khoản nào vi phạm quy định.
* **Quản lý người dùng:** Khóa/Mở khóa hoặc xóa vĩnh viễn tài khoản người dùng.

## 💻 Công nghệ và Kiến trúc

Dự án được xây dựng trên một **kiến trúc Full-stack Hợp nhất** (Single Codebase) sử dụng TypeScript.

### Kiến trúc chính
| Nhóm | Công nghệ | Mục đích sử dụng |
| :--- | :--- | :--- |
| **Server/Full-stack** | **Next.js 15 (App Router)**  | Framework chính, sử dụng **Server Components** để render hiệu suất cao và **Server Actions** để xử lý logic backend an toàn. |
| **Cơ sở dữ liệu** | **PostgreSQL** & **Prisma ORM**  | Hệ quản trị CSDL chính thức, đảm bảo tính toàn vẹn (ACID) và hiệu suất. Prisma cung cấp truy vấn an toàn kiểu (**type-safe**). |
| **Xác thực** | **Lucia Auth**  | Thư viện xác thực linh hoạt, hỗ trợ Session Management và Google OAuth. |

---

### Dịch vụ bên thứ ba (Data & Services Layer)
| Dịch vụ | Mục đích | Lý do sử dụng |
| :--- | :--- | :--- |
| **Stream API**  | Cung cấp hạ tầng cho tính năng **Tin nhắn Real-time (DM)**. | Giảm độ phức tạp của Server, đảm bảo độ trễ thấp và khả năng mở rộng cho Chat. |
| **UploadThing**  | Xử lý việc tải lên tệp đa phương tiện (ảnh, video). |Giảm tải băng thông và việc xử lý file nặng nề khỏi Server Next.js chính. |

---

### Frontend / UI & UX
* **UI Framework:** **Tailwind CSS** & **Shadcn UI** để xây dựng giao diện tùy biến, hiện đại.
* **Data Fetching:** **TanStack React Query** quản lý cache, đồng bộ hóa dữ liệu, và hỗ trợ cuộn vô hạn.
* **Form & Validation:** **React Hook Form** và **Zod** để xử lý biểu mẫu và xác thực dữ liệu phía client/server.

## 🛠️ Cài đặt và Khởi chạy dự án

### Yêu cầu môi trường
* **Node.js** (v18.x trở lên) 
* **PostgreSQL** Server đang hoạt động 
* **NPM/Yarn/Pnpm**
### Các bước thực hiện
1.  **Clone Repository:**
    ```bash
    git clone [repository_url]
    cd devsharelite
    ```
2.  **Cài đặt các thư viện:**
    ```bash
    npm install
    # hoặc pnpm install / yarn install
    ```
3.  **Cấu hình biến môi trường:**
    Tạo file `.env.local` dựa trên `.env.example` và điền các khóa API cần thiết: `DATABASE_URL`, `STREAM_API_KEY`, `UPLOADTHING_SECRET`, v.v.
4.  **Chạy Migration CSDL (Prisma):**
    Thao tác này sẽ tạo các bảng (User, Post, Comment...) trong cơ sở dữ liệu PostgreSQL của bạn.
    ```bash
    npx prisma migrate dev
    ```
5.  **Khởi chạy dự án:**
    ```bash
    npm run dev
    ```
    Ứng dụng sẽ chạy tại địa chỉ `http://localhost:3000`.

## ➡️ Hướng phát triển tương lai

[cite_start]Để mở rộng và hoàn thiện hệ thống, chúng tôi đề xuất các hướng phát triển sau[cite: 680]:
* [cite_start]**Nâng cấp Tìm kiếm:** Tích hợp dịch vụ tìm kiếm chuyên biệt như **Elasticsearch/Algolia** thay vì Full-text Search cơ bản[cite: 682, 683].
* [cite_start]**Kiểm thử Tự động:** Triển khai **Unit Test (Jest/Vitest)** và **End-to-End Test (Cypress/Playwright)** để đảm bảo tính ổn định của hệ thống[cite: 684, 686].
* [cite_start]**Ứng dụng Di động:** Phát triển ứng dụng Native cho iOS/Android bằng **React Native**[cite: 687, 688].
* [cite_start]**Thông báo Real-time:** Chuyển hệ thống thông báo sang cơ chế real-time bằng **WebSockets** (ví dụ: Pusher)[cite: 689, 690].

