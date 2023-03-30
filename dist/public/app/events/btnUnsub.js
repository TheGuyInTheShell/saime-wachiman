import { downSub } from "../utils/subs.js";
import hiddenBtn from "../utils/hiddenBtn.js";

const eventUnsub = (domBtnSub, domBtnUnsub) => {
	domBtnUnsub.addEventListener("click", () => {
		downSub();
		hiddenBtn(domBtnSub, domBtnUnsub);
	});
};
export default eventUnsub;
