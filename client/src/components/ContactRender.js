import React, { useState } from 'react';
import Profile from './Profile';
import Form from 'react-bootstrap/Form'
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Container from 'react-bootstrap/Container'
import ContactDataService from "../services/contact.js"




function ContactRender() {

 const [message, setMessage] = useState({email: "", content: "", date: new Date()})



  function sendMessage(){
    ContactDataService.createMessage(message)
    .then(res => {
      console.log(res);
    })
    

  }

  function handleChange(e){
    const temp = {...message}
    temp[[e.target.name]] = e.target.value
     return setMessage(temp)

  }

  
  return (
    <div> 
    <Profile />
    <Container>
    <Form>
  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
    <Form.Label>Email address</Form.Label>
    <Form.Control onChange={handleChange} type="email" name="email" placeholder="name@example.com" />
  </Form.Group>
  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
    <Form.Label>Write Message Here</Form.Label>
    <Form.Control onChange={handleChange} as="textarea" name="content" type="text" rows={3} />
  </Form.Group>
  <Button onClick={sendMessage} variant="contained" color="success" endIcon={<SendIcon />}>Submit</Button>
</Form>
    </Container>

    </div>
  );
}

export default ContactRender;

