import { getPublickey } from "../utils/subs.js";
import hiddenBtn from "../utils/hiddenBtn.js";

const eventSub = (domBtnSub, domBtnUnsub)=> {
    domBtnSub.addEventListener("click", () => {
        if (!worker) return alert('algo salio mal!:(');
        getPublickey().then((key) => {
          worker.pushManager
            .subscribe({
              userVisibleOnly: true,
              applicationServerKey: key,
            })
            .then((res) => res.toJSON())
            .then((sub) => {
              fetch("app/subscribe", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(sub),
              })
                .then(()=> hiddenBtn(domBtnSub, domBtnUnsub))
                .catch(console.log);
            });
        });
      });
}
export default eventSub

