import { Server } from "http";
import socketio from "socket.io";
import uuid from "uuid";
import { generateName } from "./name";

const port = parseInt(process.env.PORT) || 3001;
const http = Server();
const io = socketio(http);

const users = [];

io.on("connection", socket => {
	// Get unique name
	let name;
	do {
		name = generateName();
	} while (users.includes(name));

	console.log(`${name} joined!`);

	// Send name to user
	socket.emit("setName", name);

	// Add user to user list
	users.push(name);
	// Update clients
	updateUserList();
	sendMessage({
		type: "join",
		user: name
	});

	socket.on("disconnect", () => {
		console.log(`${name} left!`);
		// Remove user from user list
		users.splice(users.indexOf(name), 1);

		// Update clients
		updateUserList();
		sendMessage({
			type: "leave",
			user: name
		});
	});

	socket.on("message", text => {
		// Send message to all users
		sendMessage({
			type: "message",
			user: name,
			data: { text }
		});
	});
});

function updateUserList() {
	// Update all user's local users list
	io.emit("updateUserList", users);
}

function sendMessage(message) {
	// Send message to all users (add unique id)
	io.emit("message", {
		...message,
		id: uuid()
	});
}

http.listen(port, function() {
	console.log(`Listening on :${port}`);
});
