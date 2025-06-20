const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
exports.register =async (req,res) => {
    const {username, password} = req.body;
    const hash = await bcrypt.hash(password,10);

    try{
        const result = await db.query('INSERT INTO users(username,password) VALUES($1,$2)RETURNING *',[username,hash]);
        console.log('User Registered:',username);
        res.status(201).json({message: 'User Registered'});
    }catch (err){
        console.error('Registration Error: ',err.message);
    }

};

exports.login = async (req, res) => {
    const {username, password} = req.body;
    const result =await db.query('SELECT * FROM users WHERE username = $1',[username]);
    if(result.rows.length === 0)
        return res.status(400).json({
            error: 'Invalid Credentials'
        });
    const user = result.rows[0];
    const match = await bcrypt.compare(password,user.password);
    
    if(!match) return res.status(400).json ({
        error: 'Invalid credentials'
    });



    const token = jwt.sign({userId:user.id},process.env.JWT_SECRET,{expiresIn: '1h'});
    console.log('User Logged In:',username);
    res.json({token});
};
