import React from "react";

import LogInForm from '../../components/log-in-form/LogInForm';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Login = () => {
  return (
    <Container fluid className='h-100'>
        <Row className='justify-content-center align-content-center h-100'>
          <Col md={8} xxl={6}>
            <Card>
              <Card.Body>
                <LogInForm />
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