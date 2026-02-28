import fs from "fs";
const getAll = () => {
  const rawData = fs.readFileSync("./src/data/todos.json", "utf8");
  const todos = JSON.parse(rawData);
  // completed task
  const completedTask = todos.filter((item) => !item.completed);
  return completedTask;
};
const getOne = () => {
  const rawData = fs.readFileSync("./src/data/todos.json", "utf8");
  const todos = JSON.parse(rawData);

  const oneTask = todos.find((item) => item.id == 10);
  return oneTask;
};
export default { getAll, getOne };
