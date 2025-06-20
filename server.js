const dotenv = require('dotenv')
const express = require('express');
const authroutes = require('./routes/authroutes');
const todoroutes = require('./routes/todoroutes');

dotenv.config();
const app = express();
console.log('Loaded JWT_SECRET:', process.env.JWT_SECRET);


app.use(express.json());

app.use('/api/auth', authroutes);
app.use('/api/todos', todoroutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});