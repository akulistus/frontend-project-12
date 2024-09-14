import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Button from 'react-bootstrap/Button';

const LogOutButton = (props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isAuth = window.localStorage.getItem('username');

  const handleClick = () => {
    window.localStorage.clear();
    navigate('/');
  };

  return (
    <>
      {isAuth && <Button variant="primary" onClick={handleClick}>{t('buttons.logout')}</Button>}
    </>
  );
};

export default LogOutButton;
