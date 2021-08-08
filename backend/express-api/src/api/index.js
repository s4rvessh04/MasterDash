const express = require('express');

const emojis = require('./emojis');
const weather = require('./weather');
const github = require('./github');
const covid = require('./covid');
const news = require('./news');
const servers = require('./servers');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/emojis', emojis);
router.use('/weather', weather);
router.use('/github', github);
router.use('/covid', covid);
router.use('/news', news);
router.use('/servers', servers);

module.exports = router;
