const fs = require("fs");

const read = () => {
  return JSON.parse(fs.readFileSync(`${__dirname}/tasks.json`, "utf8"));
};

const write = (task) => {
  fs.writeFileSync(`${__dirname}/tasks.json`, JSON.stringify(task, 1, 2));
};

module.exports = {
  read,
  write,
};
