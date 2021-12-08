import React, { useState, useEffect } from 'react';
import ArticleObject from './ArticleObject';
import Container from 'react-bootstrap/esm/Container';
import ProjectDataService from "../services/project"




function Projects(props) {
    const [projectList, setProjectList] = useState([])

    useEffect(()=> {
        retrieveProjects();
    }, [])


    function retrieveProjects() {
        ProjectDataService.getAll()
        .then(response => {
            // console.log(response.data);
            setProjectList(response.data.projects)
        })
    }

    return(  
        <Container>
        <h2>Projects</h2>
            {projectList.map((project, i) => {
                    return (
                <ArticleObject
                    projectId={project._id}
                    img={project.img}
                    content={project.about}
                    className={i % 2 === 0 ? "article" : "article alt"}
                    id={i % 2 === 0 ? "left" : "right"}
                    key={i}
                    name={project.name}
                    alt={i % 2 === 0 ? true : false}
                    upVote={true}
                    upVotes={project.upvotes}
                />
                    )}
            

            )}
            <a href="http://localhost:5000/snake"> Snake Test</a>

            </Container>    
    )
}

export default Projects