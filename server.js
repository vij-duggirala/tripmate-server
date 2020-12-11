const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const connectDB = require('./config/db');
const logger = require('./config/logger');
const authMiddleware = require('./middlewares/auth')

dotenv.config({ path: './.env' });

connectDB();

const unauth = require('./routes/unauth');
const guides = require('./routes/guides')

const app = express();

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());

if (process.env.NODE_ENV === 'dev') {
    app.use(morgan("combined", { "stream": logger.stream }));
}


app.use('', unauth);

app.use('/api', authMiddleware, guides);



const PORT = process.env.PORT || 5000;

app.listen(PORT, logger.info({ message: `Server running in ${process.env.NODE_ENV} mode on port ${PORT}` }));