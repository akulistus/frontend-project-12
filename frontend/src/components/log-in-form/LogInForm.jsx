import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../services/api';

import { Formik } from 'formik';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const LogInForm = (props) => {
  const { t } = useTranslation();
  const [login, { isError, isSuccess, error, isLoading, data }] = useLoginMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      window.localStorage.setItem('token', data.token);
      window.localStorage.setItem('username', data.username);
      navigate('/');
    }
  }, [isLoading]);

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      onSubmit={async (values) => {
        login(values);
      }}
    >
      {props => (
        <Form className='col-12 col-md-6 mt-3 mt-md-0' noValidate onSubmit={props.handleSubmit}>
          <Form.Label className='text-center mb-4 h1 w-100'>{t('forms.logInForm.title')}</Form.Label>
          <Form.Floating className='mb-3'>
            <Form.Control 
              type='text' 
              id='username' 
              placeholder='none'
              value={props.values.username}
              onChange={props.handleChange}
              isInvalid={isError}
            />
            <label htmlFor='username'>{t('forms.logInForm.fields.username')}</label>
          </Form.Floating>
          <Form.Floating className='mb-3' label={t('forms.logInForm.fields.password')}>
            <Form.Control 
              type='password' 
              id='password' 
              placeholder='none'
              value={props.values.password}
              onChange={props.handleChange}
              isInvalid={isError && error?.status !== 'FETCH_ERROR'}
            />
            <Form.Control.Feedback type='invalid'>{t('forms.logInForm.errors.invalidLoginAttempt')}</Form.Control.Feedback>
            <label htmlFor='password'>{t('forms.logInForm.fields.password')}</label>
          </Form.Floating>
          <Button disabled={isLoading} className='w-100 mb-3' variant='outline-primary' type='submit'>{t('buttons.login')}</Button>
        </Form>
      )}
    </Formik>
  );
};

export default LogInForm;