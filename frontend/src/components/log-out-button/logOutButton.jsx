import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { logOut } from '../../slices/userSlice';
import routes from '../../helpers/routes';

const LogOutButton = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getUsername = useSelector((state) => state.user.getUsername);
  const isAuth = getUsername();

  const handleClick = () => {
    dispatch(logOut());
    navigate(routes.homePagePath());
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
