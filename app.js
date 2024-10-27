const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');

const db = require('./config/mongoose-connection');
const ownerRouter = require('./routes/ownerRouter');
const productsRouter = require('./routes/productsRouter');
const userRouter = require('./routes/userRouter');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.set('view engine', 'ejs');  // Corrected syntax
app.set('views', path.join(__dirname, 'views'));  // Optional, ensures views folder is found

app.use("/owners", ownerRouter);  //handling routes separately
app.use('/users', userRouter);
app.use('/products',productsRouter);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
