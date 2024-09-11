import React from 'react';

import SignUpForm from '../../components/sign-up-form/SignUpForm';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const SignUpPage = (props) => {
  return (
    <Container fluid className='h-100'>
        <Row className='justify-content-center align-content-center h-100'>
          <Col md={8} xxl={6}>
            <Card>
              <Card.Body>
                <SignUpForm />
              </Card.Body>
            </Card>
          </Col>
        </Row>
    </Container>
  );
};

export default SignUpPage;