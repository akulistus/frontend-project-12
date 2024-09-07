import React from 'react';
import { Outlet } from 'react-router-dom';

import Container from 'react-bootstrap/esm/Container';
import Navbar from 'react-bootstrap/Navbar';

import './App.css';

const Home = () => {
  return (
    <div className='h-100 d-flex flex-column'>
      <Navbar bg='dark' data-bs-theme="dark" sticky='top'>
        <Container>
          <Navbar.Brand>Chat</Navbar.Brand>
        </Container>
      </Navbar>
      <Outlet/>
    </div>
  );
};

export default Home;