'use strict'
const jwt = require('jsonwebtoken');

exports.createToken = function (user) {
    let token = jwt.sign({ user }, 'secretkey', { expiresIn: '2M' })
    return token;
    
}

