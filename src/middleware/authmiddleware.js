const jwt = require('jsonwebtoken');

function middleware (req, res , next)  {
    const authHeader = req.headers.authorization;
    if(!authHeader) return res.status(401).json({error:'Missing Token'});

    const  token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.userId };  // Make sure this matches your token payload
        console.log(`Authenticated user ID: ${req.user.id}`);
        next();

    } catch(err) {
        console.error('Invalid Token');
        res.status(401).json({error: 'Invalid token'});
 }

};
module.exports = middleware;