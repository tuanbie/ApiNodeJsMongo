const {
    Sex,
    ProductType,
    Product,
    ProductDetail,
    SizeProduct,
    AdminAccount,
    FeedBack,
    Account,
    Invoice,
    InvoiceDetails,
  } = require("../models/model.js");
  const bcrypt = require('bcryptjs');
  const jwt = require('jsonwebtoken');
  const accountController = {
    addCustomer: async (req, res) => {
      try {
        const { FullName, Email, PhoneNumber, AddressUser, PasswordUser } = req.body;
        // kiểm tra email đã tồn tại
        const checkEmail = await Account.findOne({ Email });
        if (checkEmail) {
          return res.status(400).json({ message: 'Email đã tồn tại!' });
        }
        
        // hàm mã hóa mật khẩu
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(PasswordUser, salt);
  
        // theemm account mới
        const newAccount = new Account({
          FullName,
          Email,
          PhoneNumber,
          AddressUser,
          PasswordUser: hashedPassword,
          StatusAccount: 1,
        });
        //lưu account vừa thêm
        const savedAccount = await newAccount.save();
        res.status(200).json(savedAccount);
      } catch (err) {
        res.status(500).json(err);
      }
    },

    loginCustomer: async (req, res) => {
      try {
        const { Email, PasswordUser } = req.body;
  
        //kiểm tra e mail có tồn tại không
        const checkdata = await Account.findOne({ Email });
        if (!checkdata) {
          return res.status(400).json({ message: 'Email không tồn tại' });
        }
  
        // kiểm tra mật khẩu
        const checkpass = await bcrypt.compare(PasswordUser, checkdata.PasswordUser);
        if (!checkpass) {
          return res.status(400).json({ message: 'Mật khẩu không đúng' });
        }
  
        // tạo và đăng kí token bằng thư viện jwt
        const payload = {
          Account: {
            id: Account.id,
          },
        };
        //với lệnh jwt.sign để tạo token chứa đối tượng id của khách hàng
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: '1h' },
          (err, token) => {
            if (err) throw err;
            res.json({
              message:"Đăng nhập thành công!",
              FullName: checkdata.FullName,
              Email: checkdata.Email,
              PhoneNumber: checkdata.PhoneNumber,
              AddressUser:checkdata.AddressUser,
              PasswordUser:checkdata.PasswordUser,
              token 
            });
          }
        );
      } catch (err) {
        res.status(500).json(err);
      }
    },

    updateCustomer : async (req, res) => {
      try {
        const { id } = req.params;
        const { FullName, Email, PhoneNumber, AddressUser, PasswordUser } = req.body;
    
        // kiểm tra khách hàng tồn tại hay k
        const customer = await Account.findById(id);
        if (!customer) {
          return res.status(404).json({ message: 'Không tìm thấy khách hàng' });
        }
    
        // cập nhật khách hàng
        customer.FullName = FullName;
        customer.Email = Email;
        customer.PhoneNumber = PhoneNumber;
        customer.AddressUser = AddressUser;
    
        // mã hóa mật khẩu mới
        if (PasswordUser) {
          const salt = await bcrypt.genSalt(10);
          customer.PasswordUser = await bcrypt.hash(PasswordUser, salt);
        }
    
        // lưu mật khẩu vào data
        await customer.save();
    
        res.json(customer);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    updatePasswordWithEmail:async(req, res) => {
      const email = req.params.email;
    
      // Generate new random password
      const randomPassword = Math.floor(10000 + Math.random() * 90000);
    
      try {
        // Find account by email
        const account = await Account.findOne({ Email: email });
        if (!account) {
          return res.status(200).json({ message: 'Không tìm thấy tài khoản.' });
        }
        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(randomPassword.toString(), salt);
        
        // Update password in database
        account.PasswordUser = hash;
        await account.save();
    
        // Send email with new password
        const transporter = nodemailer.createTransport({
          service: 'vantuan181002@gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: 'tuansk1002@gmail.com',
            pass: '0373272294tuan',
          },
        });
    
        const mailOptions = {
          from: 'tuansk1002@gmail.com',
          to: email,
          subject: 'Mật khẩu mới của tài khoản của bạn',
          text: `Mật khẩu mới của tài khoản của bạn là ${randomPassword}.`,
        };
    
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
    
        // Send response
        return res.json({ message: 'Mật khẩu đã được cập nhật và gửi đến email của bạn.' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Đã có lỗi xảy ra.' });
      }
    },
  };
  
  module.exports = accountController;