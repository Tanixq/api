const {
    checkSchema,
    validationResult
} = require('express-validator');
const rules = require('./rules');


const validate = async (req, res, next) => {
    const errorResult = validationResult(req).array()
    if (errorResult.length > 0) {
        res.status(422).send({ errorResult })
    } else {
        next()
    }
}

const validateRegister = [checkSchema(rules.register), validate];
const validateLogin = [checkSchema(rules.register), validate];

module.exports = {
    validateRegister,
    validateLogin
}
