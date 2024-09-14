import React, { useEffect, useRef } from 'react';
import filter from 'leo-profanity';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';

import { useGetMessagesQuery, usePostMessageMutation } from '../../services/api';

import { ArrowRightSquare } from 'react-bootstrap-icons';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

const Chat = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetMessagesQuery();
  const [postMessage] = usePostMessageMutation();

  const selectedChannel = useSelector((state) => state.channels.selected);
  const username = window.localStorage.getItem('username');
  const inputRef = useRef(null);

  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  });

  if (isLoading) return null;

  return (
    <Container fluid className='d-flex flex-column h-100 px-0'>
      <Container fluid className='p-3 mb-4 bg-dark-subtle shadow-sm small'>
        <p className='m-0 fw-bold'>
          {`# ${selectedChannel.name}`}
        </p>
        <span className='text-muted'>
          {t('chat.message', { count: data.filter((message) => message.channelId === selectedChannel.id).length })}
        </span>
      </Container>
      <Container fluid className='overflow-auto px-5'>
        {renderMessages(data, selectedChannel.id)}
      </Container>
      <Container className='px-5 py-3 mt-auto'>
        <Formik
          initialValues={{ message: '' }}
          onSubmit={async (values, { resetForm }) => {
            const message = { 
              body: filter.clean(values.message),
              channelId: selectedChannel.id,
              username: username,
            };
            await postMessage(message);
            resetForm();
          }}
        >
          {props => (
            <Form noValidate onSubmit={props.handleSubmit}>
              <InputGroup>
                <Form.Control
                  type='text'
                  name='message'
                  ref={inputRef}
                  placeholder={t('forms.messageForm.fields.enterMessage')}
                  value={props.values.message}
                  onChange={props.handleChange}
                />
                <Button 
                  className='btn-group-vertical' 
                  variant='' 
                  disabled={!props.values.message} type='submit'
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

const renderMessages = (messages, channelId) =>
  messages
    .filter((message) => message.channelId === channelId)
    .map((message, index) => (
      <div key={index} className='text-break md-2'>
        <b>{message.username}</b> {message.body}
      </div>
    ));

export default Chat;
