import { query } from "express";
import ProjectsDAO from "../dao/projectsDAO.js";

export default class ProjectsController{

    static async apiGetProjects(req, res, next) {
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if (req.query.name) {
            filters.name = req.query.name
        }

        

        const { projectList, totalNumProjects } = await ProjectsDAO.getProjects({
            filters,
            page,
        })
        let response = {
            projects: projectList,
            page: page,
            filters: filters,
            total_results: totalNumProjects
        }
        res.json(response)


    }

    static async apiPostProject(req, res, next) {
        const projectName = req.body.name
        const projectDescription = req.body.text

        const projectCreate = await ProjectsDAO.addProject(
            projectName,
            projectDescription,
        )
        res.json({ status: "success"})

    } catch (e){
        res.status(500).json({ error: e.message})
    }

    static async apiUpdateProject(req, res, next) {
        try{
        const projectId = req.body.project_id
        const projectDescription = req.body.text
        const projectUpvote = req.body.upvote 

        const projectResponce = await ProjectsDAO.updateProject(
            projectId,
            projectDescription,
            projectUpvote
        )
        res.json({status: "success"})

        } catch (e) {
            res.status(500).json({error: e.message})
        }
    }

    static async apiDeleteProject(req, res, next){
        try {
            const projectId = req.query.id
            console.log(projectId);

            const deleteResponce = await ProjectsDAO.deleteProject(
                projectId,
            )
            res.json({status: "success"})

        }  catch (e) {
            res.status(500).json({error: e.message})
        }
    }

}