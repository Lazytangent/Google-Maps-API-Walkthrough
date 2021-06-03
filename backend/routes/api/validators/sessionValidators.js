const { check } = require('express-validator');
const { handleValidationErrors } = require('../../../utils/validation');

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid email or username.')
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors,
];

module.exports = {
  validateLogin,
};
