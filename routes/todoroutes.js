const express = require('express');
const router = express.Router();
const{createTodo, getTodos, updateTodo, deleteTodo} = require('../controller/todocontroller');
const authMiddleware = require('../middleware/authmiddleware');

router.use(authMiddleware);
router.post('/',createTodo);
router.get('/', getTodos);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

module.exports = router;
