
import fs from "fs/promises";

type Todo = {
  id: number;
  title?: string;
  completed: boolean;
  [key: string]: any;
};

const DATA_PATH = "./src/data/todos.json";

const readTodos = async (): Promise<Todo[]> => {
  try {
    const raw = await fs.readFile(DATA_PATH, "utf8");
    return JSON.parse(raw) as Todo[];
  } catch (err) {
    return [];
  }
};

const writeTodos = async (todos: Todo[]) => {
  await fs.writeFile(DATA_PATH, JSON.stringify(todos, null, 2), "utf8");
};

const getAll = async (): Promise<Todo[]> => {
  const todos = await readTodos();
  return todos.filter((item) => !item.completed);
};

const getOne = async (id: string | number): Promise<Todo | undefined> => {
  const todos = await readTodos();
  return todos.find((item) => String(item.id) === String(id));
};

const create = async (payload: Partial<Todo>): Promise<Todo> => {
  const todos = await readTodos();
  const nextId = todos.length ? Math.max(...todos.map((t) => t.id)) + 1 : 1;
  const newTodo: Todo = { id: nextId, completed: false, ...payload } as Todo;
  todos.push(newTodo);
  await writeTodos(todos);
  return newTodo;
};

export default { getAll, getOne, create };
