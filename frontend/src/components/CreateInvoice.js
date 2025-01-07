import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import jsPDF from 'jspdf';

const CreateInvoice = () => {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [items, setItems] = useState([{ description: '', quantity: 0, price: 0 }]);

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { description: '', quantity: 0, price: 0 }]);
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  };

  const generatePDF = (invoiceData) => {
    const doc = new jsPDF();
    doc.text(`Invoice for ${invoiceData.customerName}`, 20, 20);
    doc.text(`Email: ${invoiceData.customerEmail}`, 20, 30);
    doc.text('Items:', 20, 40);
    let y = 50;
    invoiceData.items.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.description} - Quantity: ${item.quantity}, Price: $${item.price}`, 30, y);
      y += 10;
    });
    doc.text(`Total: $${invoiceData.total.toFixed(2)}`, 20, y + 10);
    doc.save('invoice.pdf');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const invoiceData = {
      customerName: customerName,
      customerEmail: customerEmail,
      items: items,
      total: calculateTotal()
    };

    console.log('Sending invoice data:', invoiceData);

    axios.post('http://localhost:5000/api/invoices/add', invoiceData)
      .then(res => {
        console.log('Server response:', res.data);
        console.log(res.data);
        generatePDF(invoiceData);
      })
      .catch(err => {
        console.error('Error sending invoice:', err);
      });

    setCustomerName('');
    setCustomerEmail('');
    setItems([{ description: '', quantity: 0, price: 0 }]);
  };

  return (
    <Paper style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Create New Invoice
      </Typography>
      <form onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Customer Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Customer Email"
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
            />
          </Grid>
          {items.map((item, index) => (
            <Grid container item spacing={2} key={index}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Item Description"
                  value={item.description}
                  onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  fullWidth
                  label="Quantity"
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  fullWidth
                  label="Price"
                  type="number"
                  value={item.price}
                  onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value))}
                />
              </Grid>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button variant="outlined" onClick={addItem}>
              Add Item
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              Total: ${calculateTotal().toFixed(2)}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Create Invoice
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default CreateInvoice;

