import React from 'react';
import { logOut } from '../../slices/authSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Button from 'react-bootstrap/Button';

const LogOutButton = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.username);

  const handleClick = () => {
    dispatch(logOut());
    navigate('/');
  };

  return (
    <>
      {isAuth && <Button variant='primary' onClick={handleClick}>LogOut</Button>}
    </>
  );
};

export default LogOutButton;