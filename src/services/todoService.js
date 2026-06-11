import fs from 'fs/promises';

const DATA_PATH = './src/data/todos.json';

const readTodos = async () => {
	try {
		const raw = await fs.readFile(DATA_PATH, 'utf8');
		return JSON.parse(raw);
	} catch (err) {
		return [];
	}
};

const writeTodos = async (todos) => {
	await fs.writeFile(DATA_PATH, JSON.stringify(todos, null, 2), 'utf8');
};

const getAll = async () => {
	const todos = await readTodos();
	return todos.filter((t) => !t.completed);
};

const getOne = async (id) => {
	const todos = await readTodos();
	return todos.find((t) => String(t.id) === String(id));
};

const create = async (payload) => {
	const todos = await readTodos();
	const nextId = todos.length ? Math.max(...todos.map((t) => t.id)) + 1 : 1;
	const newTodo = { id: nextId, completed: false, ...payload };
	todos.push(newTodo);
	await writeTodos(todos);
	return newTodo;
};

export default { getAll, getOne, create };
