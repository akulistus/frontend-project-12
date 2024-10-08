import React, { useState } from 'react';
import * as Yup from 'yup';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { toast } from 'react-toastify';
import { Formik } from 'formik';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import routes from '../../helpers/routes';
import { logIn } from '../../slices/userSlice';
import { useSignUpMutation } from '../../services/loginApi';

const SignUpForm = () => {
  const { t } = useTranslation();
  const [registrationError, setRegistrationError] = useState(null);
  const [singUp, { isLoading }] = useSignUpMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, t('forms.signUpForm.errors.usernameLengthLimit'))
      .max(20, t('forms.signUpForm.errors.usernameLengthLimit'))
      .required(t('forms.signUpForm.errors.requiredFiled')),
    password: Yup.string()
      .min(6, t('forms.signUpForm.errors.passwordLengthLimit'))
      .required(t('forms.signUpForm.errors.requiredFiled')),
    confirmPassword: Yup.string()
      .oneOf([
        Yup.ref('password'),
      ], t('forms.signUpForm.errors.passwordDoesNotMatch')),
  });

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
        const response = await singUp(newUser);
        const { data, error } = response;
        if (data) {
          dispatch(logIn(data));
          navigate(routes.homePagePath());
        } else if (error?.status !== 'FETCH_ERROR') {
          setRegistrationError(t('forms.signUpForm.errors.userAlreadyExists'));
        } else if (error?.status === 'FETCH_ERROR') {
          toast.error(t('notifications.connectionError'));
        }
      }}
    >
      {({
        handleSubmit, handleChange, values, errors,
      }) => (
        <Form className="w-50" onSubmit={handleSubmit}>
          <Form.Label className="w-100 h1 text-center">{t('forms.signUpForm.title')}</Form.Label>
          <Form.Floating className="mb-3">
            <Form.Control
              type="text"
              id="username"
              placeholder="none"
              autoComplete="username"
              value={values.username}
              onChange={handleChange}
              isInvalid={!!errors.username}
            />
            <Form.Control.Feedback type="invalid" tooltip>{errors.username}</Form.Control.Feedback>
            <label htmlFor="username">{t('forms.signUpForm.fields.username')}</label>
          </Form.Floating>
          <Form.Floating className="mb-3">
            <Form.Control
              type="password"
              id="password"
              placeholder="none"
              autoComplete="password"
              value={values.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid" tooltip>{errors.password}</Form.Control.Feedback>
            <label htmlFor="password">{t('forms.signUpForm.fields.password')}</label>
          </Form.Floating>
          <Form.Floating className="mb-4">
            <Form.Control
              type="password"
              id="confirmPassword"
              placeholder="none"
              autoComplete="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              isInvalid={!!errors.confirmPassword || registrationError}
            />
            <Form.Control.Feedback type="invalid" tooltip>{errors.confirmPassword || registrationError}</Form.Control.Feedback>
            <label htmlFor="confirmPassword">{t('forms.signUpForm.fields.confirmPassword')}</label>
          </Form.Floating>
          <Button disabled={isLoading} type="submit" className="w-100" variant="outline-primary">{t('buttons.signUp')}</Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
