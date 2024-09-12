import React from "react";
import { Formik } from "formik";
import * as Yup from 'yup';

import { useTranslation } from "react-i18next";
import { useGetChannelsQuery, useAddChannelMutation } from "../../services/api";
import { useDispatch } from "react-redux";
import { setSelected } from "../../slices/channelSlice";

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const ChannelCreationModal = (props) => {
  const { t } = useTranslation();
  const { data } = useGetChannelsQuery();
  const [addChannel] = useAddChannelMutation();
  const { show, setShow } = props;

  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, t('forms.createChannelForm.errors.channelnameLengthLimit'))
      .max(20, t('forms.createChannelForm.errors.channelnameLengthLimit'))
      .notOneOf(data.map((channel) => channel.name), t('forms.createChannelForm.errors.mustBeUnique'))
      .required(t('forms.createChannelForm.errors.requiredFiled'))
  });

  const handleClose = () => setShow(false);

  return (
    <Formik
      initialValues={{ name: ''}}
      onSubmit={async (values) => {
        const response = await addChannel(values).unwrap();
        dispatch(setSelected(response));
        handleClose();
      }}
      validationSchema={validationSchema}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {props => (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{t('modals.createChannelModal.title')}</Modal.Title>
          </Modal.Header>
          <Form noValidate onSubmit={props.handleSubmit}>
            <Modal.Body>
                <Form.Control
                  type='text'
                  name='name'
                  value={props.values.name}
                  onChange={props.handleChange}
                  isInvalid={!!props.errors.name}
                  autoFocus
                />
                <Form.Control.Feedback type="invalid">{props.errors.name}</Form.Control.Feedback>
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

export default ChannelCreationModal;