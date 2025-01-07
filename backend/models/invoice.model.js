const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  items: [{ 
    description: String, 
    quantity: Number, 
    price: Number 
  }],
  total: { type: Number, required: true },
  date: { type: Date, default: Date.now }
}, {
  timestamps: true,
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;

