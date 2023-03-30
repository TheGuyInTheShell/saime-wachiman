import { config } from "dotenv";
config()

const envs = {
		port: process.env.PORT || 3030
	}

export default envs 
