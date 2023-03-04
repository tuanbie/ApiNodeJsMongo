const mongoose = require("mongoose");

//Sex
const SexSchema = new mongoose.Schema({
  NameSex: {
    type: String,
    required: true,
  },
});

//Product Type
const ProductTypeSchema = new mongoose.Schema({
  NameProductType: {
    type: String,
    required: true,
  },
  Sex: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sex",
    required: true,
  },
});

//Product
const ProductSchema = new mongoose.Schema({
  NameProduct: {
    type: String,
    required: true,
    trim: true,
  },
  PriceProduct: {
    type: Number,
    required: true,
    min: 0,
  },
  ImageProduct: {
    type: String,
    required: true,
    trim: true,
  },
  CreateDate: {
    type: Date,
    default: Date.now,
  },
  UpdateDate: {
    type: Date,
    default: Date.now,
  },
  Description: {
    type: String,
    trim: true,
  },
  StatusProduct: {
    type: Number,
    required: true,
    enump: [0, 1],
    default: 1,
  },
  ProductType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductType",
    required: true,
  },
});

//SizeProduct
const SizeProductSchema = new mongoose.Schema({
  TenSize: {
    type: String,
    required: true,
    trim: true,
  },
});

//Produt Detail
const ProductDetailSchema = new mongoose.Schema({
  ProductID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  SizeID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SizeProduct",
  },
  SoLuongTon: {
    type: Number,
    required: true,
    min: 0,
  },
});

//Admin Account
const AdminAccountSchema = new mongoose.Schema({
  UserNameAdmin: {
    type: String,
    required: true,
  },
  PasswordAdmin: {
    type: String,
    required: true,
  },
});

//FeedBack
const FeedBackSchema = new mongoose.Schema({
  FullNameUserFeedBack: {
    type: String,
    required: true,
  },
  EmailUserFeedBack: {
    type: String,
    required: true,
  },
  DescribeFeedBack: {
    type: String,
    required: true,
  },
});

//Account
const AccountSchema = new mongoose.Schema({
  FullName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  PhoneNumber: {
    type: Number,
    required: true,
  },
  AddressUser: {
    type: String,
    required: true,
  },
  PasswordUser: {
    type: String,
    required: true,
  },
  StatusAccount: {
    type: Number,
    required: true,
    enump: [0, 1],
    default: 1,
  },
});

//Invoice
const InvoiceSchema = new mongoose.Schema({
  InvoiceNameReceiver: {
    type: String,
    required: true,
  },
  InvoiceAddressReceiver: {
    type: String,
    required: true,
  },
  InvoicePhoneReceiver: {
    type: Number,
    required: true,
  },
  InvoiceDate: {
    type: Date,
    required: true,
  },
  TotalInvoice: {
    type: Number,
    required: true,
    default: 0,
  },
  PaymentsInvoice: {
    type: String,
    required: true,
  },
  StatusInvoice: {
    type: Number,
    required: true,
    enump: [0, 1],
    default: 1,
  },
  Paid: {
    type: Number,
    required: true,
    enump: [0, 1],
    default: 1,
  },
  NoteInvoice: {
    type: String,
  },
  AccountID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
});

//Invoice Detail
const InvoiceDetailsSchema = new mongoose.Schema({
  SizeProductID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductDetail",
    required: true,
  },
  ProductID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductDetail",
    required: true,
  },
  InvoiceID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Invoice",
    required: true,
  },
  Quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  UnitPrice: {
    type: Number,
    required: true,
    default: 0,
  },
});

//Tạo model
const Sex = mongoose.model("Sex", SexSchema);
const ProductType = mongoose.model("ProductType", ProductTypeSchema);
const Product = mongoose.model("Product", ProductSchema);
const ProductDetail = mongoose.model("ProductDetail", ProductDetailSchema);
const SizeProduct = mongoose.model("SizeProduct", SizeProductSchema);
const AdminAccount = mongoose.model("AdminAccount", AdminAccountSchema);
const FeedBack = mongoose.model("FeedBack", FeedBackSchema);
const Account = mongoose.model("Account", AccountSchema);
const Invoice = mongoose.model("Invoice", InvoiceSchema);
const InvoiceDetails = mongoose.model("InvoiceDetails", InvoiceDetailsSchema);
//Export các model
module.exports = {
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
};
