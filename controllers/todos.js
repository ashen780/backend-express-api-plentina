import mongoose from "mongoose";
import TodoData from "../models/todoData.js";

export const getTodos = async (req, res) => {
    try {
        const AllTodoData = await TodoData.find();
        res.status(200).json(AllTodoData);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


export const createTodo = async (req, res) => {
    const todo = req.body;
    try {
        const newTodo = new TodoData({
            title: todo.title,
            discription: todo.discription,
            done: todo.done,
            selectedFile: todo.selectedFile,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updateTodo = async (req, res) => {
    const { id: _id } = req.params;
    const todo = req.body;
    // console.log(todo);
    try {
        const updateTodoData = {
            title: todo.title,
            discription: todo.discription,
            done: todo.done,
            selectedFile: todo.selectedFile,
            updatedAt: new Date()
        };
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            res.status(404).send('No todo with that id');
        } else {
            const updatedTodo = await TodoData.findByIdAndUpdate(_id, updateTodoData, { new: true });
            res.json(updatedTodo);
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const deleteTodo = async (req, res) => {
    const { id: _id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            res.status(404).send('No Todo with that id');
        } else {
            await TodoData.findByIdAndRemove(_id);
            res.json({ message: 'Todo delete successfully' });
        }

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};







