import { config } from "dotenv";
config();

export default (env = {
	...process.env.VAPID_KEYS,
});
