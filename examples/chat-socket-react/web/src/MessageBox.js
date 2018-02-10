import React from "react";

export class MessageBox extends React.PureComponent {
	state = {
		text: ""
	};

	onSubmit = event => {
		event.preventDefault();

		const { text } = this.state;
		// Don't send empty message
		if (text) {
			// Send
			this.props.onSend(text);
			// Reset
			this.setState({ text: "" })
		}
	};

	onTextChange = event => {
		this.setState({ text: event.target.value });
	};

	render() {
		return (
			<div id="message-box">
				<form onSubmit={this.onSubmit}>
					<input value={this.state.text} onChange={this.onTextChange} />
					<button type="submit">Send</button>
				</form>
			</div>
		)
	}
}