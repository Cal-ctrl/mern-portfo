import React from 'react';
import Profile from '../Profile';
import Form from 'react-bootstrap/Form'
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Container from 'react-bootstrap/Container'





function Contact() {
  return (
    <div> 
    <Profile />
    <Container>
    <Form>
  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="name@example.com" />
  </Form.Group>
  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
    <Form.Label>Write Message Here</Form.Label>
    <Form.Control as="textarea" rows={3} />
  </Form.Group>
  <Button variant="contained" color="success" endIcon={<SendIcon />}>Submit</Button>
</Form>
    </Container>

    </div>
  );
}

export default Contact;

