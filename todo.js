const express = require("express");
const read = require("./read");
const write = require("./write");
const config = require("config");
require("dotenv").config();

const app = express();
const PORT = config.get("serverPort");
app.use(express.json());

app.get(`${process.env.API_URL_TASK}s`, (req, res) => {
  let sortedState = read();

  if (req.query.order === "asc") {
    sortedState.sort((a, b) => a.dateForSort - b.dateForSort);
  } else if (req.query.order === "desc") {
    sortedState.sort((a, b) => b.dateForSort - a.dateForSort);
  }

  let filtredTasks = [...sortedState];

  if (req.query.filterBy === "done") {
    filtredTasks = sortedState.filter((item) => item.done === true);
  } else if (req.query.filterBy === "undone") {
    filtredTasks = sortedState.filter((item) => item.done === false);
  }

  // Добавить условие на проверку page
  const currentPage = req.query.page; // current page query - page
  const todosPrePage = req.query.pp; // всего задачь на странице query - pp
  const lastTodoIndex = currentPage * todosPrePage;
  const firstTodoIndex = lastTodoIndex - todosPrePage;
  const currentTodoPage = filtredTasks.slice(firstTodoIndex, lastTodoIndex);

  const countAndTasks = {
    count: filtredTasks.length,
    tasks: currentTodoPage,
  };

  res.json(countAndTasks);
});

app.post(process.env.API_URL_TASK, (req, res) => {
  if (req.body.name === "") res.s;

  const tasks = read();
  const newTask = {
    ...req.body,
    uuid: Date.now(),
    createdAt: new Date().toLocaleString(), // cейчас оставил, чтосто для Теста, потом удалить
    dateForSort: Date.now(),
  };
  const addTask = [...tasks, newTask];
  write(addTask);
  res.json({ status: 200 });
});

app.delete(`${process.env.API_URL_TASK}/:id`, (req, res) => {
  const id = req.params.id;
  const tasks = read();
  const deletTask = tasks.filter((item) => +item.uuid !== +id);
  write(deletTask);
  res.json({ status: 200 });
});

app.patch(`${process.env.API_URL_TASK}/:id`, (req, res) => {
  if (!req.body.name || req.body.name.trim() === "")
    return res.status(400).json({ massege: "task not create" });

  const id = +req.params.id;
  const { name, done, createdAt } = req.body;
  const tasks = read();
  const index = tasks.findIndex((item) => +item.uuid === +id);
  if (index === -1)
    return res.status(404).json({ massege: "Invalid fields in request" });
  tasks[index] = {
    uuid: id,
    name,
    done,
    createdAt,
    dateForSort: Date.now(),
  };
  write(tasks);
  res.status(200).json({ massege: "good" });
});

app.listen(PORT, () => {
  console.log("Server has been started on PORT", PORT);
});
