const express = require('express');
const jwt = require("jsonwebtoken");
const loginController = require("../controller/loginController");
const loadProcessController = require("../controller/loadProcessController");
const app = express();

//LOGUE PARA OBTENER EL TOKEN
app.post("/login",loginController.login);
//VERIFICAR LA VALIDES DEL TOKEN
app.post("/posts", loginController.verifyToken, (req , res) => {

    jwt.verify(req.token, 'secretkey', (error, authData) => {
        if(error){
            res.sendStatus(403);
        }else{
            res.json({
                    mensaje: "Post fue creado",
                    authData
                });
        }
    });
});
//OBTENER LOS JSON DE CAMBIO DE ESTADO OPTACHECK
app.post("/loadProcess/JSON/optacheck",loginController.verifyToken,loadProcessController.executeLoadProcess);
module.exports = app; 