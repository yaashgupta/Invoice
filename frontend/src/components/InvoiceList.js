import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/invoices')
      .then(response => {
        setInvoices(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  const deleteInvoice = (id) => {
    axios.delete(`http://localhost:5000/api/invoices/${id}`)
      .then(response => {
        console.log(response.data)
        setInvoices(invoices.filter(el => el._id !== id))
      });
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Customer Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice._id}>
              <TableCell>{invoice.customerName}</TableCell>
              <TableCell>{invoice.customerEmail}</TableCell>
              <TableCell>${invoice.total.toFixed(2)}</TableCell>
              <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
              <TableCell>
                <Button variant="contained" color="secondary" onClick={() => { deleteInvoice(invoice._id) }}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default InvoiceList;

