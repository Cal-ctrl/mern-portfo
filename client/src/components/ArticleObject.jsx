import React, { useState } from 'react';
import ProjectDataService from "../services/project"


import Additional from './Additional';


function ArticleObject(props){
  const [altText, setAltText] = useState(props.alt)
  const [upVote, setUpVote] = useState(props.upVotes) // may need to have this in the Projects component

  function liked () {
    console.log("clicked");
    setUpVote(prevValue => {
      let x = prevValue + 1 
      var data = {
          project_id: props.projectId,
          text: props.content,
          upvote: x
      };
      ProjectDataService.updateProject(data)
      
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
        { upVote && 
        <Additional likedfunc={liked} projectId={props.projectId} upVotes={upVote} />}
      </article> 
      </section>


      </div> :
      <div>
      <section className={props.className}>
      <article>
        <h2>{props.name}</h2>
        <p>{props.content}</p>
        { upVote && 
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

