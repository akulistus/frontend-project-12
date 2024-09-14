import React from "react";

import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LogInForm from '../../components/log-in-form/LogInForm';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Login = () => {
  const { t } = useTranslation();
  return (
    <Container fluid className='h-100'>
        <Row className='justify-content-center align-content-center h-100'>
          <Col md={8} xxl={6}>
            <Card>
              <Card.Body className='p-5'>
                <LogInForm />
              </Card.Body>
              <Card.Footer className='p-4'>
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