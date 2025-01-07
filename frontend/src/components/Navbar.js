import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Invoice Generator
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Invoices
        </Button>
        <Button color="inherit" component={Link} to="/create">
          Create Invoice
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

