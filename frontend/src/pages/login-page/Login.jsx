import React from "react";

import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LogInForm from '../../components/log-in-form/LogInForm';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import image from '../../assets/logInImage.jfif';

const Login = () => {
  const { t } = useTranslation();
  return (
    <Container fluid className='h-100'>
        <Row className='justify-content-center align-content-center h-100'>
          <Col className='col-12' md={8} xxl={6}>
            <Card className='shadow-sm'>
              <Card.Body className='row p-5'>
                <div className='col-md-6 d-flex align-items-center justify-content-center'>
                  <img className='rounded-circle' src={image} />
                </div>
                <LogInForm />
              </Card.Body>
              <Card.Footer className='w-100 text-center p-4'>
                {t('cards.logInCard.noAccount')}
                <Link to={'/signup'}>{t('cards.logInCard.register')}</Link>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
    </Container>
  );
};

export default Login;