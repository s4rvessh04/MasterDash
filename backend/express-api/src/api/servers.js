const express = require('express');
const { fetchUrl } = require('./database');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const portFolio = await fetchUrl(
      'https://sarveshrane2000-portfolio.netlify.app/',
      null,
      true
    );
    const project = await fetchUrl('http://localhost:5000/api/v1', null, true);
    res.json({
      Project: project.status,
      Portfolio: portFolio.status,
      Website1: 503,
      Website2: 503,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
