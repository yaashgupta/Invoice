const router = require('express').Router();
let Invoice = require('../models/invoice.model');

router.route('/').get((req, res) => {
  Invoice.find()
    .then(invoices => res.json(invoices))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const newInvoice = new Invoice(req.body);

  console.log('Attempting to save invoice:', newInvoice); // Add this line

  newInvoice.save()
    .then(() => {
      console.log('Invoice saved successfully:', newInvoice); // Add this line
      res.json('Invoice added!')
    })
    .catch(err => {
      console.error('Error saving invoice:', err); // Add this line
      res.status(400).json('Error: ' + err)
    });
});

router.route('/:id').get((req, res) => {
  Invoice.findById(req.params.id)
    .then(invoice => res.json(invoice))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Invoice.findByIdAndDelete(req.params.id)
    .then(() => res.json('Invoice deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Invoice.findById(req.params.id)
    .then(invoice => {
      invoice.customerName = req.body.customerName;
      invoice.customerEmail = req.body.customerEmail;
      invoice.items = req.body.items;
      invoice.total = req.body.total;

      invoice.save()
        .then(() => res.json('Invoice updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

