import React from 'react';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Chat from '../../components/chat/chat';
import ChannelList from '../../components/channel-list/channelList';

const ChatPage = () => (
  <Container className="h-100 shadow rounded overflow-hidden my-4">
    <Row className="h-100">
      <Col md={2} className="px-0">
        <ChannelList />
      </Col>
      <Col className="p-0 h-100">
        <Chat />
      </Col>
    </Row>
  </Container>
);

export default ChatPage;
