import React, { useState, useEffect } from 'react';

import { setSelected, setDefault } from '../../slices/channelSlice';
import { useGetChannelsQuery } from '../../services/api';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { PlusSquare } from 'react-bootstrap-icons';
import ChannelCreationModal from '../channel-creation-modal/ChannelCreationModal';
import ChannelDeletionModal from '../channel-deletion-modal/ChannelDeletionModal';
import ChannelEditModal from '../channel-edit-modal/ChannelEditModal';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

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
          <Nav.Item className='w-100' action as='li'>
            <Dropdown className='d-flex' as={ButtonGroup}>
              <Button
                className='w-100 rounded-0 text-start text-truncate'
                key={channel.name}
                variant={variant}
                onClick={() => handleClick(index)}
              >
                {`# ${channel.name}`}
              </Button>
              <Dropdown.Toggle split variant={variant} id='dropdown-split-basic'/>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleDelete(index)}>{t('buttons.delete')}</Dropdown.Item>
                <Dropdown.Item onClick={() => handelRename(index)}>{t('buttons.rename')}</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav.Item>
        );
      }
      return (
        <Nav.Item className='w-100' action as='li'>
          <Button className='w-100 rounded-0 text-start' variant={variant} onClick={() => handleClick(index)}>{`# ${channel.name}`}</Button>
        </Nav.Item>
      );
    });

  if (isLoading) return null;

	return (
		<div className='d-flex flex-column bg-dark-subtle border-end h-100'>
			<Container className='d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4'>
				<b>{t('chat.channels')}</b>
				<Button className='p-0 btn-group-vertical text-primary' variant='' onClick={() => setShowCreateModal(true)}>
          <PlusSquare />
          <span className='visually-hidden'>+</span>
        </Button>
			</Container>
			<Container className='h-100'>
        <Nav as='ul' variant='pills' className='flex-column'>
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