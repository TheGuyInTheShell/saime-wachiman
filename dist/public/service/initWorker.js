const url = window.location.href;
let workerSrc = "/Saime-isActive-app/sw.js";
let worker;

window.addEventListener("load", () => {
	if (navigator.serviceWorker) {
		if (url.includes("localhost")) {
			workerSrc = "/sw.js";
		}
		navigator.serviceWorker.register(workerSrc).then((reg) => {
			worker = reg;
			worker.pushManager
				.getSubscription()
				.then((sub) => {
					if (sub) {
						btnSub.classList.add('d-none')
						btnUnsub.classList.remove('d-none')
					} else {
							btnUnsub.classList.add('d-none')
							btnSub.classList.remove('d-none')
					}
				})
				.catch(console.log);
		});
	}
});
