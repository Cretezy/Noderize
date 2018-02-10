import React from "react";


// Render a icon with the color of the user
export function UserIcon({ user }) {
	const style = {
		display: "inline-block",
		borderRadius: "50%",
		width: "10px",
		height: "10px",
		backgroundColor: user.split(" ")[0]
	};

	return (
		<span style={style} />
	);
}