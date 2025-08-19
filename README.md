hướng dẫn chạy :
cd backend -> npm run dev
cd frontend -> npm run dev 


I. Qui trình:
1. phân tích các yêu cầu, các api

# Authentication APIs (/auth)
POST /auth/signup - Đăng ký tài khoản
POST /auth/signin - Đăng nhập
# Repository APIs (/repositories)
GET /repositories - Lấy thông tin repository
GET /repositories/:repositoryId/github-info - Lấy thông tin GitHub repository
# Board APIs (/boards) (Yêu cầu authentication)
POST /boards - Tạo board mới
GET /boards - Lấy tất cả boards
GET /boards/:boardId - Lấy board theo ID
PUT /boards/:boardId - Cập nhật board
DELETE /boards/:boardId - Xóa board
POST /boards/:boardId/invite - Mời người dùng vào board
POST /boards/:boardId/invite/:inviteId - Chấp nhận lời mời board
# Card APIs (/boards/:boardId/cards) (Yêu cầu authentication)
GET /boards/:boardId/cards - Lấy tất cả cards trong board
POST /boards/:boardId/cards - Tạo card mới
GET /boards/:boardId/cards/:cardId - Lấy card theo ID
PUT /boards/:boardId/cards/:cardId - Cập nhật card
DELETE /boards/:boardId/cards/:cardId - Xóa card
GET /boards/:boardId/cards/user/:userId - Lấy cards theo user
POST /boards/:boardId/cards/invite - Mời người dùng vào card
POST /boards/:boardId/cards/:cardId/invite/accept - Chấp nhận lời mời card
# Task APIs (/boards/:boardId/cards/:cardId/tasks) (Yêu cầu authentication)
GET /boards/:boardId/cards/:cardId/tasks - Lấy tất cả tasks trong card
POST /boards/:boardId/cards/:cardId/tasks - Tạo task mới
GET /boards/:boardId/cards/:cardId/tasks/:taskId - Lấy task theo ID
PUT /boards/:boardId/cards/:cardId/tasks/:taskId - Cập nhật task
DELETE /boards/:boardId/cards/:cardId/tasks/:taskId - Xóa task
POST /boards/:boardId/cards/:cardId/tasks/:taskId/assign - Gán thành viên cho task
GET /boards/:boardId/cards/:cardId/tasks/:taskId/assign - Lấy danh sách thành viên được gán
DELETE /boards/:boardId/cards/:cardId/tasks/:taskId/assign/:memberId - Xóa thành viên khỏi task
# GitHub Integration APIs (/boards/:boardId/cards/:cardId/tasks/:taskId) (Yêu cầu authentication)
POST /boards/:boardId/cards/:cardId/tasks/:taskId/github-attach - Đính kèm GitHub repository vào task
GET /boards/:boardId/cards/:cardId/tasks/:taskId/github-attachments - Lấy danh sách GitHub attachments
DELETE /boards/:boardId/cards/:cardId/tasks/:taskId/github-attachments/:attachmentId - Xóa GitHub attachment

2. Kết nối firebase , xây dựng cấu trúc dự án
(Backend/src/config/firebaseConfig.ts)

3. Xây dựng backend , router, logic cho các api 

4. Xây dựng frontend, router, giao diện 

II. Giải quyết các vấn đề 
1. Quản lí dự án:
    -Chia nhỏ các router, logic để dễ dàng quản lí 
    -Sử dụng interface để xây dựng đối tượng giúp dễ dàng quản lí phụ thuộc và đồng nhất với database 
2. Xác thực 
     Sử dụng jwt để tạo token và gửi về frontend , lưu ở localstorage
     Sử dụng Math.floor(100000 + Math.random() * 900000).toString() để tạo mã code và sử dụng nodemailer để gửi về email
4. Kết nối repo githud
    sử dụng fetch để kết nối với repo githud lấy : branches pulls issues commits
5.frontend
    tạo service để fetch dữ liệu từ backend 
    quản lí các state của từng trang
    thiết kế giao diện thân thiện , responsive
6. Các vấn đề lớn:
    *backend:
        -xây dựng csdl thật hợp lí để các phụ thuộc , query đúng, chính xác.
           => tôi đã thiết kế các collection và các document của firebase với sự phụ thuộc chặt chẽ và đúng với api
        -khi lấy được dữ liệu về , dữ liệu gồm nhiều trường thừa -> phải lọc dữ liệu 
           => tôi đã tạo ra hàm fiiterData để chỉ lấy các dữ liệu cần thiết 
    *frontend:
        - quản lí các state
        - đảm bảo dữ liệu gửi lên server đúng định dạng và không bị lỗi
            => tôi đã quản lí các state 1 cách chặt chẽ và bắt lỗi ngay từ đây 
        - xử lí các dữ liệu bị lỗi
           => khi dữ liệu fetch bị lỗi tôi đã thử cách tiếp cần từ API khác để lấy được dữ liệu mong muốn 
          
       
