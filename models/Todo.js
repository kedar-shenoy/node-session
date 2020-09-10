const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  is_done: {
    type: Boolean,
    required: true,
  },
});

const Todo = mongoose.model("Todo", todoSchema, "todos");

module.exports = Todo;
