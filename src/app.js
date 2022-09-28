const express = require('express');
require("./db/connection")
const bookRouter = require('./router/bookrouter');
const userRouter = require('./router/userrouter');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/users', userRouter)
app.use('/books', bookRouter)
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})