import React, { useEffect, useRef } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useGetChannelsQuery, useEditChannelMutation } from '../../services/api';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const ChannelEditModal = (props) => {
  const { t } = useTranslation();
  const { data } = useGetChannelsQuery();
  const [editChannel] = useEditChannelMutation();
  const { show, setShow, selectedChannel } = props;

  const inputRef = useRef(null);

  useEffect(() => {
    if (show && inputRef.current) {
      inputRef.current.select();
    }
  }, [show]);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, t('forms.editChannelForm.errors.channelnameLengthLimit'))
      .max(20, t('forms.editChannelForm.errors.channelnameLengthLimit'))
      .notOneOf(data.map((channel) => channel.name), t('forms.editChannelForm.errors.mustBeUnique'))
      .required(t('forms.editChannelForm.errors.requiredFiled'))
  });

  const handleClose = () => setShow(false);

  return (
    <Formik
      initialValues={{ name: selectedChannel.name }}
      onSubmit={async (values) => {
        const newChannel = {
          id: selectedChannel.id,
          body: values,
        };
        editChannel(newChannel)
          .then((data) => {
            if (!data.error) {
              toast.success(t('notifications.channelSuccessfullyRenamed'));
            }
          });
        handleClose();
      }}
      validationSchema={validationSchema}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {props => (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{t('modals.editChannelModal.title')}</Modal.Title>
          </Modal.Header>
          <Form noValidate onSubmit={props.handleSubmit}>
            <Modal.Body>
              <Form.Group>
                <Form.Control
                  type='text'
                  name='name'
                  ref={inputRef}
                  value={props.values.name}
                  onChange={props.handleChange}
                  isInvalid={!!props.errors.name}
                />
                <Form.Control.Feedback type='invalid'>{props.errors.name}</Form.Control.Feedback>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={handleClose}>
                {t('buttons.cancel')}
              </Button>
              <Button variant='primary' type='submit'>
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
