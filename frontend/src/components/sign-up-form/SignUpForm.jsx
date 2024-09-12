import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSignUpMutation } from '../../services/api';
import { setToken } from '../../slices/authSlice';
import validationSchema from '../../validation/signUpFormValitation';

import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { toast } from 'react-toastify';

const SignUpForm = (props) => {
  const { t } = useTranslation();
  const [registrationError, setRegistrationError] = useState(null);
  const [singUp, { isError, isSuccess, data, error }] = useSignUpMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setToken(data));
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
        <Form onSubmit={props.handleSubmit}>
          <Form.Label>{t('forms.signUpForm.title')}</Form.Label>
          <FloatingLabel className='mb-3' label={t('forms.signUpForm.fields.username')}>
            <Form.Control
              type='text'
              name='username'
              placeholder='none'
              autoComplete='username'
              value={props.values.username}
              onChange={props.handleChange}
              isInvalid={!!props.errors.username}
            />
            <Form.Control.Feedback type='invalid' tooltip>{props.errors.username}</Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel className='mb-3' label={t('forms.signUpForm.fields.password')}>
            <Form.Control
              type='password'
              name='password'
              placeholder='none'
              autoComplete='password'
              value={props.values.password}
              onChange={props.handleChange}
              isInvalid={!!props.errors.password}
            />
            <Form.Control.Feedback type='invalid' tooltip>{props.errors.password}</Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel className='mb-4' label={t('forms.signUpForm.fields.confirmPassword')}>
            <Form.Control
              type='password'
              name='confirmPassword'
              placeholder='none'
              autoComplete='confirmPassword'
              value={props.values.confirmPassword}
              onChange={props.handleChange}
              isInvalid={!!props.errors.confirmPassword || registrationError}
            />
            <Form.Control.Feedback type='invalid' tooltip>{props.errors.confirmPassword || registrationError}</Form.Control.Feedback>
          </FloatingLabel>
          <Button type='submit' className='w-100' variant='outline-primary'>{t('buttons.signUp')}</Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;