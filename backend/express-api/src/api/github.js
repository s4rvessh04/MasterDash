const express = require("express");

const database = require("./database");

const router = express.Router();
const { mongoose, Schema } = database;

const githubToken = process.env.TOKEN;

// Schemas
const Repository = new Schema({
	name: {
		type: String,
		required: true,
	},
	url: {
		type: String,
		required: true,
	},
	clone_url: {
		type: String,
		required: true,
	},
	stars: {
		type: Number,
		required: true,
	},
	forks: {
		type: Number,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	created: {
		type: String,
		required: true,
	},
	updated: {
		type: String,
		required: true,
	},
	pushed: {
		type: String,
		required: true,
	},
	repo_size: {
		type: Number,
		required: true,
	},
	status: {
		type: Boolean,
		required: true,
	},
	language: {
		type: String,
		default: null,
		required: true,
	},
	user_link: {
		type: String,
		required: true,
	},
	avatar_url: {
		type: String,
		required: true,
	},
	contributors: {
		type: Map,
		default: null,
		required: true,
	},
});

const User = new Schema({
	name: {
		type: String,
		required: true,
	},
	link: {
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
	total_repos: {
		type: Number,
		required: true,
	},
	total_gists: {
		type: Number,
		required: true,
	},
	total_stars: {
		type: Number,
		required: true,
	},
	total_forks: {
		type: Number,
		required: true,
	},
});

// Models
const RepositoryData = mongoose.model("GithubData", Repository, "GithubData");
const UserData = mongoose.model("GithubUser", User, "GithubUser");

// Routes
router.get("/repohouse", async (req, res) => {
	try {
		const items = await RepositoryData.find();
		res.json(items);
	} catch (error) {
		res.status(404).json(error.message);
	}
});

router.get("/repohouse/:name", async (req, res, next) => {
	try {
		const { name } = req.params;
		const items = await RepositoryData.findOne({ name });
		if (!items) return next();
		return res.json(items);
	} catch (error) {
		return next(error);
	}
});

router.get("/user", async (req, res) => {
	try {
		const items = await UserData.findOne();
		res.json(items);
	} catch (error) {
		res.status(404).json(error.message);
	}
});

//ADD A POST METHOD

module.exports = router;
