import React from "react";

import ChannelList from "../../components/channel-list/ChannelList";
import Chat from "../../components/chat/Chat";

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const ChatPage = (props) => {
	return (
		<Container className="h-100 shadow rounded overflow-hidden my-4">
			<Row className="h-100">
				<Col md={2} className="px-0">
					<ChannelList />
				</Col>
				<Col className="px-0">
					<Chat />
				</Col>
			</Row>
		</Container>
	);
};

export default ChatPage;