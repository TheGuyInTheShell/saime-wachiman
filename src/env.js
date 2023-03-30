import { config } from "dotenv";

export default (envs = {
	firebaseKey: process.env.FBKEY || "example-key",
	appId: process.env.APPID || "example-id",
});
