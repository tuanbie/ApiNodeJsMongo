const invoiceController = require("../controllers/invoiceController");
const router = require("express").Router();

//add invoice
router.post("/createInvoice", invoiceController.createInvoice);
//get  all invoice
router.get("/getInvoice", invoiceController.getAllInvoices);
//update status invoice
router.put("/updateInvoiceStatus/:invoiceId", invoiceController.updateInvoiceStatus);
//update status invoice
router.put("/updateInvoicePaid/:invoiceId", invoiceController.updateInvoicePaid);
//getInvoiceHistoryByCustomerId
router.get("/getInvoiceHistoryByCustomerId/:customerId", invoiceController.getInvoiceHistoryByCustomerId);
//getInvoiceDetailByInvoiceId
router.get("/getInvoiceDetailByInvoiceId/:InvoiceID", invoiceController.getInvoiceDetailByInvoiceId);
module.exports = router;
