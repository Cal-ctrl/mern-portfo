import express from "express";
import cors from "cors";
import projects from "./api/portfo.route.js";
import { URL } from 'url'; // in Browser, the URL in native accessible on window
const __dirname = new URL('.', import.meta.url).pathname;


const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.use("/api/v1/projects", projects)

    //server static assets if in production
    if (process.env.NODE_ENV === "production") {
        console.log("In production");
        console.log(path.resolve(`client/build`));

        app.use(express.static(path.resolve(__dirname + `client/build`)));

        app.get("*", (req, res) => {
            res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
        });

        
    }

app.use("*", (req, res) => res.status(404).json({error: "not Found"}))

export default app