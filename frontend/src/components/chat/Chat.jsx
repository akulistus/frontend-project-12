import React from "react";

import { useGetMessagesQuery } from "../../services/messageApi";

const Chat = (props) => {
	const { data, isLoading } = useGetMessagesQuery();

	if (isLoading) return null;

	return (
		<div className="flex-column">
			{data.map((message) => (
				<div className="text-break md-2">
					<b>{message.username}</b> {message.body}
				</div>
			))}
		</div>
	);
};

export default Chat;