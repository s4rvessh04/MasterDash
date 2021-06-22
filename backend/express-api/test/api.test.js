const request = require("supertest");
const assert = require("assert");

const app = require("../src/app");

describe("GET /api/v1", () => {
	it("responds with a json message", (done) => {
		request(app)
			.get("/api/v1")
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(
				200,
				{
					message: "API - 👋🌎🌍🌏",
				},
				done
			);
	});
});

describe("GET /api/v1/emojis", () => {
	it("responds with a json message", (done) => {
		request(app)
			.get("/api/v1/emojis")
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(200, ["😀", "😳", "🙄"], done);
	});
});

describe("GET /api/v1/weather", () => {
	it("responds with a json message", (done) => {
		request(app)
			.get("/api/v1/weather")
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(200)
			.then((res) => {
				assert.strictEqual(typeof res.body, "object");
				done();
			})
			.catch((err) => {
				console.log(err);
			});
	});
});

describe("POST /api/v1/weather", () => {
	it("responds status code", (done) => {
		request(app)
			.post("/api/v1/weather")
			.send({ value: "foo" })
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(202, done);
	});
});

describe("GET /api/v1/github", () => {
	it("responds with a not found message", (done) => {
		request(app)
			.get("/api/v1/github")
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(404, done);
	});
});

describe("GET /api/v1/github/repohouse", () => {
	it("responds with an array of objects", (done) => {
		request(app)
			.get("/api/v1/github/repohouse")
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(200)
			.then((res) => {
				assert.strictEqual(typeof res.body, "object");
				done();
			})
			.catch((err) => {
				console.log(err);
			});
	});
});

describe("GET /api/v1/github/user", () => {
	it("responds with a json message", (done) => {
		request(app)
			.get("/api/v1/github/user")
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(200)
			.then((res) => {
				assert.strictEqual(typeof res.body, "object");
				done();
			})
			.catch((err) => {
				console.log(err);
			});
	});
});

describe("GET /api/v1/covid", () => {
	it("responds with a json message", (done) => {
		request(app)
			.get("/api/v1/covid")
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(200)
			.then((res) => {
				assert.strictEqual(typeof res.body, "object");
				done();
			})
			.catch((err) => {
				console.log(err);
			});
	});
});

describe("POST /api/v1/covid", () => {
	it("responds with a not found message", (done) => {
		request(app)
			.post("/api/v1/covid")
			.send({ state: "foo", city: "bar" })
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(404, done);
	});
});
