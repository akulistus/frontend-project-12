import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useSignUpMutation } from '../../services/api';
import validationSchema from '../../validation/signUpFormValitation';

import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const SignUpForm = (props) => {
  const { t } = useTranslation();
  const [registrationError, setRegistrationError] = useState(null);
  const [singUp, { isError, isSuccess, data, error, isLoading }] = useSignUpMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      window.localStorage.setItem('token', data.token);
      window.localStorage.setItem('username', data.username);
      navigate('/');
      return;
    } else if (isError && error?.status !== 'FETCH_ERROR') {
      setRegistrationError(t('forms.signUpForm.errors.userAlreadyExists'));
    }
  }, [isError, isSuccess]);

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        const newUser = {
          username: values.username,
          password: values.password,
        };
        singUp(newUser);
      }}
    >
      {props => (
        <Form className='w-50' onSubmit={props.handleSubmit}>
          <Form.Label className='w-100 h1 text-center' >{t('forms.signUpForm.title')}</Form.Label>
          <Form.Floating className='mb-3'>
            <Form.Control
              type='text'
              id='username'
              placeholder='none'
              autoComplete='username'
              value={props.values.username}
              onChange={props.handleChange}
              isInvalid={!!props.errors.username}
            />
            <Form.Control.Feedback type='invalid' tooltip>{props.errors.username}</Form.Control.Feedback>
            <label htmlFor='username'>{t('forms.signUpForm.fields.username')}</label>
          </Form.Floating>
          <Form.Floating className='mb-3'>
            <Form.Control
              type='password'
              id='password'
              placeholder='none'
              autoComplete='password'
              value={props.values.password}
              onChange={props.handleChange}
              isInvalid={!!props.errors.password}
            />
            <Form.Control.Feedback type='invalid' tooltip>{props.errors.password}</Form.Control.Feedback>
            <label htmlFor='password'>{t('forms.signUpForm.fields.password')}</label>
          </Form.Floating>
          <Form.Floating className='mb-4'>
            <Form.Control
              type='password'
              id='confirmPassword'
              placeholder='none'
              autoComplete='confirmPassword'
              value={props.values.confirmPassword}
              onChange={props.handleChange}
              isInvalid={!!props.errors.confirmPassword || registrationError}
            />
            <Form.Control.Feedback type='invalid' tooltip>{props.errors.confirmPassword || registrationError}</Form.Control.Feedback>
            <label htmlFor='confirmPassword'>{t('forms.signUpForm.fields.confirmPassword')}</label>
          </Form.Floating>
          <Button disabled={isLoading} type='submit' className='w-100' variant='outline-primary'>{t('buttons.signUp')}</Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;