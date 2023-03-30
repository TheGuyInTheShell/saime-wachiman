import firedb from "./firebase";

const deleteVapid = async (id) => {
	await firedb.collection("vapids").doc(id).delete();
};
export default deleteVapid;
