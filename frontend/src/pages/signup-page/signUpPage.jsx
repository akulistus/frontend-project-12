import React from 'react';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SignUpForm from '../../components/sign-up-form/signUpForm';
import image from '../../assets/signInImage.jpg';

const SignUpPage = () => (
  <Container fluid className="h-100">
    <Row className="justify-content-center align-content-center h-100">
      <Col className="col-12" md={8} xxl={6}>
        <Card className="shadow-sm">
          <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
            <div>
              <img src={image} className="rounded-circle" alt="images.registerImage" />
            </div>
            <SignUpForm />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default SignUpPage;
