import React, { useState } from "react";

import { setSelected } from "../../slices/channelSlice";
import { useGetChannelsQuery } from "../../services/api";
import { useDispatch } from "react-redux";

import ChannelCreationModal from "../channel-creation-modal/ChannelCreationModal";
import ChannelDeletionModal from "../channel-deletion-modal/ChannelDeletionModal";
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

const renderNavItems = (data) => 
  data.map((channel) => {
    if (channel.removable) {
      return (
        <NavDropdown as='li' title={`# ${channel.name}`}>
          <NavDropdown.Item eventKey={`${channel.id}/delete`}>Удалить</NavDropdown.Item>
          <NavDropdown.Item eventKey={`${channel.id}/rename`}>Переименовать</NavDropdown.Item>
        </NavDropdown>
      );
    }

    return (
      <Nav.Item action as='li'>
        <Nav.Link eventKey={channel.id}>{`# ${channel.name}`}</Nav.Link>
      </Nav.Item>
    )
  })

const ChannelList = (props) => {
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { data, error, isLoading } = useGetChannelsQuery();
  const dispath = useDispatch();

  const handleSelect = (eventKey) => {
    const parsedEvent = eventKey.split('/');
    if (parsedEvent.length > 1) {
      switch (parsedEvent.at(-1)) {
        case 'delete': 
          setShowDeleteModal(true);
          setSelectedChannel(parsedEvent[0]);
          break;
        case 'rename':
          break;
      }
    }
    const selected = data.find((channel) => channel.id === eventKey);
    dispath(setSelected(selected));
  };

  if (isLoading) return null;

	return (
		<div className="d-flex flex-column bg-dark-subtle border-end h-100">
			<Container className="d-flex justify-content-between p-4 mt-1 mb-2 pe-2">
				<b>Каналы</b>
				<Button onClick={() => setShowCreateModal(true)}>add</Button>
			</Container>
			<Container className="h-100">
        <Nav as='ul' variant="pills" className="flex-column" defaultActiveKey='general' onSelect={handleSelect}>
          {renderNavItems(data)}
        </Nav>
			</Container>
      <ChannelCreationModal show={showCreateModal} setShow={setShowCreateModal} />
      <ChannelDeletionModal show={showDeleteModal} setShow={setShowDeleteModal} channelId={selectedChannel}/>
		</div>
	);
};

export default ChannelList;