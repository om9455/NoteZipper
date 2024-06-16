const express = require("express");
const notes=require("./notes.js")
const dotenv=require("dotenv")
const connectDB=require("./config/db.js")
const userRoutes=require('./routes/userRoutes.js');
const noteRoutes=require('./routes/noteRoutes.js');
const { notFound, errorHandler } = require("./middlewares/errorMiddleware.js");
// import cors from 'cors'
const app = express();
dotenv.config();
connectDB(); 
// app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('API is Running');
})

app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);
app.use(notFound)
app.use(errorHandler)
app.listen(process.env.PORT ||5000, console.log(`Server started on PORT ${process.env.PORT}`));
 
  