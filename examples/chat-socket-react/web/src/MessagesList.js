import React from "react";
import { List } from "./List";

export class MessagesList extends React.PureComponent {
	list;

	render() {
		return (
			<div>
				<p>Messages:</p>
				<div id="messages" ref={ref => (this.list = ref)}>
					<List
						itemKeys="message"
						items={this.props.messages.map(({ type, id, user, data }) => {
							let message;
							switch (type) {
								case "join":
								case "leave":
									message = `${user} ${type === "join" ? "joined" : "left"}!`;
									break;
								case "message":
									const { text } = data;
									message = `${user}: ${text}`;
									break;
							}
							return { key: id, user, item: message };
						})}
					/>
				</div>
			</div>
		);
	}
}
