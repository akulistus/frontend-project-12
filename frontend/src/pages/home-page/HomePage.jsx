import React from 'react';
import { Outlet, Link } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import Container from 'react-bootstrap/esm/Container';
import Navbar from 'react-bootstrap/Navbar';
import LogOutButton from '../../components/log-out-button/LogOutButton';

import './app.css';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => (
  <div className="h-100 d-flex flex-column">
    <Navbar bg="dark" data-bs-theme="dark" sticky="top">
      <Container>
        <Navbar.Brand>
          <Link to="/" style={{ textDecoration: 'none' }}>Hexlet Chat</Link>
        </Navbar.Brand>
        <LogOutButton />
      </Container>
    </Navbar>
    <Outlet />
    <ToastContainer />
  </div>
);

export default Home;
