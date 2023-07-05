# Bài Tập Lớn
## Tạo và quản lý website thư viện online.
### Trang thư viện online có 2 chức năng chính:
1. Chức năng của quản lý (Admin).
2. Chức năng của người dùng (user).

Website có chức năng Đăng ký/ Đăng nhập. Thông tin tài khoản của người dùng mà
website lưu trữ sẽ bao gồm ít nhất: tên, email, mật khẩu.
- Nếu admin đăng nhập với tài khoản admin thì có thực hiện được những chức năng
của admin để quản lý thư viện sách.
- Người dùng phải đăng ký tài khoản mới có thể đăng nhập và sử dụng tài khoản của họ để xem sách

**1. Chức năng của quản lý (Admin).**
Chức năng của quản lý sẽ có 1 bảng hiển thị những sách đang có trong thư viện. Các cột
của bảng bao gồm: Tiêu đề, tác giả, thể loại, ngày phát hành, số trang, số lượng đã bán và
1 cột để trống ở cuối.
Khi chưa đăng nhập, admin chỉ có thể nhìn bảng danh sách sách. Sau khi đăng nhập,
admin sẽ thấy cuối mỗi hàng trong bảng có 2 nút View và Delete; 1 nút “Add Book” ở
bên trên bảng sách.
Chức năng “View” và “Add Book” sẽ sử dụng chung 1 trang (**yêu cầu sinh viên làm
chính xác giao diện như ảnh bên dưới**):
- Khi “View” thì các trường (fields) thể hiện thông tin đã lưu trong CSDL của cuốn
sách, các field sẽ bị xám không edit được. Sau khi bấm nút Edit ở footer thì các
trường sẽ sáng lên cho phép edit, lúc này nút Edit chuyển thành nút Save.
- Khi “Add Book” thì các trường để trắng và footer chỉ hiển thị nút Add.
![image](https://github.com/LeaQD/BTL_LTW/assets/96373145/af35b2fe-9732-4d79-94b4-8a8f1bfc45bc)

**2. Chức năng của người dùng (user).**
Người dùng có thể sử dụng trang web thư viện bán sách thông qua 2 chức năng chính:
1. Người dùng sau khi đăng nhập sẽ thấy 1 trang chủ có danh sách tất cả các quyển
sách đã có trong cơ sở dữ liệu, thông tin được hiển thị của các quyển sách này bao
gồm: bìa sách, tên sách và tên tác giả.
Người dùng có thể bấm vào từng quyển sách và xem thông tin chi tiết của quyển
sách đó
