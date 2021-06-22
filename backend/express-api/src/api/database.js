const mongoose = require("mongoose");
const axios = require("axios").default;

const db = mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const { Schema } = mongoose;

const fetchUrl = async (url, config = null) => {
	try {
		const { data } = await axios({
			method: "get",
			url: url,
			headers: {
				Authorization: config ? `Bearer ${config.token}` : "",
				"Content-Type": "application/json",
			},
		});
		return data;
	} catch (error) {
		return error;
	}
};

module.exports = {
	db,
	mongoose,
	Schema,
	fetchUrl,
};
