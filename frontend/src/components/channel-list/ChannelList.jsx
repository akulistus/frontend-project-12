import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { useTranslation } from 'react-i18next';

import { PlusSquare } from 'react-bootstrap-icons';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useGetChannelsQuery } from '../../services/channelApi';
import { setSelected } from '../../slices/channelSlice';
import { setModal } from '../../slices/modalSlice';
import ChannelCreationModal from '../channel-creation-modal/ChannelCreationModal';
import ChannelDeletionModal from '../channel-deletion-modal/ChannelDeletionModal';
import ChannelEditModal from '../channel-edit-modal/ChannelEditModal';

const modalTypes = {
  CREATE: 'create',
  DELETE: 'delete',
  EDIT: 'edit',
};

const modals = {
  [modalTypes.CREATE]: ChannelCreationModal,
  [modalTypes.DELETE]: ChannelDeletionModal,
  [modalTypes.EDIT]: ChannelEditModal,
};

const ChannelList = () => {
  const selectedChannel = useSelector((state) => state.channels.selected);
  const modal = useSelector((state) => state.modals.modal);
  const { t } = useTranslation();
  const { data, isLoading } = useGetChannelsQuery();
  const dispatch = useDispatch();

  const handleClick = (index) => {
    const selected = data[index];
    dispatch(setSelected(selected));
  };

  const handleCreate = () => {
    dispatch(setModal({ modal: modalTypes.CREATE }));
  };

  const handleDelete = (index) => {
    dispatch(setModal({ modal: modalTypes.DELETE, selectedChannel: data[index] }));
  };

  const handelRename = (index) => {
    dispatch(setModal({ modal: modalTypes.EDIT, selectedChannel: data[index] }));
  };

  const renderModal = () => {
    if (!modal) return null;

    const Component = modals[modal];
    return <Component />;
  };

  if (isLoading) return null;

  const renderNavItems = (channels) => channels.map((channel, index) => {
    const variant = channel.id === selectedChannel.id ? 'secondary' : '';
    if (channel.removable) {
      return (
        <Nav.Item key={channel.id} className="w-100" action as="li">
          <Dropdown className="d-flex" as={ButtonGroup}>
            <Button
              className="w-100 rounded-0 text-start text-truncate"
              key={channel.name}
              variant={variant}
              onClick={() => handleClick(index)}
            >
              {`# ${channel.name}`}
            </Button>
            <Dropdown.Toggle split variant={variant} id="dropdown-split-basic">
              <span className="visually-hidden">{t('chat.labels.channelControl')}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleDelete(index)}>{t('buttons.delete')}</Dropdown.Item>
              <Dropdown.Item onClick={() => handelRename(index)}>{t('buttons.rename')}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav.Item>
      );
    }
    return (
      <Nav.Item key={channel.id} className="w-100" action as="li">
        <Button className="w-100 rounded-0 text-start" variant={variant} onClick={() => handleClick(index)}>{`# ${channel.name}`}</Button>
      </Nav.Item>
    );
  });

  if (isLoading) return null;

  return (
    <div className="d-flex flex-column bg-dark-subtle border-end h-100">
      <Container className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('chat.channels')}</b>
        <Button className="p-0 btn-group-vertical text-primary" variant="" onClick={handleCreate}>
          <PlusSquare />
          <span className="visually-hidden">+</span>
        </Button>
      </Container>
      <Container className="h-100">
        <Nav as="ul" variant="pills" className="flex-column">
          {renderNavItems(data)}
        </Nav>
      </Container>
      {renderModal()}
    </div>
  );
};

export default ChannelList;
