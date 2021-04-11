const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {

    const {email, password} = req.body;

    try {

        const existEmail = await User.findOne({email: email});

        if(existEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }

        const user = new User(req.body);

        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        //guardar db
        await user.save();


        //Token
       const token = await generateJWT(user.id); 

        res.json({
            ok: true,
            user,
            token
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

    
     
}


const login = async (req, res = response) => {

    const {email, password} = req.body;

    try {

        const user = await User.findOne({email: email});

        if(!user) {

            return res.status(400).json({
                ok: false,
                msg: 'El correo no esta registrado'
            });
            
        }

        const validPassword = await bcrypt.compareSync(password, user.password );

        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña invalida'
            });
        }

        const token = await generateJWT(user.id); 
        
        res.json({
            ok: true,
            user,
            token
        })
        
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
     
}

const renewToken = async (req, res = response) => {
    const {uid} = req.uid;

    try {

        const user = await User.findOne({uid: uid});

        if(!user) {

            return res.status(400).json({
                ok: false,
                msg: 'Consulte con el administrador!!'
            });
            
        }

        const token = await generateJWT(user.id); 
        
        res.json({
            ok: true,
            user,
            token
        });
        
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    createUser,
    login,
    renewToken
}