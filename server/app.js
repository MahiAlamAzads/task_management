require('dotenv').config();
const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const cors = require('cors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const connectDB = require('./config/mongodb');

const app = express();

// CONNECT DATABASE HERE (before routes)
connectDB();

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

module.exports = app;
