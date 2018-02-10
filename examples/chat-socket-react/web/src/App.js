import React, { Component } from "react";
import socketio from "socket.io-client";
import "./App.css";
import { UsersList } from "./UsersList";
import { MessagesList } from "./MessagesList";
import { MessageBox } from "./MessageBox";
import { UserIcon } from "./UserIcon";

class App extends Component {
	initialState = {
		name: null,
		users: [],
		messages: []
	};

	state = this.initialState;

	messagesList;

	componentDidMount() {
		// Setup socket
		this.socket = socketio();

		this.socket.on("disconnect", () => {
			// Reset state
			this.setState(this.initialState);
		});

		// Recieve name from server
		this.socket.on("setName", name => {
			this.setState({ name });
		});

		// Update local user list when other users join/leave
		this.socket.on("updateUserList", users => {
			this.setState({ users });
		});

		// Receive a message
		this.socket.on("message", message => {
			this.setState(
				state => ({ messages: [...state.messages, message] }),
				() => {
					// Scroll to bottom of messages list after rerender
					const { list } = this.messagesList;
					list.scrollTop = list.scrollHeight;
				}
			);
		});
	}

	sendMessage = message => {
		this.socket.emit("message", message);
	};

	render() {
		if (this.state.name) {
			return (
				<div id="app">
					<p>
						Connected! You are: <UserIcon user={this.state.name} />{" "}
						{this.state.name}
					</p>
					<div id="grid">
						<div id="sidebar">
							<UsersList users={this.state.users} />
						</div>
						<div id="content">
							<MessagesList
								messages={this.state.messages}
								ref={ref => (this.messagesList = ref)}
							/>
							<MessageBox onSend={this.sendMessage} />
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div id="app">
					<p>Connecting...</p>
				</div>
			);
		}
	}
}

export default App;
