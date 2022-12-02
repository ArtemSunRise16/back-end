import fs from "fs";
import path from "path";
const __dirname = path.resolve();

const write = (task) => {
  fs.writeFileSync(`${__dirname}/Data/tasks.json`, JSON.stringify(task, 1, 2));
};

export default write;
