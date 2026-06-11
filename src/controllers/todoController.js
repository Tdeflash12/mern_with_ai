import todoService from '../services/todoService.js';

const getTodos = async (req, res) => {
  try {
    const data = await todoService.getAll();
    // debug
    // eslint-disable-next-line no-console
    console.log('todos data type:', typeof data, 'length:', Array.isArray(data) ? data.length : 'n/a');
    res.json(data);
  } catch (err) {
    res.status(500).send('Failed to get todos');
  }
};

const getOneTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await todoService.getOne(id);
    res.json(data);
  } catch (err) {
    res.status(500).send('Failed to get todo');
  }
};

const createTodo = async (req, res) => {
  try {
    const created = await todoService.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).send('Failed to create todo');
  }
};

export default { getTodos, getOneTodo, createTodo };