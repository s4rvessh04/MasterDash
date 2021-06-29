const express = require('express');

const database = require('./database');

const router = express.Router();
const { mongoose, Schema, fetchUrl } = database;

const config = {
  token: process.env.TOKEN,
  username: process.env.USRNAME,
};

const headers = {
  Authorization: `Bearer ${config.token}`,
  'Content-Type': 'application/json',
};

const userApiLink = `https://api.github.com/users/${config.username}`;
const repoApiLink = `https://api.github.com/users/${config.username}/repos`;
const contributorsLink = (repoName) =>
  `https://api.github.com/repos/${config.username}/${repoName}/contributors`;

// Schemas
const Repository = new Schema({
  name: {
    type: String,
    required: true,
  },
  html_url: {
    type: String,
    required: true,
  },
  clone_url: {
    type: String,
    required: true,
  },
  stargazers_count: {
    type: Number,
    required: true,
  },
  forks_count: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  created_at: {
    type: String,
    required: true,
  },
  updated_at: {
    type: String,
    required: true,
  },
  pushed_at: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  private: {
    type: Boolean,
    required: true,
  },
  language: {
    type: String,
    default: null,
    required: false,
  },
  contributors: {
    type: Array,
    default: null,
    required: false,
  },
});

const User = new Schema({
  name: {
    type: String,
    required: true,
  },
  html_url: {
    type: String,
    required: true,
  },
  avatar_url: {
    type: String,
    required: true,
  },
  followers: {
    type: Number,
    required: true,
  },
  following: {
    type: Number,
    required: true,
  },
  public_repos: {
    type: Number,
    required: true,
  },
  owned_private_repos: {
    type: Number,
    required: true,
  },
  total_private_repos: {
    type: Number,
    required: true,
  },
  private_gists: {
    type: Number,
    required: true,
  },
  public_gists: {
    type: Number,
    required: true,
  },
});

// Models
const RepositoryData = mongoose.model('GithubData', Repository, 'GithubData');
const UserData = mongoose.model('GithubUser', User, 'GithubUser');

// Routes
router.get('/repohouse', async (req, res) => {
  try {
    const items = await RepositoryData.find();
    res.json(items);
  } catch (error) {
    res.status(404).json(error.message);
  }
});

router.get('/repohouse/:name', async (req, res, next) => {
  try {
    const { name } = req.params;
    const items = await RepositoryData.findOne({ name: name }).exec();
    if (!items) return next();
    return res.json(items);
  } catch (error) {
    return next(error);
  }
});

router.get('/user', async (req, res) => {
  try {
    const items = await UserData.findOne();
    res.json(items);
  } catch (error) {
    res.status(404).json(error.message);
  }
});

router.post('/user', async (req, res, next) => {
  try {
    const data = await fetchUrl(userApiLink, headers);
    const fields = Object.keys(UserData.schema.paths);
    const cleanedData = new Map();

    Object.keys(data).map((key) => {
      if (fields.includes(key)) {
        cleanedData[key] = data[key];
      }
    });

    const item = new UserData(cleanedData);
    item.save();
    return res.json(item);
  } catch (error) {
    return next(error);
  }
});

router.post('/repohouse', async (req, res, next) => {
  try {
    const data = await fetchUrl(repoApiLink, headers);
    const fields = Object.keys(RepositoryData.schema.paths);

    Object.values(data).forEach(async (item) => {
      const contributors = await fetchUrl(contributorsLink(item.name));
      let cleanedData = {
        contributors: contributors,
      };
      Object.keys(item).map((key) => {
        if (fields.includes(key)) {
          cleanedData[key] = item[key];
        }
      });
      const repository = new RepositoryData(cleanedData);
      repository.save();
      cleanedData = {};
    });

    return res.json({ message: 'Added Data successfully @github/repohouse' });
  } catch (error) {
    return next(error);
  }
});
module.exports = router;
