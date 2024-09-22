import React from 'react';

import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useRemoveChannelMutation } from '../../services/channelApi';

const ChannelDeletionModal = (props) => {
  const { t } = useTranslation();
  const { show, setShow, selectedChannel } = props;
  const [removeChannel, { isLoading }] = useRemoveChannelMutation();

  const handleClose = () => setShow(false);
  const handleDelete = () => {
    removeChannel(selectedChannel.id)
      .then((response) => {
        if (!response.error) {
          toast.success(t('notifications.channelSuccessfullyDeleted'));
        } else {
          toast.error(t('notifications.connectionError'));
        }
      });
    handleClose();
  };

  return (
    <Modal centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.deleteChannelModal.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {t('modals.deleteChannelModal.body')}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t('buttons.cancel')}
        </Button>
        <Button disabled={isLoading} variant="danger" onClick={handleDelete}>
          {t('buttons.delete')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChannelDeletionModal;
