import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Chat from '../../components/chat/chat';
import ChannelList from '../../components/channel-list/channelList';

import api from '../../services/api';
import socket from '../../sockets';
import { setDefault } from '../../slices/channelSlice';

const ChatPage = () => {
  const { updateQueryData } = api.util;
  const dispatch = useDispatch();

  useEffect(() => {
    const handleNewMessage = (event) => {
      dispatch(updateQueryData('getMessages', undefined, (draft) => {
        draft.push(event);
      }));
    };

    const handleRemoveChannel = (event) => {
      dispatch(updateQueryData('getMessages', undefined, (draft) => draft.filter((message) => message.channelId !== event.id)));
      dispatch(updateQueryData('getChannels', undefined, (draft) => draft.filter((channel) => channel.id !== event.id)));
      dispatch(setDefault());
    };

    const handleNewChannel = (event) => {
      dispatch(updateQueryData('getChannels', undefined, (draft) => [...draft, event]));
    };

    const handleRanameChannel = (event) => {
      dispatch(updateQueryData('getChannels', undefined, (draft) => draft.map((channel) => (channel.id === event.id ? event : channel))));
    };

    socket.on('newMessage', handleNewMessage);
    socket.on('newChannel', handleNewChannel);
    socket.on('removeChannel', handleRemoveChannel);
    socket.on('renameChannel', handleRanameChannel);

    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('newChannel', handleNewChannel);
      socket.off('removeChannel', handleRemoveChannel);
      socket.off('renameChannel', handleRanameChannel);
    };
  }, [updateQueryData, dispatch]);

  return (
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
};

export default ChatPage;
