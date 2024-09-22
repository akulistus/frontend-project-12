import React from 'react';

import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { closeModal } from '../../slices/modalSlice';
import { useRemoveChannelMutation } from '../../services/channelApi';

const ChannelDeletionModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectedChannel = useSelector((state) => state.modals.selectedChannel);
  const [removeChannel, { isLoading }] = useRemoveChannelMutation();

  const handleClose = () => dispatch(closeModal());
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
    <Modal centered show onHide={handleClose}>
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
