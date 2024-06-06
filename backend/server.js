const express = require("express");
const notes=require("./notes.js")
const dotenv=require("dotenv")
const connectDB=require("./config/db.js")
const userRoutes=require('./routes/userRoutes.js');
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
app.get('/api/notes', (req, res) => {
    res.json(notes); 
})
app.get('/api/notes/:id',async (req, res) => {
    const note = await notes.find((note)=>note._id===req.params.id)
    res.json(note);
})
app.use('/api/users', userRoutes);
app.use(notFound)
app.use(errorHandler)
app.listen(process.env.PORT ||5000, console.log(`Server started on PORT ${process.env.PORT}`));
 
  