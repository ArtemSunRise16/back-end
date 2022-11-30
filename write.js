const fs = require("fs");

const write = (task) => {
  fs.writeFileSync(`${__dirname}/tasks.json`, JSON.stringify(task, 1, 2));
};

module.exports = write;
