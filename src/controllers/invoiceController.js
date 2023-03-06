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
const moment = require('moment');
const invoiceController = {
  createInvoice :async (req, res) => {
      try {
        const {
          InvoiceNameReceiver,
          InvoiceAddressReceiver,
          InvoicePhoneReceiver,
          InvoiceDate,
          TotalInvoice,
          PaymentsInvoice,
          StatusInvoice,
          Paid,
          NoteInvoice,
          AccountID,
          products, // là mãng chứa chi tiết sản phẩm 
        } = req.body;
    
        // thêm mới hóa đơn 
        const invoice = new Invoice({
          InvoiceNameReceiver,
          InvoiceAddressReceiver,
          InvoicePhoneReceiver,
          InvoiceDate,
          TotalInvoice,
          PaymentsInvoice,
          StatusInvoice:false,
          Paid:false,
          NoteInvoice,
          AccountID,
        });
    
        // lưu hóa đơn vào database
        await invoice.save();
    
        // lặp lại để thêm chi tiết vào hóa đơn vì mối hóa đơn có nhiều chi tiết
        for (let i = 0; i < products.length; i++) {
          const { ProductID, SizeProductID, Quantity, UnitPrice } = products[i];//lấy giá trị theo từng chi tiết hóa đơn
    
          // thêm chi tiết hóa đơn
          const invoiceDetail = new InvoiceDetails({
            ProductID,
            SizeProductID,
            Quantity,
            UnitPrice,
            InvoiceID: invoice._id,
          });
          // lưu chi tiết hóa đơn
          await invoiceDetail.save();
        }
    
        res.status(200).json({ message: 'Đặt hàng thành công!' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
    //get all invoice
    getAllInvoices : async (req, res) => {
      try {
        const allinvoices = await Invoice.find().lean();
        const invoices = allinvoices.map(invoice => ({
          id: invoice._id,
          InvoiceNameReceiver: invoice.InvoiceNameReceiver,
          InvoiceAddressReceiver: invoice.InvoiceAddressReceiver,
          InvoicePhoneReceiver: invoice.InvoicePhoneReceiver,
          InvoiceDate:moment(invoice.InvoiceDate).format('DD/MM/YYYY') ,
          TotalInvoice: invoice.TotalInvoice,
          PaymentsInvoice: invoice.PaymentsInvoice,
          StatusInvoice: invoice.StatusInvoice,
          Paid: invoice.Paid,
          NoteInvoice: invoice.NoteInvoice,
          AccountID: invoice.AccountID,
         }));
        res.json(invoices);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
    //update status invoice
    updateInvoiceStatus : async (req, res) => {
      try {
        const invoiceId = req.params.invoiceId;//lấy id invoice
        const { StatusInvoice } = req.body;

        const currentInvoice = await Invoice.findById(invoiceId);
        const updatedStatus = !currentInvoice.StatusInvoice;
        const updatedInvoice = await Invoice.findByIdAndUpdate(
          invoiceId,
          { StatusInvoice: updatedStatus },
          { new: true }
        );
        res.json({
          id: updatedInvoice._id,
          InvoiceNameReceiver: updatedInvoice.InvoiceNameReceiver,
          InvoiceAddressReceiver: updatedInvoice.InvoiceAddressReceiver,
          InvoicePhoneReceiver: updatedInvoice.InvoicePhoneReceiver,
          InvoiceDate:moment(updatedInvoice.InvoiceDate).format('DD/MM/YYYY') ,
          TotalInvoice: updatedInvoice.TotalInvoice,
          PaymentsInvoice: updatedInvoice.PaymentsInvoice,
          StatusInvoice: updatedInvoice.StatusInvoice,
          Paid: updatedInvoice.Paid,
          NoteInvoice: updatedInvoice.NoteInvoice,
          AccountID: updatedInvoice.AccountID,
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
    //update status invoice
    updateInvoicePaid : async (req, res) => {
      try {
        const invoiceId = req.params.invoiceId;
        const { Paid } = req.body;
        const currentInvoice = await Invoice.findById(invoiceId);
        const updatedPaid = !currentInvoice.Paid;// chuyển trạng thái để đưa vào db
        const updatedInvoice = await Invoice.findByIdAndUpdate(
          invoiceId,
          { Paid: updatedPaid },
          { new: true }
        );
        res.json({
          id: updatedInvoice._id,
          InvoiceNameReceiver: updatedInvoice.InvoiceNameReceiver,
          InvoiceAddressReceiver: updatedInvoice.InvoiceAddressReceiver,
          InvoicePhoneReceiver: updatedInvoice.InvoicePhoneReceiver,
          InvoiceDate:moment(updatedInvoice.InvoiceDate).format('DD/MM/YYYY') ,
          TotalInvoice: updatedInvoice.TotalInvoice,
          PaymentsInvoice: updatedInvoice.PaymentsInvoice,
          StatusInvoice: updatedInvoice.StatusInvoice,
          Paid: updatedInvoice.Paid,
          NoteInvoice: updatedInvoice.NoteInvoice,
          AccountID: updatedInvoice.AccountID,
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
    //get Invoice History By CustomerId
    getInvoiceHistoryByCustomerId: async (req, res) => {
      try {
        const customerId = req.params.customerId;
        const invoices = await Invoice.find({ AccountID: customerId });
    
        const formattedInvoices = invoices.map(invoice => {
          return {
            id: invoice._id,
            InvoiceNameReceiver: invoice.InvoiceNameReceiver,
            InvoiceAddressReceiver: invoice.InvoiceAddressReceiver,
            InvoicePhoneReceiver: invoice.InvoicePhoneReceiver,
            InvoiceDate: moment(invoice.InvoiceDate).format('DD/MM/YYYY'),
            TotalInvoice: invoice.TotalInvoice,
            PaymentsInvoice: invoice.PaymentsInvoice,
            StatusInvoice: invoice.StatusInvoice,
            Paid: invoice.Paid,
            NoteInvoice: invoice.NoteInvoice,
            AccountID: invoice.AccountID,
          };
        });
    
        res.json(formattedInvoices);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
    //get Invoice History By CustomerId
    getInvoiceDetailByInvoiceId : async (req, res) => {
      try {
        const InvoiceID = req.params.InvoiceID;
        const invoices = await InvoiceDetails.find({ InvoiceID: InvoiceID });

        const formattedInvoices = invoices.map(invoice => {
          return {
            id: invoice._id,
            SizeProductID: invoice.SizeProductID,
            ProductID: invoice.ProductID,
            InvoiceID: invoice.InvoiceID,
            Quantity: invoice.Quantity,
            UnitPrice: invoice.UnitPrice,
          };
        });
    
        res.json(formattedInvoices);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
};

module.exports = invoiceController;
