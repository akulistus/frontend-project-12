import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../services/api";
import { setToken } from "../../slices/authSlice";

import { Formik } from 'formik';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const LogInForm = (props) => {
  const { t } = useTranslation();
  const [login, { isError, isSuccess, error, isLoading, data }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setToken(data));
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
        <Form noValidate onSubmit={props.handleSubmit}>
          <Form.Label>{t('forms.logInForm.title')}</Form.Label>
          <FloatingLabel className='mb-3' label={t('forms.logInForm.fields.username')}>
            <Form.Control 
              type="text" 
              name="username" 
              placeholder='none'
              value={props.values.username}
              onChange={props.handleChange}
              isInvalid={isError}
            />
          </FloatingLabel>
          <FloatingLabel className='mb-3' label={t('forms.logInForm.fields.password')}>
            <Form.Control 
              type="password" 
              name="password" 
              placeholder='none'
              value={props.values.password}
              onChange={props.handleChange}
              isInvalid={isError && error?.status !== 'FETCH_ERROR'}
            />
            <Form.Control.Feedback type="invalid">{t('forms.logInForm.errors.invalidLoginAttempt')}</Form.Control.Feedback>
          </FloatingLabel>
          <Button type="submit">{t('buttons.login')}</Button>
        </Form>
      )}
    </Formik>
  );
};

export default LogInForm;