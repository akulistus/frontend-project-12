import React from "react";
import { Formik } from "formik";
import * as Yup from 'yup';

import { useGetChannelsQuery, useAddChannelMutation } from "../../services/api";

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const ChannelCreationModal = (props) => {
  const { data } = useGetChannelsQuery();
  const [addChannel] = useAddChannelMutation();
  const { show, setShow } = props;

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
      initialValues={{ name: ''}}
      onSubmit={async (values) => {
        addChannel(values);
        handleClose();
      }}
      validationSchema={validationSchema}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {props => (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Добавить канал</Modal.Title>
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

export default ChannelCreationModal;