const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');

const connectDB = require('./config/db');
const logger = require('./config/logger');
const authMiddleware = require('./middlewares/auth')

dotenv.config({ path: './.env' });

connectDB();

const unauth = require('./routes/unauth');
const guides = require('./routes/guides')

const app = express();
app.use(express.json());

app.use(cors());
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Api-Token');
	next();
});

if (process.env.NODE_ENV === 'dev') {
    app.use(morgan("combined", { "stream": logger.stream }));
}


app.use('', unauth);

app.use('/api', authMiddleware, guides);



const PORT = process.env.PORT || 5000;

app.listen(PORT, logger.info({ message: `Server running in ${process.env.NODE_ENV} mode on port ${PORT}` }));
