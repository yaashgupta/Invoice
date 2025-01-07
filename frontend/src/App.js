import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import InvoiceList from './components/InvoiceList';
import CreateInvoice from './components/CreateInvoice';
import Navbar from './components/Navbar';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Container>
          <Routes>
            <Route path="/" element={<InvoiceList />} />
            <Route path="/create" element={<CreateInvoice />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;

