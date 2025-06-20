const db = require('../config/db');

exports.createTodo = async (req, res) => {
    const {title, description}= req.body;
    const userid = req.user.id;

    const result = await db.query (
        'INSERT INTO todos(title,description,user_id) VALUES($1,$2,$3) RETURNING *',[title,description,userid]
    );

    console.log(`New todo created by user ${userid}`);
    res.status(201).json(result.rows[0]);
};
exports.getTodos = async(req, res) => {
    const userID = req.user.id;

    const result = await db.query (
        'SELECT * FROM todos WHERE user_id = $1 ORDER BY created_at DESC', [userID]
    );
    console.log(`Fetched todos for user ${userID}`);
    res.json(result.rows);
};

exports.updateTodo = async (req, res) => {
    const {id} = req.params;
    const { title,description,status} = req.body;
    const user_id = req.user.id;

    const result = await db.query(
        'UPDATE todos SET title = $1,description= $2, status=$3 WHERE id=$4 AND user_id = $5 RETURNING *',[title,description,status,id,user_id]
    );
    if(result.rows.length === 0) return res.status(403).json({error: 'Forbidden'});
    console.log(`Todo Updated by user ${user_id}` );
    res.json(result.rows[0]);    
};


exports.deleteTodo = async (req, res) => {
    const {id} = req.params;
    const user_id = req.user.id;
    
    const result = await db.query (
        'DELETE FROM TABLE todos WHERE id = $1 AND user_id = $2 RETURNING *',[id, user_id]
    );

    if(result.rows.count === 0) return res.status(403).json({error: 'Forbidden'});

    console.log(`Todo deleted by user ${user_id}`);
    res.json({message: 'Todo deleted Successfully'});
};

