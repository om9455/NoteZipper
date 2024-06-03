import express from "express"
import notes from "./notes.js";
import dotenv from "dotenv";
const app = express();
dotenv.config();
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
app.listen(process.env.PORT ||5000, console.log(`Server started on PORT ${process.env.PORT}`));
 
 