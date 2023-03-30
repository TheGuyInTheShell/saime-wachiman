import { pushNotification } from "../service/push";
import axios from "axios";

export default class Routine {
	constructor(io) {
		this.io = io;
		this.previusStatus = "offline";
		setInterval(this.#rutine.bind(this), 12000);
	}
	async #rutine() {
		try {
			const fetchSaime = await axios.get("https://siic.saime.gob.ve");
			if (fetchSaime.status === 200) {
				this.#changeStatus({
					status: "online",
				});
				pushNotification();
			} else {
				this.#changeStatus({
					status: "offline",
				});
			}
			console.log("saime status: ", fetchSaime.status);
		} catch (error) {
			console.log("saime me ha pillado");
		}
	}
	#changeStatus(statusCheck) {
		this.previusStatus !== statusCheck.status &&
			this.io.emit("sv:changestatus", statusCheck);
		this.previusStatus = statusCheck.status;
	}
}
