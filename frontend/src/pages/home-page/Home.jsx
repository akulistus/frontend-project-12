import React from 'react';
import { Outlet } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import LogOutButton from '../../components/log-out-button/LogOutButton';
import Container from 'react-bootstrap/esm/Container';
import Navbar from 'react-bootstrap/Navbar';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {

  return (
    <div className='h-100 d-flex flex-column'>
      <Navbar bg='dark' data-bs-theme="dark" sticky='top'>
        <Container>
          <Navbar.Brand href='/'>Hexlet Chat</Navbar.Brand>
          <LogOutButton />
        </Container>
      </Navbar>
      <Outlet/>
      <ToastContainer />
    </div>
  );
};

export default Home;