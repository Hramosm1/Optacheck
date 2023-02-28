var jwt = require('../services/jwt');

class MainController{
    login(req,res){
        let params = req.body;
        let paramUser = params.user;
        let paramPassword = params.password;

        try{
            if (paramUser != 'optacheck_recagua') {
                return res.status(403).send({message:'El usuario que ingreso es incorrecto'});
            }else if(paramPassword != '7ky6*09HzIVw'){
                return res.status(403).send({message:'El password que ingreso es incorrecto'});
            }else{
                let user = {
                    id: 1,
                    user: paramUser,
                    password : paramPassword
                }
                let token = jwt.createToken(user);
                return res.status(201).send(token);
            }

        }catch (error) {
            return res.status(500).send({ message: error })
    
        }
    }

    verifyToken(req,res,next){
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== 'undefined') {
            const bearerToken = bearerHeader.split(" ")[1];
            req.token = bearerToken;
            next();
        } else {
            res.sendStatus(403);
        }
    }
}

const userController = new MainController();
module.exports = userController;