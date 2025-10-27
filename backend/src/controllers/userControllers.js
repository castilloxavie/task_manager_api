import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/userModels.js"
import {generateToken} from "../utils/generateToken.js"
import {handleError} from "../utils/handleError.js"
import { serializeUserWithToken } from "../serializers/userSerializer.js"




// registrar un nuevo usuario

export const registrarUsuario = async(req, res) => {
    try {
        
        //logica para registrar un usuario
        const {name, email, password}  = req.body;

        //verificar si el usuario existe
        const usuarioExiste = await User.findOne({where: {email}})
        if(usuarioExiste){
            return handleError(res, 400, "El usuario ya existe")
        }

        //encriptar la contraseña (hash)
        const encriptarContraseña = await bcrypt.hash(password, 10)

        //crear el usuario
        const usuarioCreado = await User.create({
            name,
            email,
            password: encriptarContraseña,

        })
        console.table(usuarioCreado)
       
        //generar el token
        const token = generateToken(usuarioCreado.id)
        console.log(token)

        res.status(201).json({
            mensaje: "Usuario creado correctamente",
            token,
            usuarioCreado: {
                id: usuarioCreado.id,
                name: usuarioCreado.name,
                email: usuarioCreado.email,
            }
        })



    } catch (error) {
        console.error("Error detallado al registrar usuario:", error);
        handleError(res, 500, "Error al registrar el usuario")
    }
    
}

// login de usuario
export const loginUsuario = async(req, res) => {
    try {
        const {email, password} = req.body;

        //verificar si el usuario existe
        const usuarioExiste = await User.findOne({where: {email}})
        if(!usuarioExiste){
            return handleError(res, 400, "El usuario o contraseña no existe")
        }

        //verificar contraseña
        const validarContraseña = await bcrypt.compare(password, usuarioExiste.password)
        if(!validarContraseña){
            return handleError(res, 400, "El usuario o contraseña no existe")
        }

        //generar el token
        const token = generateToken(usuarioExiste.id)
        console.log(token)

        res.status(200).json({
            mensaje: "Usuario logueado correctamente",
            token,
            usuario: {
                id: usuarioExiste.id,
                name: usuarioExiste.name,
                email: usuarioExiste.email,
            }
        })

    } catch (error) {
        handleError(res, 500, "Error al loguear el usuario")
    }
}