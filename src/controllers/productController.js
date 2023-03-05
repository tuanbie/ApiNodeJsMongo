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
const productController = {
  //Thêm Size sản phẩm
  addSizeProduct: async (req, res) => {
    try {
      const newSize = new SizeProduct(req.body);
      const savedSize = await newSize.save();
      res.status(200).json(savedSize);
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },
  //Lấy tất cả size
  getAllSize: async (req, res) => {
    try {
      const allSize = await SizeProduct.find();
      res.status(200).json(allSize);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Get All Product
  getAllProduct: async (req, res) => {
    try {
      const allProduct = await Product.find();
      res.status(200).json(allProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Add Product
  addProduct: async (req, res) => {
    try {
      const newProduct = new Product(req.body);
      const savedProduct = await newProduct.save();
      res.status(200).json(savedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Get All Sex
  getAllSex: async (req, res) => {
    try {
      const allSex = await Sex.find();
      res.status(200).json(allSex);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Add Sex
  addSex: async (req, res) => {
    try {
      const newSex = new Sex(req.body);
      const saveSex = await newSex.save();
      res.status(200).json(saveSex);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Get All Product Type
  getAllProductType: async (req, res) => {
    try {
      const allProductType = await ProductType.find();
      res.status(200).json(allProductType);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Add Product Type
  addProductType: async (req, res) => {
    try {
      const newProductType = new ProductType(req.body);
      const saveProductType = await newProductType.save();
      res.status(200).json(saveProductType);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Get All Product By Name Sex
  getAllProductBySex: async (req, res) => {
    try {
      const nameSex = req.params.nameSex;
      const sex = await Sex.findOne({ NameSex: nameSex });
      const productTypes = await ProductType.find({ Sex: sex._id });
      const products = await Product.find({
        ProductType: { $in: productTypes },
      }).populate({
        path: "ProductType",
        populate: {
          path: "Sex",
        },
      });   
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  //Get All Product By NameSex + Product Type
  getAllProductBySexAndPType: async (req, res) => {
    try {
      const nameSex = req.body.NameSex;
      const nameProductType = req.body.NameProductType;
      const sex = await Sex.findOne({ NameSex: nameSex });
      const productType = await ProductType.find({
        NameProductType: nameProductType,
        Sex: sex._id,
      }).populate({
        path: "Sex",
      });
      if (!productType) {
        return res.status(404).json({ message: "Product type not found" });
      }
      const products = await Product.find({
        ProductType: productType,
      }).populate({ path: "ProductType", populate: { path: "Sex" } });
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  //get product latest flow quality
  getProductsByquality : async (req, res) => {
    try {
      const quality = parseInt(req.params.quality); // lấy giá trị limit từ req.params
      const products = await Product.find({ StatusProduct: 1 })//tìm sản phẩm đang còn hàng
        .sort({ CreateDate: -1 })//hàm sort sắp xếp theo thứ tự giảm dần của ngày nhập vào
        .limit(quality);
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  getProductsByName : async (req, res) => {
    try {
      const name = parseInt(req.params.name); // lấy giá trị limit từ req.params
      const products = await Product.find({ name })//tìm sản phẩm đang còn hàng
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

module.exports = productController;
