import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import ArticleObject from './ArticleObject';


function Profile(){
  const bioInfo = {
    name:"About Me",
    className: "article",
    id: "me",
    img: "images/Profile-Photo1.png",
    content: "I started my career as a team member in Cineworld Sheffield after completing a 3Bsc Mathematics with Education Degree. I have been honing my management and leadership skills to become a Deputy General Manager at Cineworld Sheffield. I started programming in 2020 as a lockdown hobbie, I have always wanted to learn and develope programming skills, I have completed courses in python, html, css js, node & node express, MongoDB, REACT and more",
    
  }


return (
    <Container>
    <h2 class="bio">Bio</h2>
    <hr/>
    <ArticleObject
    name={bioInfo.name}
    img={bioInfo.img} 
    content={bioInfo.content}
    className={bioInfo.className}
    id={bioInfo.id}
    alt={true}
    upVote={false}
    />
      <hr/>
    </Container>

)
}

export default Profile;

