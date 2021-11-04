import express from "express";
import cors from "cors";
import projects from "./api/portfo.route.js";


const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.use("/api/v1/projects", projects)
app.use("*", (req, res) => res.status(404).json({error: "not Found"}))

export default app