import webPush from "web-push";
import deleteVapid from "./delete";
import firedb from "./firebase";
import { publicKey, privateKey } from "../utils/vapid.json";

webPush.setVapidDetails(
	"mailto:elieserdavidalvarezaldama@gmail.com",
	publicKey,
	privateKey,
);

let lastNotiTime = 0;

export const pushNotification = async () => {
	const nowNotiTime = new Date().getHours();
	if (nowNotiTime - lastNotiTime >= 1) {
		const queryS = await firedb.collection("vapids").get();
		const vapids = queryS.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
		if (vapids.length) {
			vapids.forEach(({ vapid, id }, i) => {
				webPush
					.sendNotification(
						vapid,
						JSON.stringify({
							title: "SAIME-WACHIMAN:",
							content: "la pagina de registro esta en linea, aprovecha!",
						}),
					)
					.then(()=> {})
					.catch(() => deleteVapid(id));
			});
		}
		lastNotiTime = nowNotiTime;
	}
};
