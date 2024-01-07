const express = require('express');
const cors = require('cors');
const authRouter = require('./routers/auth');
const productRouter = require('./routers/product');
const userRouter = require('./routers/users');

const connectDB = require('./db');
const errorHandlerMiddleware = require('./middlewares/errorHandler');
const app = express();
const port = 3000;

connectDB();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/auth', authRouter);
app.use('/api/users', userRouter);
/*

app.use('/api/posts', postRouter);
*/
app.use('/api/products', productRouter);
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.statusCode = 404;
  next(err);
});

app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
