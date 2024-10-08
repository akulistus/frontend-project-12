import React, { useEffect, useRef } from 'react';
import filter from 'leo-profanity';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';

import { ArrowRightSquare } from 'react-bootstrap-icons';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { useGetMessagesQuery, usePostMessageMutation } from '../../services/messageApi';

const renderMessages = (messages) => messages
  .map((message) => (
    <div key={message.id} className="text-break md-2">
      <b>{message.username}</b>
      {' '}
      {message.body}
    </div>
  ));

const Chat = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetMessagesQuery();
  const [postMessage] = usePostMessageMutation();

  const selectedChannel = useSelector((state) => state.channels.selected);
  const getUsername = useSelector((state) => state.user.getUsername);
  const username = getUsername();
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  const messages = data?.filter((message) => message.channelId === selectedChannel.id);

  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  });

  useEffect(() => {
    if (!isLoading && scrollRef.current) {
      scrollRef.current.scrollIntoView();
    }
  }, [messages, isLoading]);

  if (isLoading) return null;

  return (
    <Container fluid className="d-flex flex-column h-100 px-0">
      <Container fluid className="p-3 mb-4 bg-dark-subtle shadow-sm small">
        <p className="m-0 fw-bold">
          {`# ${selectedChannel.name}`}
        </p>
        <span className="text-muted">
          {t('chat.message', { count: messages.length })}
        </span>
      </Container>
      <div className="overflow-auto px-5">
        {renderMessages(messages)}
        <div ref={scrollRef} />
      </div>
      <Container className="px-5 py-3 mt-auto">
        <Formik
          initialValues={{ message: '' }}
          onSubmit={async (values, { resetForm }) => {
            const message = {
              body: filter.clean(values.message),
              channelId: selectedChannel.id,
              username,
            };
            await postMessage(message);
            resetForm();
          }}
        >
          {(props) => (
            <Form noValidate onSubmit={props.handleSubmit}>
              <InputGroup>
                <Form.Control
                  type="text"
                  id="message"
                  aria-label={t('forms.messageForm.labels.newMessage')}
                  ref={inputRef}
                  placeholder={t('forms.messageForm.fields.enterMessage')}
                  value={props.values.message}
                  onChange={props.handleChange}
                />
                <Button
                  className="btn-group-vertical"
                  variant=""
                  disabled={!props.values.message}
                  type="submit"
                >
                  <ArrowRightSquare />
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
