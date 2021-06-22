const express = require('express');

const router = express.Router();
const database = require('./database');

const { mongoose, Schema, fetchUrl } = database;

const apiUrl = 'https://api.covid19india.org/v4/min/data.min.json';

const schema = new Schema({
  location: {
    type: Map,
    required: true,
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
  },
  delta7: {
    type: Map,
    required: true,
  },
  total: {
    type: Map,
    required: true,
  },
});

const covidData = mongoose.model('CovidData', schema, 'CovidData');

router.get('/', async (req, res, next) => {
  try {
    const items = await covidData.find();
    res.json(items);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { state, city } = req.body;
    const data = await fetchUrl(apiUrl);
    if (data[state] === undefined || data[city] === undefined) {
      res.status(404);
      return res.json(req.body);
    }
    const item = new covidData({
      location: {
        city,
        state,
      },
      delta7: data[state].districts[city].delta7,
      total: data[state].districts[city].total,
    });
    if (!item) return next();
    item.save();
    return res.json(item);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
