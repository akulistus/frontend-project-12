import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSignUpMutation } from '../../services/api';
import { setToken } from '../../slices/authSlice';

import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов')
    .required('Обязательное поле'),
  password: Yup.string()
    .min(6, 'Не менее 6 символов')
    .required('Обязательное поле'),
  confirmPassword: Yup.string()
    .oneOf([
      Yup.ref('password'),
    ], 'Пароли должны совпадать'),
});

const SignUpForm = (props) => {
  const [registrationError, setRegistrationError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [singUp, { isError, isSuccess, data }] = useSignUpMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setToken(data));
      navigate('/');
      return;
    } else if (isError) {
      setRegistrationError('Такой пользователь уже существует');
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
        singUp(newUser).unwrap();
      }}
    >
      {props => (
        <Form onSubmit={props.handleSubmit}>
          <Form.Label>Регистрация</Form.Label>
          <FloatingLabel className='mb-3' label='Username'>
            <Form.Control
              type='text'
              name='username'
              placeholder='Username'
              autoComplete='username'
              value={props.values.username}
              onChange={props.handleChange}
              isInvalid={!!props.errors.username}
            />
            <Form.Control.Feedback type='invalid' tooltip>{props.errors.username}</Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel className='mb-3' label='Password'>
            <Form.Control
              type='password'
              name='password'
              placeholder='Password'
              autoComplete='password'
              value={props.values.password}
              onChange={props.handleChange}
              isInvalid={!!props.errors.password}
            />
            <Form.Control.Feedback type='invalid' tooltip>{props.errors.password}</Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel className='mb-4' label='Confirm password'>
            <Form.Control
              type='password'
              name='confirmPassword'
              placeholder='Confirm password'
              autoComplete='confirmPassword'
              value={props.values.confirmPassword}
              onChange={props.handleChange}
              isInvalid={!!props.errors.confirmPassword || registrationError}
            />
            <Form.Control.Feedback type='invalid' tooltip>{props.errors.confirmPassword || registrationError}</Form.Control.Feedback>
          </FloatingLabel>
          <Button type='submit' className='w-100' variant='outline-primary' >Register</Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;