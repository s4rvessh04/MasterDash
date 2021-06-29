const express = require('express');

const database = require('./database');

const router = express.Router();
const { mongoose, Schema, fetchUrl } = database;

const config = {
  token: process.env.NEWS_TOKEN,
};

const headers = {
  Authorization: config.token,
  'Content-Type': 'application/json',
};

const today = new Date().toISOString().slice(0, 10);

const raw_yesterday = new Date(today);
raw_yesterday.setDate(raw_yesterday.getDate() - 1);
const yesterday = raw_yesterday.toISOString().slice(0, 10);

const techNews = `https://newsapi.org/v2/everything?q=tech&language=en&from=${yesterday}&to=${today}&sortBy=popularity&pageSize=20&apiKey=${config.token}`;
const cryptoNews = `https://newsapi.org/v2/everything?q=crypto&language=en&from=${yesterday}&to=${today}&sortBy=popularity&pageSize=20&apiKey=${config.token}`;
const scienceNews = `https://newsapi.org/v2/top-headlines?category=science&language=en&from=${yesterday}&to=${today}&sortBy=relevancy&pageSize=20&apiKey=${config.token}`;
const countryNews = `https://newsapi.org/v2/top-headlines?country=in&language=en&pageSize=20&apiKey=${config.token}`;
const worldNews = `https://newsapi.org/v2//top-headlines?sources=google-news&language=en&pageSize=20&apiKey=${config.token}`;

const newsType = (type) => {
  switch (type) {
    case 'technology':
      return techNews;
    case 'crypto':
      return cryptoNews;
    case 'science':
      return scienceNews;
    case 'india':
      return countryNews;
    case 'general':
      return worldNews;
    default:
      break;
  }
};

router.get('/:type', async (req, res, next) => {
  try {
    const { type } = req.params;
    const data = await fetchUrl(newsType(type), headers);
    const cleanedData = [];

    Object.values(data.articles).forEach((item) => {
      cleanedData.push({
        name: item.source.name,
        title: item.title,
        url: item.url,
        urlToImage: item.urlToImage,
        publishedAt: item.publishedAt,
      });
    });

    res.json(cleanedData);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
