import { ObjectId } from "mongodb"

let projects 

export default class ProjectsDAO {
    static async injectDB(conn) {
        if(projects) {
            return
        }
        try {
            projects = await conn.db(process.env.PORTFO_NS).collection("projects") 
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in projectsDAO: ${e}`
            )
        }
    }

    static async getProjects({
        filters = null,
        page = 0,
    } = {}) {
        let query
        if (filters) {
        if ("name" in filters) {
            query = {$text: {$search: filters["name"]} } 
        }
      }
    let cursor

    try {
        cursor = await projects
        .find(query)
    } catch (e) {
        console.error(`unable to find command, ${e}`)
        return { projectsList: [], totalNumProjects: 0}
    }

    try {
        const projectList = await cursor.toArray()
        const totalNumProjects = page === 0 ? await projects.countDocuments(query) : 0
        return { projectList, totalNumProjects }
    } catch (e) {
        console.error(
            `unable to convert cursor to array or problem counting docs, ${e}`
        )
        return { projectList: [], totalNumProjects: 0}
    }

    }

    static async addProject(name, description) {
        try {
            const projectDoc = {
                name: name,
                img: `images/${name}.png`,
                about: description,
                skills:[],
                upvotes: 0

            }
            return await projects.insertOne(projectDoc)
        } catch (e) {
            console.error(`unable to create project ${e}`)
            return {error: e}

        }
    }

    static async updateProject(id, description, upvote) {
        try{
            const projectUpdate = await projects.updateOne(
                {_id: ObjectId(id)},
                {$set: {about: description,
                        upvotes: upvote}},
            )
            return projectUpdate

        } catch (e) {
            console.error(`unable to update project ${e}`)
            return {error: e}

        }
    }

    static async deleteProject(id) {
        try {
            const projectDelete = await projects.deleteOne(
                {_id: ObjectId(id)}
            )
            return projectDelete
        } catch (e) {
            console.error(`unable to delete project ${e}`)
            return {error: e}

        }
    }

    
}