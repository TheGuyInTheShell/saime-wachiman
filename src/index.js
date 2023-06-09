import express from "express";
import bodyParser from "body-parser";
import router from "./routes/routes";
import { Server as socketServer } from "socket.io";
import http from "http";
import Routine from "./utils/routine";
import { port } from "./env"


const app = express();
const server = http.createServer(app);
const io = new socketServer(server);
const routine = new Routine(io);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", express.static(`${__dirname}/public`));

app.use("/app", router);

io.on("connection", (socket) => {
	socket.emit("sv:currentstatus", { status: routine.previusStatus });
});

server.listen(port, () => {
	console.log(`La aplicación está escuchando sobre ${port}`);
});
