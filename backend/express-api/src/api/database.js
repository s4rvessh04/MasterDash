const mongoose = require("mongoose");
const axios = require("axios").default;

mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}).then(connected =>{
    console.log("DB Connected.");
}).catch(error =>{
    console.log(error);
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
	mongoose,
	Schema,
	fetchUrl,
};
