const { check } = require('express-validator');
const { handleValidationErrors } = require('../../../utils/validation');

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please provide an email.')
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a username.')
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.')
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors,
];

module.exports = {
  validateSignup,
};
