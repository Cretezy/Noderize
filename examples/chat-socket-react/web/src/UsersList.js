import React from "react";
import { List } from "./List";

export class UsersList extends React.PureComponent {
	render() {
		return (
			<div>
				<p>Connected users:</p>
				<List
					itemKeys="user"
					items={this.props.users.map(user => ({user, item:user, key: user}))}
				/>
			</div>
		)
	}
}