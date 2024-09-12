import React from "react";

import { useTranslation } from "react-i18next";
import { useRemoveChannelMutation } from "../../services/api";

import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";

const ChannelDeletionModal = (props) => {
  const { t } = useTranslation();
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
        <Modal.Title>{t('modals.deleteChannelModal.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {t('modals.deleteChannelModal.body')}
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          {t('buttons.cancel')}
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          {t('buttons.delete')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChannelDeletionModal;