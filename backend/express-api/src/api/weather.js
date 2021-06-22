const express = require('express');
const { errorHandler } = require('../middlewares');

const database = require('./database');

const router = express.Router();
const { mongoose, Schema, fetchUrl } = database;

const weatherUrl =	'http://api.openweathermap.org/data/2.5/forecast?id=1279105&appid=7352f2a36329d0945706acb0db6b7b43';

// Schemas
const Day = new Schema({
  wind: {
    type: Map,
    required: true,
    speed: {
      type: Number,
      required: true,
    },
    gust: {
      type: Number,
      required: true,
    },
    deg: {
      type: Number,
      required: true,
    },
  },
  tempMin: {
    type: Number,
    required: true,
  },
  tempMax: {
    type: Number,
    required: true,
  },
  weatherType: {
    type: String,
    required: true,
  },
});

const Weather = new Schema({
  location: {
    type: Map,
    required: true,
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  today: {
    type: Day,
    required: true,
    default: {},
  },
  tommorow: {
    type: Day,
    required: true,
    default: {},
  },
  nextDay: {
    type: Day,
    required: true,
    default: {},
  },
});

// Models
const WeatherData = mongoose.model('WeatherData', Weather, 'WeatherData');

// Routes
router.get('/', async (req, res, next) => {
  try {
    const items = await WeatherData.find();
    res.json(items);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const value = await req.body;
    if (value.value === 'foo') {
      res.status(202);
      return res.json(value);
    }
    const data = await fetchUrl(weatherUrl);

    const dates = simplifiedDates();
    const { today } = dates;
    const { tommorow } = dates;
    const { nextDay } = dates;

    const todayData = await cleanedData(data, today);
    const tommorowData = await cleanedData(data, tommorow);
    const nextDayData = await cleanedData(data, nextDay);

    const item = new WeatherData({
      location: {
        city: data.city.name,
        country: data.city.country,
      },
      today: {
        wind: {
          speed: todayData.speed,
          gust: todayData.gust,
          deg: todayData.deg,
        },
        tempMin: todayData.min,
        tempMax: todayData.max,
        weatherType: todayData.type,
      },
      tommorow: {
        wind: {
          speed: tommorowData.speed,
          gust: tommorowData.gust,
          deg: tommorowData.deg,
        },
        tempMin: tommorowData.min,
        tempMax: tommorowData.max,
        weatherType: tommorowData.type,
      },
      nextDay: {
        wind: {
          speed: nextDayData.speed,
          gust: nextDayData.gust,
          deg: nextDayData.deg,
        },
        tempMin: nextDayData.min,
        tempMax: nextDayData.max,
        weatherType: nextDayData.type,
      },
    });

    if (!item) return next();
    item.save();
    return res.json(item);
  } catch (error) {
    res.status(404).json(error.message);
  }
});

router.put('/:id', (req, res) => {});

const cleanedData = async (data, date) => {
  const dataFetched = data.list;
  const dayData = {
    speed: 0,
    gust: 0,
    deg: 0,
    min: 0,
    max: 0,
    type: '',
  };
  Object.values(dataFetched).map((data) => {
    if (date === data.dt_txt.split(' ')[0]) {
      dayData.speed = Math.round(data.wind.speed);
      dayData.gust = Math.round(data.wind.gust);
      dayData.deg = degreeToDirection(data.wind.deg);
      dayData.min = Math.round(data.main.temp_min - 273.15);
      dayData.max = Math.round(data.main.temp_max - 273.15);
      dayData.type = data.weather[0].main;
    }
  });
  return dayData;
};

const simplifiedDates = () => {
  const today = new Date().toISOString().slice(0, 10);

  const raw_tommorow = new Date(today);
  raw_tommorow.setDate(raw_tommorow.getDate() + 1);
  const tommorow = raw_tommorow.toISOString().slice(0, 10);

  const raw_nextDay = new Date(tommorow);
  raw_nextDay.setDate(raw_nextDay.getDate() + 1);
  const nextDay = raw_nextDay.toISOString().slice(0, 10);

  return {
    today,
    tommorow,
    nextDay,
  };
};

const degreeToDirection = (num) => {
  const val = Math.floor(num / 22.5 + 0.5);
  const arr = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
  ];
  return arr[val % 16];
};

module.exports = router;
