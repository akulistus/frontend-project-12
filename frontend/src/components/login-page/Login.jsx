import React from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../services/authApi";
import { setToken } from "../../slices/authSlice";

import { Formik } from 'formik';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isError }] = useLoginMutation();

  return (
    <Container fluid className='h-100'>
        <Row className='justify-content-center align-content-center h-100'>
          <Col md={8} xxl={6}>
            <Card>
              <Card.Title>Login</Card.Title>
              <Card.Body>
                <Formik
                  initialValues={{
                    username: '',
                    password: '',
                  }}
                  onSubmit={async (values) => {
                    const response = await login(values).unwrap();
                    dispatch(setToken(response));
                    navigate('/');
                  }}
                >
                  {props => (
                      <Form noValidate onSubmit={props.handleSubmit}>
                        <Form.Label>Username</Form.Label>
                        <Form.Control 
                          type="text" 
                          name="username" 
                          placeholder="Username"
                          value={props.values.username}
                          onChange={props.handleChange}
                          isInvalid={isError}
                        />
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                          type="password" 
                          name="password" 
                          placeholder="password"
                          value={props.values.password}
                          onChange={props.handleChange}
                          isInvalid={isError}
                        />
                        <Form.Control.Feedback type="invalid">Неправильный логин или пароль</Form.Control.Feedback>
                        <Button type="submit">LogIn</Button>
                      </Form>
                  )}
                </Formik>
              </Card.Body>
              <Card.Footer>
                {`Footer`}
              </Card.Footer>
            </Card>
          </Col>
        </Row>
    </Container>
  );
};

export default Login;