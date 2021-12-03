import React, { useState } from 'react';
import ProjectDataService from "../services/project"
import { useAuth0 } from "@auth0/auth0-react";


import Additional from './Additional';


function ArticleObject(props){

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();


  const [altText, setAltText] = useState(props.alt)

  const [upVote, setUpVote] = useState(props.upVotes) // may need to have this in the Projects component

  async function liked () {
    console.log("clicked");
    const token = await getAccessTokenSilently();

    setUpVote(prevValue => {
      let x = prevValue + 1 
      var data = {
          project_id: props.projectId,
          text: props.content,
          upvote: x
      };
        ProjectDataService.updateProject(data, token)
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            alert("Upvote recorded. Thank you!")
          } 
          
        }, res => {
          console.log(res)
          alert("You dont have permission for this, please request it from the admin")
        })

      
      return x
    })

   }

return (
  altText ? 
  <div>

    <section className={props.className}>
      <article>
      <img id={props.id} src={props.img} alt="article-img" />
      </article>
      <article>
        <h2>{props.name}</h2>
        <p>{props.content}</p>
        { (isAuthenticated && props.id !== "me") && 
        <Additional likedfunc={liked} projectId={props.projectId} upVotes={upVote} />}
      </article> 
      </section>


      </div> :
      <div>
      <section className={props.className}>
      <article>
        <h2>{props.name}</h2>
        <p>{props.content}</p>
        { (isAuthenticated && props.id !== "me") &&
        <Additional likedfunc={liked} projectId={props.projectId} upVotes={upVote} />}
      </article>
      <article>
      <img id={props.id} src={props.img} alt="article-img" />
      </article>
      </section>

      
      </div>

)
}

export default ArticleObject;

