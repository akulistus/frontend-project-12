import React from 'react';
import { Outlet } from 'react-router-dom';

import Container from 'react-bootstrap/esm/Container';
import Navbar from 'react-bootstrap/Navbar';
import './App.css';

const Home = () => {
  return (
    <>
      <Navbar bg='dark' sticky='top'>
        <Container>
          <Navbar.Brand>Chat</Navbar.Brand>
        </Container>
      </Navbar>
      <Outlet/>
    </>
  );
};

export default Home;