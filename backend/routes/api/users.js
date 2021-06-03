const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { validateSignup } = require('./validators/usersValidators');

router.post('', validateSignup, asyncHandler(async (req, res) => {
  const { email, password, username } = req.body;
  const user = await User.signup({ email, username, password });

  setTokenCookie(res, user);

  res.json({
    user,
  });
}));

module.exports = router;
