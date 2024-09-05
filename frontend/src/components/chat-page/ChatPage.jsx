import React from "react";

import ChannelList from "../channel-list/ChannelList";
import Chat from "../chat/Chat";

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const ChatPage = (props) => {
	return (
		<Container>
			<Row>
				<Col md={2}>
					<ChannelList />
				</Col>
				<Col>
					<Chat />
				</Col>
			</Row>
		</Container>
	);
};

export default ChatPage;