require('dotenv').config();
const express = require('express');
const cors = require('cors')
const dbConfig = require('./db/dbConfig');
const bookRouter = require('./routes/bookRouter')
const userRouter = require('./routes/userRouter')
const borrowRouter = require('./routes/borrowRouter')
const app = express();

app.use(cors())

app.use(express.json());

app.use("/api/v1",bookRouter)

app.use("/api/v1",userRouter)

app.use("/api/v1",borrowRouter)

const port = process.env.PORT || 3001

app.listen(port , async()=>{ 
    await dbConfig()
    console.log(`server is listening on port ${port}`)
})