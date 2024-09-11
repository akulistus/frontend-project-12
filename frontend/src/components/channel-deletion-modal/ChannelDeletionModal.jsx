import React from "react";

import { useRemoveChannelMutation } from "../../services/api";

import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";

const ChannelDeletionModal = (props) => {
  const { show, setShow, selectedChannel } = props;
  const [removeChannel] = useRemoveChannelMutation();

  const handleClose = () => setShow(false);
  const handleDelete = () => {
    removeChannel(selectedChannel.id);
    setShow(false);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Отменить
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChannelDeletionModal;