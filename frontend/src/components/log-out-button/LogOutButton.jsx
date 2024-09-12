import React from 'react';
import { logOut } from '../../slices/authSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Button from 'react-bootstrap/Button';

const LogOutButton = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.username);

  const handleClick = () => {
    dispatch(logOut());
    navigate('/');
  };

  return (
    <>
      {isAuth && <Button variant='primary' onClick={handleClick}>{t('buttons.logout')}</Button>}
    </>
  );
};

export default LogOutButton;