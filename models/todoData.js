import mongoose from 'mongoose';

const todoSchema = mongoose.Schema({
    title: String,
    discription: String,
    done: Boolean,
    selectedFile: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    },
});

const TodoData = mongoose.model('TodoData', todoSchema);
export default TodoData;