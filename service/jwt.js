const jwt = require('jsonwebtoken');
const {SECRETKEY} = process.env


exports.createToken = function(user){
    jwt.sign({user},SECRETKEY,{expiresIn:'1m'},(err,token)=>{
        res.json({
            token
        });
    })
}
