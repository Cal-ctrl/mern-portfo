import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import ProjectsDAO from "./dao/projectsDAO.js"
import AllergyDAO from "./dao/allergyDAO.js"
import path from "path"
import express from "express";
import { URL } from 'url'; // in Browser, the URL in native accessible on window

// Will contain trailing slash
const __dirname = new URL('.', import.meta.url).pathname;

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

    //server static assets if in production
    if (process.env.NODE_ENV === "production") {
        console.log("In production");
        console.log(path.resolve(`client/build`));

        app.use(express.static(path.resolve(__dirname + `client/build`)));

        app.get("*", (req, res) => {
            
            try{res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
        } catch(e){
            console.log(e);
        }
        });

        
    }

    app.listen(port, ()=> {
        console.log(`listening on port ${port}`)
    })
})
