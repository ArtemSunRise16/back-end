import read from "../read.js";
import write from "../write.js";
import { validationResult } from "express-validator";
import ApiError from "../error/apiError.js";

export default class UserTaskController {
  async get(req, res) {
    try {
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
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  async post(req, res, next) {
    try {
      const tasks = read();
      const newTask = {
        ...req.body,
        uuid: Date.now(),
        dateForSort: Date.now(),
      };
      const addTask = [...tasks, newTask];
      write(addTask);
      res.json({ status: 201 });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  async delete(req, res, next) {
    try {
      const id = req.params.id;
      const tasks = read();
      const deletTask = tasks.filter((item) => +item.uuid !== +id);
      write(deletTask);
      res.status(200).json({ status: 204 });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  async patch(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const tasks = read();

      const id = +req.params.id;
      const { name, done, createdAt } = req.body;
      const index = tasks.findIndex((item) => +item.uuid === +id);
      tasks[index] = {
        uuid: id,
        name,
        done,
        createdAt,
        dateForSort: Date.now(),
      };
      write(tasks);
      res.status(200).json({ massege: "good" });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
}
