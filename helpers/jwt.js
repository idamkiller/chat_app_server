const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '8h'
        }, (err, token) => {
            if(err){
                reject('No se pudo gerer el token');
            } else {
                resolve(token);
            }
        });
    })
}

module.exports = {
    generateJWT
}