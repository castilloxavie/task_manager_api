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

export const validateTask = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('El título es requerido')
        .isLength({ min: 1, max: 100 })
        .withMessage('El título debe tener entre 1 y 100 caracteres'),

    body('description')
        .trim()
        .notEmpty()
        .withMessage('La descripción es requerida')
        .isLength({ min: 1, max: 500 })
        .withMessage('La descripción debe tener entre 1 y 500 caracteres'),

    body('status')
        .optional()
        .isIn(['pendiente', 'en_progreso', 'completada'])
        .withMessage('El estado debe ser pendiente, en_progreso o completada'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return handleError(res, 400, errors.array()[0].msg);
        }
        next();
    }
];
