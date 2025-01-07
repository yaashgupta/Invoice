const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://yash:LJkRJrNiBm0eUEHy@cluster0.fgxvp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(uri)
  .then(() => console.log("MongoDB database connection established successfully"))
  .catch(err => console.log("MongoDB connection error: ", err));

const invoicesRouter = require('./routes/invoices');

app.use('/api/invoices', invoicesRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
