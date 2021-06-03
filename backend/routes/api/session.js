const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { validateLogin } = require('./validators/sessionValidators');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

router.post('', validateLogin, asyncHandler(async (req, res, next) => {
  const { credential, password } = req.body;

  const user = await User.login({ credential, password });

  if (!user) {
    const err = new Error('Login failed');
    err.status = 401;
    err.title = 'Login failed';
    err.errors = ['The provided credentials were invalid.'];
    return next(err);
  }

  setTokenCookie(res, user);

  res.json({
    user,
  });
}));

router.delete('', (_req, res) => {
  res.clearCookie('token');
  return res.json({ message: 'success' });
})

router.get('', restoreUser, (req, res) => {
  const { user } = req;
  if (user) {
    res.json({
      user: user.toSafeObject()
    });
  } else {
    res.json({});
  }
});

module.exports = router;
