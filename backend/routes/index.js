const router = require('express').Router();
const apiRouter = require('./api');

router.use('/api', apiRouter);

/** Route for testing backend API routes */
// router.get('/hello/world', (req, res) => {
//   res.cookie('XSRF-TOKEN', req.csrfToken());
//   res.send('Hello World!');
// });

module.exports = router;
