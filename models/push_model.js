import mongoose from "../util/mongoose.js";
const Schema = mongoose.Schema;

var pushSchema = new Schema({
	user: String,
	endpoint: String,
	keys: {
		p256dh: String,
		auth: String,
	},
});

export const Push = mongoose.model("Push", pushSchema);