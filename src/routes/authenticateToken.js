const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    // Lấy token từ request header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    // Kiểm tra token
    if (!token) {
      return res.status(401).json({ message: 'Token không hợp lệ' });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Token không hợp lệ' });
      }
  
      // Lưu thông tin người dùng đã xác thực vào request object để sử dụng cho các API sau này
      req.user = user;
      next();
    });
}

module.exports = authenticateToken;