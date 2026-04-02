import { body, validationResult } from "express-validator"

export const validator = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    next()
}

export const registerValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("name is required")
        .isLength({ min: 4 })
        .withMessage("name must be at least 4 characters long"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("Enter a valid email"),

    body("password")
        .trim()
        .notEmpty()
        .withMessage("password is required")
        .isLength({ min: 4 })
        .withMessage("password must be 6 characters long"),

    validator
]


export const loginValidation = [
    body("username")
        .optional(),

    body("email")
        .trim()
        .optional()
        .isEmail()
        .withMessage("enter your email"),

    body("password")
        .trim()
        .notEmpty()
        .withMessage("password is required")
        .isLength({ min: 6 })
        .withMessage("password must be at least 6 characters long"),

    validator
]