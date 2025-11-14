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

## Cấu trúc thư mục dự án
```
src/
┣ app/                                # Next.js App Router – chứa toàn bộ route của app
┃ ┣ (auth)/                           # Nhóm route liên quan đến authentication
┃ ┃ ┣ login/                          # Trang đăng nhập
┃ ┃ ┃ ┣ google/
┃ ┃ ┃ ┃ ┣ GoogleSignInButton.tsx      # Nút đăng nhập Google
┃ ┃ ┃ ┃ ┗ route.ts                    # API route xử lý OAuth Google
┃ ┃ ┃ ┣ actions.ts                    # Server actions cho login
┃ ┃ ┃ ┣ LoginForm.tsx                 # Form đăng nhập
┃ ┃ ┃ ┗ page.tsx                      # Trang /login
┃ ┃ ┣ signup/
┃ ┃ ┃ ┣ actions.ts                    # Server actions đăng ký
┃ ┃ ┃ ┣ page.tsx                      # Trang /signup
┃ ┃ ┃ ┗ SignUpForm.tsx                # Form đăng ký
┃ ┃ ┣ actions.ts                      # Server actions chung cho (auth)
┃ ┃ ┗ layout.tsx                      # Layout chung cho login/signup
┃ ┣ (main)/                           # Các route chính sau khi user đăng nhập
┃ ┃ ┣ bookmarks/
┃ ┃ ┃ ┣ Bookmarks.tsx                 # Component hiển thị bookmark
┃ ┃ ┃ ┗ page.tsx                      # Trang /bookmarks
┃ ┃ ┣ hashtag/
┃ ┃ ┃ ┗ [tag]/page.tsx                # Trang hashtag động /hashtag/[tag]
┃ ┃ ┣ messages/
┃ ┃ ┃ ┣ Chat.tsx                      # UI khung chat chính
┃ ┃ ┃ ┣ ChatChannel.tsx               # Kênh chat cụ thể
┃ ┃ ┃ ┣ ChatSidebar.tsx               # Sidebar danh sách chat
┃ ┃ ┃ ┣ NewChatDialog.tsx             # Dialog mở chat mới
┃ ┃ ┃ ┣ page.tsx                      # Trang /messages
┃ ┃ ┃ ┗ useInitializeChatClient.ts     # Hook khởi tạo client chat (Stream)
┃ ┃ ┣ notifications/
┃ ┃ ┃ ┣ Notification.tsx              # Component hiển thị 1 thông báo
┃ ┃ ┃ ┣ Notifications.tsx             # Danh sách thông báo
┃ ┃ ┃ ┗ page.tsx                      # Trang /notifications
┃ ┃ ┣ posts/
┃ ┃ ┃ ┗ [postId]/page.tsx             # Trang chi tiết bài post
┃ ┃ ┣ search/
┃ ┃ ┃ ┣ page.tsx                      # Trang /search
┃ ┃ ┃ ┗ SearchResult.tsx              # Component kết quả tìm kiếm
┃ ┃ ┣ users/
┃ ┃ ┃ ┗ [username]/                   # Trang profile động
┃ ┃ ┃   ┣ actions.ts                  # Server actions cho user profile
┃ ┃ ┃   ┣ EditProfileButton.tsx       # Nút mở dialog edit profile
┃ ┃ ┃   ┣ EditProfileDialog.tsx       # Dialog chỉnh sửa profile
┃ ┃ ┃   ┣ mutations.ts                # Các mutation dùng react-query
┃ ┃ ┃   ┣ page.tsx                    # Trang profile
┃ ┃ ┃   ┗ UserPosts.tsx               # Danh sách bài viết của user
┃ ┃ ┣ FollowingFeed.tsx               # Feed cho người dùng theo dõi
┃ ┃ ┣ ForYouFeed.tsx                  # Feed gợi ý
┃ ┃ ┣ layout.tsx                      # Layout chính cho (main)
┃ ┃ ┣ LeftSidebar.tsx                 # Sidebar trái
┃ ┃ ┣ loading.tsx                     # Trang loading cho (main)
┃ ┃ ┣ MessagesButton.tsx              # Nút điều hướng đến messages
┃ ┃ ┣ not-found.tsx                   # Trang 404
┃ ┃ ┣ NotificationsButton.tsx         # Nút mở thông báo
┃ ┃ ┣ page.tsx                        # Trang homepage sau khi login
┃ ┃ ┣ RightSidebar.tsx                # Sidebar phải
┃ ┃ ┗ SessionProvider.tsx             # Provider Auth session (NextAuth)
┃ ┣ api/                              # API Routes (serverless functions)
┃ ┃ ┣ admin/                          # API liên quan đến admin
┃ ┃ ┃ ┣ delete-user/route.ts          # Xóa người dùng
┃ ┃ ┃ ┗ promote/route.ts              # Nâng quyền user
┃ ┃ ┣ auth/
┃ ┃ ┃ ┗ callback/google/route.ts      # Callback OAuth Google
┃ ┃ ┣ clear-uploads/route.ts          # Xóa file upload cũ (cron job)
┃ ┃ ┣ get-token/route.ts              # Lấy token server → client
┃ ┃ ┣ messages/unread-count/route.ts  # API đếm tin nhắn chưa đọc
┃ ┃ ┣ notifications/
┃ ┃ ┃ ┣ mark-as-read/route.ts         # Đánh dấu thông báo đã đọc
┃ ┃ ┃ ┣ unread-count/route.ts         # Số thông báo chưa đọc
┃ ┃ ┃ ┗ route.ts                      # Lấy danh sách thông báo
┃ ┃ ┣ posts/                          # API liên quan đến bài post
┃ ┃ ┃ ┣ bookmarked/route.ts           # Lấy danh sách post bookmarked
┃ ┃ ┃ ┣ following/route.ts            # Feed từ người follow
┃ ┃ ┃ ┣ for-you/route.ts              # Feed đề xuất
┃ ┃ ┃ ┗ [postId]/                     # API từng bài
┃ ┃ ┃   ┣ bookmark/route.ts           # Toggle bookmark
┃ ┃ ┃   ┣ comments/route.ts           # Gửi/comment vào post
┃ ┃ ┃   ┗ likes/route.ts              # Like/unlike
┃ ┃ ┣ search/route.ts                 # API tìm kiếm
┃ ┃ ┣ uploadthing/
┃ ┃ ┃ ┣ core.ts                       # Config uploadthing
┃ ┃ ┃ ┗ route.ts                      # API upload
┃ ┃ ┗ users/                          # API liên quan user
┃ ┃   ┣ username/[username]/route.ts  # Lấy user theo username
┃ ┃   ┗ [userId]/                     # Lấy dữ liệu user theo ID
┃ ┃     ┣ followers/route.ts          # Lấy followers
┃ ┃     ┗ posts/route.ts              # Lấy bài viết của user
┃ ┣ favicon.ico
┃ ┣ globals.css                        # CSS toàn hệ thống
┃ ┣ layout.tsx                         # Root layout
┃ ┗ ReactQueryProvider.tsx             # Provider react-query
┣ assets/
┃ ┣ avatar_placeholder.jpg            # Ảnh placeholder avatar
┃ ┣ logo.jpg                          # Logo
┃ ┣ post1.jpg                         # Ảnh mock post
┃ ┗ post2.jpg
┣ components/                         # Component tách riêng dùng nhiều nơi
┃ ┣ comments/                         # Module comment
┃ ┃ ┣ action.ts                       # Server actions comment
┃ ┃ ┣ Comment.tsx                     # Một comment
┃ ┃ ┣ CommentInput.tsx                # Input comment
┃ ┃ ┣ CommentMoreButton.tsx           # Menu thêm/xóa comment
┃ ┃ ┣ Comments.tsx                    # Danh sách comment
┃ ┃ ┣ DeleteCommentDialog.tsx         # Dialog xóa comment
┃ ┃ ┗ mutations.ts                    # React-query mutation cho comment
┃ ┣ posts/                            # Module post
┃ ┃ ┣ editor/
┃ ┃ ┃ ┣ action.ts                     # Server actions cho editor
┃ ┃ ┃ ┣ mutations.ts                  # Mutation editor
┃ ┃ ┃ ┣ PostEditor.tsx                # Editor viết bài
┃ ┃ ┃ ┣ style.css                     # CSS cho editor
┃ ┃ ┃ ┗ useMediaUpload.tsx            # Hook upload ảnh/video
┃ ┃ ┣ actions.ts                      # Server action cho post
┃ ┃ ┣ BookmarkButton.tsx              # Nút bookmark
┃ ┃ ┣ DeletePostDialog.tsx            # Dialog xóa post
┃ ┃ ┣ LikeButton.tsx                  # Nút like
┃ ┃ ┣ mutations.ts                    # Mutation post
┃ ┃ ┣ Post.tsx                        # Component hiển thị một post
┃ ┃ ┣ PostMoreButton.tsx              # More option của post
┃ ┃ ┗ PostsLoadingSkeleton.tsx        # Skeleton load post
┃ ┣ ui/                               # Các component UI (shadcn)
┃ ┃ ┣ button.tsx
┃ ┃ ┣ dialog.tsx
┃ ┃ ┣ dropdown-menu.tsx
┃ ┃ ┣ form.tsx
┃ ┃ ┣ input.tsx
┃ ┃ ┣ label.tsx
┃ ┃ ┣ skeleton.tsx
┃ ┃ ┣ tabs.tsx
┃ ┃ ┣ textarea.tsx
┃ ┃ ┣ toast.tsx
┃ ┃ ┣ tooltip.tsx
┃ ┃ ┗ use-toast.ts
┃ ┣ AdminUserControls.tsx             # UI điều khiển admin
┃ ┣ AdminUserControlsWrapper.tsx      # Logic wrapper cho admin
┃ ┣ CropImageDialog.tsx               # Dialog crop ảnh
┃ ┣ FollowButton.tsx                  # Nút follow
┃ ┣ FollowerCount.tsx                 # Hiển thị số follower
┃ ┣ InfiniteScrollContainer.tsx       # Container scroll vô hạn
┃ ┣ Linkify.tsx                       # Tự động convert URL thành link
┃ ┣ LoadingButton.tsx                 # Button loading
┃ ┣ PasswordInput.tsx                 # Input password hiển thị/ẩn
┃ ┣ SearchFiled.tsx                   # Ô tìm kiếm
┃ ┣ TrendsSidebar.tsx                 # Sidebar xu hướng
┃ ┣ UserAvatar.tsx                    # Avatar người dùng
┃ ┣ UserButton.tsx                    # Nút mở menu user
┃ ┣ UserLinkWithTooltip.tsx           # Link user + tooltip
┃ ┗ UserTooltip.tsx                   # Tooltip user chi tiết
┣ hooks/
┃ ┣ useDebounce.ts                    # Hook debounce
┃ ┗ useFollowerInfo.ts                # Hook lấy thông tin follower theo user
┣ lib/
┃ ┣ ky.ts                             # Khởi tạo HTTP client ky
┃ ┣ prisma.ts                         # Kết nối Prisma ORM
┃ ┣ server-auth.ts                    # Auth server-side (NextAuth)
┃ ┣ stream.ts                         # Config Stream chat API
┃ ┣ types.ts                          # Định nghĩa các kiểu dùng chung
┃ ┣ uploadthing.ts                    # Hàm gọi uploadthing
┃ ┣ utils.ts                          # Hàm tiện ích chung
┃ ┗ validation.ts                     # Schema validation (Zod)
┗ auth.ts                              # Config NextAuth (root)

```
