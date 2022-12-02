import fs from "fs";
import path from "path";
const __dirname = path.resolve();

const read = () => {
  return JSON.parse(fs.readFileSync(`${__dirname}/Data/tasks.json`, "utf8"));
};

export default read;
