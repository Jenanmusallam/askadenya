
const jwt =require('jsonwebtoken')

function auth(req, res, next) {
    const token = req.header('token');

    if(!token) res.status(401).json({msg: 'No token'})
try{
    const decoded = jwt.verify(token, 'abd34');
    req.user = decoded;
    next();
}catch(e){
res.status(400).json({msg: 'Token is not valid'})
}
}
module.exports=auth;