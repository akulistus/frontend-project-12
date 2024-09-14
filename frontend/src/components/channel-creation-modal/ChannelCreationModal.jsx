import React from 'react';
import filter from 'leo-profanity';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { setSelected } from '../../slices/channelSlice';
import { useGetChannelsQuery, useAddChannelMutation } from '../../services/api';

const ChannelCreationModal = (props) => {
  const { t } = useTranslation();
  const { data } = useGetChannelsQuery();
  const [addChannel, { isLoading }] = useAddChannelMutation();
  const { show, setShow } = props;

  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, t('forms.createChannelForm.errors.channelnameLengthLimit'))
      .max(20, t('forms.createChannelForm.errors.channelnameLengthLimit'))
      .notOneOf(data.map((channel) => channel.name), t('forms.createChannelForm.errors.mustBeUnique'))
      .required(t('forms.createChannelForm.errors.requiredFiled')),
  });

  const handleClose = () => setShow(false);
  const handleKeyDown = (event, handleSubmit) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Formik
      initialValues={{ name: '' }}
      onSubmit={async (values) => {
        addChannel({ name: filter.clean(values.name) })
          .then((response) => {
            if (!response.error) {
              dispatch(setSelected(response.data));
              toast.success(t('notifications.channelSuccessfullyCreated'));
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
        <Modal centered show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{t('modals.createChannelModal.title')}</Modal.Title>
          </Modal.Header>
          <Form noValidate onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Label
                className="visually-hidden"
                htmlFor="name"
              >
                {t('forms.createChannelForm.labels.channelName')}
              </Form.Label>
              <Form.Control
                type="text"
                id="name"
                value={values.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
                onKeyDown={(e) => handleKeyDown(e, handleSubmit)}
                autoFocus
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
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

export default ChannelCreationModal;
