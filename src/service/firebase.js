import { config } from "dotenv";
config();
import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

initializeApp({
	credential: applicationDefault(),
});

const firedb = getFirestore();

export default firedb;
