const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const storesRouter = require('./routes/stores');
const connectDB = require('./config/db');

// Load env variables
dotenv.config({ path: './config/config.env'});

// Connect to databse
connectDB();

const app = express();

// Body Parser
app.use(express.json());

// Enable cors
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/v1/stores', storesRouter )


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))