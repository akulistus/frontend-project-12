import React from "react";
import { Formik } from "formik";
import * as Yup from 'yup';

import { useGetChannelsQuery, useEditChannelMutation } from "../../services/api";

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const ChannelEditModal = (props) => {
  const { data } = useGetChannelsQuery();
  const [editChannel] = useEditChannelMutation();
  const { show, setShow, selectedChannel } = props;

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .notOneOf(data.map((channel) => channel.name), 'Должно быть уникальным')
      .required('Обязательное поле')
  });

  const handleClose = () => setShow(false);

  return (
    <Formik
      initialValues={{ name: selectedChannel.name}}
      onSubmit={async (values) => {
        const newChannel = {
          id: selectedChannel.id,
          body: values,
        };
        editChannel(newChannel);
        handleClose();
      }}
      validationSchema={validationSchema}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {props => (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Переименовать канал</Modal.Title>
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
                Отменить
              </Button>
              <Button variant='primary' type='submit'>
                Отправить
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      )}
    </Formik>
  );
};

export default ChannelEditModal;