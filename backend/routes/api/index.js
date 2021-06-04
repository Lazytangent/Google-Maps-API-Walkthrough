const router = require('express').Router();

/** Imports for testing routes */
// const asyncHandler = require('express-async-handler');
// const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
// const { User } = require('../../db/models');

const sessionRouter = require('./session');
const usersRouter = require('./users');
const mapsRouter = require('./maps');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/maps', mapsRouter);

/**
 * Route for testing backend then csrfFetch from frontend
 */
// router.post('/test', (req, res) => {
//   res.json({ requestBody: req.body });
// });

/** Routes for testing user auth */
// router.get('/set-token-cookie', asyncHandler(async (_req, res) => {
//   const user = await User.findOne({
//     where: {
//       username: 'Demo-lition',
//     },
//   });
//   setTokenCookie(res, user);
//   return res.json({ user });
// }));

// router.get('/restore-user', restoreUser, (req, res) => {
//   return res.json(req.user);
// });

// router.get('/require-auth', requireAuth, (req, res) => {
//   return res.json(req.user);
// });

module.exports = router;
