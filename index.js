import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';
import todoRoutes from './routes/todos.js';

const app = express();
dotenv.config();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api/todos', todoRoutes);

app.get(['/', '/api'], (req, res) => {
    res.send(`todo API is working${req.path}`);
});

const { CONNECTION_URL } = process.env;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`server running on port : ${PORT}`)))
    .catch((error) => console.log(error));

// mongoose.set('useFindAndModify', false);