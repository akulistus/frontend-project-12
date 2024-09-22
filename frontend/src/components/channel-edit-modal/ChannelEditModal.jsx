import React, { useEffect, useRef } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { closeModal } from '../../slices/modalSlice';
import { useGetChannelsQuery, useEditChannelMutation } from '../../services/channelApi';

const ChannelEditModal = () => {
  const dispatch = useDispatch();
  const selectedChannel = useSelector((state) => state.modals.selectedChannel);
  const { t } = useTranslation();
  const { data } = useGetChannelsQuery();
  const [editChannel, { isLoading }] = useEditChannelMutation();

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.select();
    }
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, t('forms.editChannelForm.errors.channelnameLengthLimit'))
      .max(20, t('forms.editChannelForm.errors.channelnameLengthLimit'))
      .notOneOf(data.map((channel) => channel.name), t('forms.editChannelForm.errors.mustBeUnique'))
      .required(t('forms.editChannelForm.errors.requiredFiled')),
  });

  const handleClose = () => dispatch(closeModal());
  const handleKeyDown = (event, handleSubmit) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Formik
      initialValues={{ name: selectedChannel.name }}
      onSubmit={async (values) => {
        const newChannel = {
          id: selectedChannel.id,
          body: values,
        };
        editChannel(newChannel)
          .then((response) => {
            if (!response.error) {
              toast.success(t('notifications.channelSuccessfullyRenamed'));
            } else {
              toast.error(t('notifications.connectionError'));
            }
          });
        handleClose();
      }}
      validationSchema={validationSchema}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({
        handleSubmit, handleChange, values, errors,
      }) => (
        <Modal centered show onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{t('modals.editChannelModal.title')}</Modal.Title>
          </Modal.Header>
          <Form noValidate onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group>
                <Form.Label
                  className="visually-hidden"
                  htmlFor="name"
                >
                  {t('forms.editChannelForm.labels.channelName')}
                </Form.Label>
                <Form.Control
                  type="text"
                  id="name"
                  ref={inputRef}
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                  onKeyDown={(e) => handleKeyDown(e, handleSubmit)}
                />
                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                {t('buttons.cancel')}
              </Button>
              <Button disabled={isLoading} variant="primary" type="submit">
                {t('buttons.send')}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      )}
    </Formik>
  );
};

export default ChannelEditModal;
