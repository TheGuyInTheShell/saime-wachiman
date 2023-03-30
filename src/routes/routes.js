import { Router } from "express";
import { publicKey } from "../utils/vapid.json";
import urlsafe64 from "urlsafe-base64";
import firedb from "../service/firebase";

const router = Router();

router.post("/subscribe", (req, res) => {
	const sub = req.body;
	firedb.collection("vapids").add({
		vapid: sub,
	});
	res.json("subscribed");
});

router.get("/key", (req, res) => {
	const codecKey = urlsafe64.decode(publicKey);
	res.send(codecKey);
});

export default router;
