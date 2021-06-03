const router = require('express').Router();
const apiRouter = require('./api');

router.use('/api', apiRouter);

if (process.env.NODE_ENV === 'production') {
  const path = require('path');

  router.get('/', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, '../../frontend', 'build', 'index.html')
    );
  });

  router.use(express.static(path.resolve('../frontend/build')));

  router.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie('XSRF-TOKEn', req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, '../../frontend', 'build', 'index.html')
    );
  });
}

if (process.env.NODE_ENV !== 'production') {
  router.get('/api/csrf/restore', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.json({});
  });
}

/** Route for testing backend API routes */
// router.get('/hello/world', (req, res) => {
//   res.cookie('XSRF-TOKEN', req.csrfToken());
//   res.send('Hello World!');
// });

module.exports = router;
