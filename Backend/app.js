const dotenv = require('dotenv');
dotenv.config({ debug: true });
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const cors = require('cors');
const connectDB = require('./db/db');
const userRouter = require('./route/user.route');
const cookieParser = require('cookie-parser');


const corsOptions = {
    origin: '*', // Replace with your frontend URL
    methods: 'GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS',
    allowedHeaders: 'Content-Type,form-data,Authorization',
    credentials: true,
}

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', userRouter);

app.get('/', (req, res) => {
  res.send('Ubar...!');
});

connectDB().then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
})