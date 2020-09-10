const express = require("express");
const Todo = require("./models/Todo");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;
app.use(express.json());

mongoose.connect(
  "mongodb://localhost:27017/node_session",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) console.log(err);
    else console.log("Connected to the database");
  }
);

app.get("/todos", async (req, res) => {
  //   let id = req.params.id;
  //   console.log(id);
  //   let obj = {
  //     title: "Buy a new foorwear",
  //     is_done: false,
  //   };
  //   res.send(obj);

  const todos = await Todo.find({});

  if (!todos) {
    return res.status(404).send({ message: "Not found" });
  }

  res.status(200).send({ message: "Success", todos });
});

app.get("/todos/:id", async (req, res) => {
  const id = req.params.id;

  const todo = await Todo.findById(id);

  if (!todo) {
    return res.status(404).send({ message: "Not found" });
  }

  res.status(200).send({ message: "Success", todo });
});

app.post("/todos", async (req, res) => {
  const body = req.body;

  //{title: "adfdsfj", is_done: flae}

  const todo = new Todo(body);
  await todo.save();

  console.log(todo);
  res.status(201).send({ message: "Created new TODO", todo });
});

app.put("/todos/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  await Todo.findByIdAndUpdate(id, { $set: body });

  const updated_todo = await Todo.findById(id);

  console.log(updated_todo);
  res.status(200).send({ message: "Updated TODO", updated_todo });
});

app.delete("/todos/:id", async (req, res) => {
  const id = req.params.id;

  await Todo.findByIdAndRemove(id);

  res.status(200).send({ message: "Deleted TODO" });
});

app.listen(PORT, () => {
  console.log("Server started at port number " + PORT);
});
