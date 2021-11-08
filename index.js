import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import ProjectsDAO from "./dao/projectsDAO.js"
import AllergyDAO from "./dao/allergyDAO.js"

dotenv.config()

const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

MongoClient.connect(
    process.env.PORTFO_DB_URI

).catch (err => {
    console.error(err)
    process.exit(1)
}).then (async client => {
    await ProjectsDAO.injectDB(client);
    await AllergyDAO.injectDB(client);


    app.listen(port, ()=> {
        console.log(`listening on port ${port}`)
    })
})
