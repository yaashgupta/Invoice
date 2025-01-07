const Invoice = require('../models/invoice.model');

// Get all invoices
exports.getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.json(invoices);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
};

// Add a new invoice
exports.addInvoice = async (req, res) => {
  try {
    const newInvoice = new Invoice(req.body);
    await newInvoice.save();
    res.json('Invoice added!');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
};

// Get a single invoice by ID
exports.getInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json('Invoice not found');
    }
    res.json(invoice);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
};

// Update an invoice
exports.updateInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json('Invoice not found');
    }
    
    Object.assign(invoice, req.body);
    await invoice.save();
    res.json('Invoice updated!');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
};

// Delete an invoice
exports.deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);
    if (!invoice) {
      return res.status(404).json('Invoice not found');
    }
    res.json('Invoice deleted.');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
};

