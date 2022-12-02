import fs from "fs";
import path from "path";
const __dirname = path.resolve();

export const read = () => {
  return JSON.parse(
    fs.readFileSync(`${__dirname}/src/Data/tasks.json`, "utf8")
  );
};

export const write = (task) => {
  fs.writeFileSync(
    `${__dirname}/src/Data/tasks.json`,
    JSON.stringify(task, 1, 2)
  );
};
