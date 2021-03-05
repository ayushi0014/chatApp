const express = require('express');
const app = express();
const connectDb = require('./config/db');
const port = process.env.PORT || 5000;
const cors = require('cors');

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//connecting db
connectDb();

//defining routes
app.use('/user', require('./routes/user'));



app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});