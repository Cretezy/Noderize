import React from "react";
import { UserIcon } from "./UserIcon";

// List with user icons
export function List({ itemKeys, items }) {
	return (
		<div style={{lineHeight: "1.5em" }}>
			{items.map(({ user, item, key }) =>
				<div key={`${itemKeys}-${key}`}>
					<UserIcon user={user} /> {item}
				</div>
			)}
		</div>
	)
}
