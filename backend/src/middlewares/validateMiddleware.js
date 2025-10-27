import { body, validationResult } from 'express-validator';
import { handleError } from '../utils/handleError.js';

export const validateRegister = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('El nombre es requerido')
        .isLength({ min: 2, max: 50 })
        .withMessage('El nombre debe tener entre 2 y 50 caracteres'),

    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Email inválido'),

    body('password')
        .isLength({ min: 6 })
        .withMessage('La contraseña debe tener al menos 6 caracteres'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return handleError(res, 400, errors.array()[0].msg);
        }
        next();
    }
];

export const validateLogin = [
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Email inválido'),

    body('password')
        .notEmpty()
        .withMessage('La contraseña es requerida'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return handleError(res, 400, errors.array()[0].msg);
        }
        next();
    }
];
