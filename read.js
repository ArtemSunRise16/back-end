const fs = require("fs");

const read = () => {
  return JSON.parse(fs.readFileSync(`${__dirname}/tasks.json`, "utf8"));
};

module.exports = read;
