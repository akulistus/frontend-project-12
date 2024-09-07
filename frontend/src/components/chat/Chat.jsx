import React from "react";

import { useGetMessagesQuery } from '../../services/messageApi';
import { Formik } from 'formik';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

const Chat = (props) => {
	const { data, isLoading } = useGetMessagesQuery();

	if (isLoading) return null;

	return (
		<Container fluid className="d-flex flex-column h-100 px-0">
      <Container fluid className="p-3 mb-4 bg-dark-subtle shadow-sm small">
        Имя чата
        Кол-во сообщений
      </Container>
      <Container fluid className="overflow-auto px-5">
        {data.map((message) => (
          <div className="text-break md-2">
            <b>{message.username}</b> {message.body}
          </div>
        ))}
      </Container>
      <Container className="px-5 py-3 mt-auto">
        <Formik
          initialValues={{
            message: '',
          }}
          onSubmit={async (values) => {
            console.log(values);
          }}
        >
          {props => (
            <Form noValidate onSubmit={props.handleSubmit}>
              <InputGroup>
                <Form.Control
                  type='text'
                  name='message'
                  placeholder='Введите сообщение...'
                  value={props.values.message}
                  onChange={props.handleChange}
                />
                <Button type="submit">
                  Button
                </Button>
              </InputGroup>
            </Form>
          )}
        </Formik>
      </Container>
		</Container>
	);
};

export default Chat;