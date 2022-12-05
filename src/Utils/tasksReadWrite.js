const fs = require("fs");

const read = async () => {
  let content = await fs.promises.readFile(`${__dirname}/tasks.json`, "utf8");

  return JSON.parse(content);
};

const write = async (task) => {
  const content = await fs.promises.writeFile(
    `${__dirname}/tasks.json`,
    JSON.stringify(task, 1, 2)
  );
  return content;
};

module.exports = {
  read,
  write,
};
