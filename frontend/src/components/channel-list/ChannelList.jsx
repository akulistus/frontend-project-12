import React, { useState, useEffect } from "react";

import { setSelected, setDefault } from "../../slices/channelSlice";
import { useGetChannelsQuery } from "../../services/api";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import ChannelCreationModal from '../channel-creation-modal/ChannelCreationModal';
import ChannelDeletionModal from '../channel-deletion-modal/ChannelDeletionModal';
import ChannelEditModal from '../channel-edit-modal/ChannelEditModal';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import SplitButton  from 'react-bootstrap/SplitButton';

const ChannelList = (props) => {
  const [editedChannel, setEditedChannel] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  
  const selectedChannel = useSelector((state) => state.channels.selected);
  const { t } = useTranslation();
  const { data, isLoading } = useGetChannelsQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDefault());
  }, []);

  const handleClick = (index) => {
    const selected = data[index];
    dispatch(setSelected(selected));
  };

  const handleDelete = (index) => {
    setShowDeleteModal(true);
    setEditedChannel(data[index]);
  };

  const handelRename = (index) => {
    setShowEditModal(true);
    setEditedChannel(data[index]);
  };

  const renderNavItems = (data) => 
    data.map((channel, index) => {
      const variant = channel.id === selectedChannel.id ? 'secondary': '';
      if (channel.removable) {
        return (
          <Nav.Item action as='li'>
            <SplitButton
              key={channel.name}
              title={channel.name}
              variant={variant}
              onClick={() => handleClick(index)}
            >
              <Dropdown.Item onClick={() => handleDelete(index)}>Удалить</Dropdown.Item>
              <Dropdown.Item onClick={() => handelRename(index)}>Переименовать</Dropdown.Item>
            </SplitButton>
          </Nav.Item>
        );
      }
      return (
        <Nav.Item action as='li'>
          <Button variant={variant} onClick={() => handleClick(index)}>{`# ${channel.name}`}</Button>
        </Nav.Item>
      );
    });

  if (isLoading) return null;

	return (
		<div className="d-flex flex-column bg-dark-subtle border-end h-100">
			<Container className="d-flex justify-content-between p-4 mt-1 mb-2 pe-2">
				<b>{t('chat.channels')}</b>
				<Button onClick={() => setShowCreateModal(true)}>add</Button>
			</Container>
			<Container className="h-100">
        <Nav as='ul' variant="pills" className="flex-column">
          {renderNavItems(data)}
        </Nav>
			</Container>
      {showCreateModal && <ChannelCreationModal show={showCreateModal} setShow={setShowCreateModal} />}
      {showDeleteModal && <ChannelDeletionModal show={showDeleteModal} setShow={setShowDeleteModal} selectedChannel={editedChannel} />}
      {showEditModal && <ChannelEditModal show={showEditModal} setShow={setShowEditModal} selectedChannel={editedChannel} />}
		</div>
	);
};

export default ChannelList;