import React, { useState } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';
import axios from 'axios';

export default function Login({ setUser }) {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('YOUR_BACKEND_URL/users', { params: formData });
      if (response.data.length > 0) {
        setUser(response.data[0]);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md="4">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" name="username" onChange={handleChange} required />
        </Col>
      </Row>
      <Row>
        <Col md="4">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" onChange={handleChange} required />
        </Col>
      </Row>
      <Button type="submit">Login</Button>
    </Form>
  );
}
