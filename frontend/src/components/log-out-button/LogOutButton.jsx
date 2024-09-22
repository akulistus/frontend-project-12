import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { logOut, getUsername } from '../../slices/userSlice';

const LogOutButton = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = getUsername();

  const handleClick = () => {
    dispatch(logOut());
    navigate('/');
  };

  return (
    isAuth && (
      <Button variant="primary" onClick={handleClick}>
        {t('buttons.logout')}
      </Button>
    )
  );
};

export default LogOutButton;
