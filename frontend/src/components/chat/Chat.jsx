import React from "react";
import filter from 'leo-profanity';
import { useSelector } from "react-redux";
import { Formik } from 'formik';
import { useTranslation } from "react-i18next";

import { useGetMessagesQuery, usePostMessageMutation } from '../../services/api';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

filter.loadDictionary('ru');

const Chat = (props) => {
  const { t } = useTranslation();
	const { data, isLoading } = useGetMessagesQuery();
  const [postMessage] = usePostMessageMutation();

  const selectedChannel = useSelector((state) => state.channels.selected);
  const username = useSelector((state) => state.auth.username);

	if (isLoading) return null;

	return (
		<Container fluid className="d-flex flex-column h-100 px-0">
      <Container fluid className="p-3 mb-4 bg-dark-subtle shadow-sm small">
        {selectedChannel.name}
        {t('chat.message', { count: data.length })}
      </Container>
      <Container fluid className="overflow-auto px-5">
        {renderMessages(data, selectedChannel.id)}
      </Container>
      <Container className="px-5 py-3 mt-auto">
        <Formik
          initialValues={{
            message: '',
          }}
          onSubmit={async (values) => {
            const message = { 
              body: filter.clean(values.message),
              channelId: selectedChannel.id,
              username: username,
            };
            postMessage(message);
          }}
        >
          {props => (
            <Form noValidate onSubmit={props.handleSubmit}>
              <InputGroup>
                <Form.Control
                  type='text'
                  name='message'
                  placeholder={t('forms.messageForm.fields.enterMessage')}
                  value={props.values.message}
                  onChange={props.handleChange}
                />
                <Button type='submit'>
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

const renderMessages = (messages, channelId) =>
  messages
    .filter((message) => message.channelId === channelId)
    .map((message) => (
      <div className="text-break md-2">
        <b>{message.username}</b> {message.body}
      </div>
    ));

export default Chat;