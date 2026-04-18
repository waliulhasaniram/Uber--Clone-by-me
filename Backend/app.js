const dotenv = require('dotenv');
dotenv.config({ debug: true });
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const cors = require('cors');
const connectDB = require('./db/db');
const userRouter = require('./route/user.route');
const captainRoute = require('./route/captain.route');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    message: 'Too many requests from this IP, please try again after 15 minutes'
});


const corsOptions = {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173', // Do not use '*' in production
    methods: 'GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS',
    allowedHeaders: 'Content-Type,form-data,Authorization',
    credentials: true,
}

app.set('trust proxy', 1); // Trust first proxy (useful for Heroku, Nginx, etc.)
app.use(helmet());
app.use(cors(corsOptions));
app.use(globalLimiter);

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', userRouter);
app.use('/api/captain', captainRoute);

app.get('/', (req, res) => {
  res.send('Ubar...!');
});

connectDB().then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
})