import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import ProjectsDAO from "./dao/projectsDAO.js"
import AllergyDAO from "./dao/allergyDAO.js"
import ContactDAO from "./dao/contactDAO.js"
import RetailDAO from "./dao/retailDAO.js"
import {Agenda} from "agenda"
import { main } from "./email.js"
import BlogDAO from "./dao/blogDAO.js"
import MediaDAO from "./dao/mediaDAO.js"

dotenv.config()

const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000
MongoClient.connect(
    process.env.PORTFO_DB_URI  // Change back to this for full deploy
    // "mongodb://127.0.0.1:27017" //Local Host testing platform
).catch (err => {
    console.error(err)
    process.exit(1)
}).then (async client => {
    await ProjectsDAO.injectDB(client);
    await AllergyDAO.injectDB(client);
    await ContactDAO.injectDB(client);
    await RetailDAO.injectDB(client);
    await BlogDAO.injectDB(client);
    await MediaDAO.injectDB(client);


    app.listen(port, ()=> {
        console.log(`listening on port ${port}`)
    })
}).then ( () => {
    const agenda = new Agenda({db: {address: process.env.PORTFO_DB_URI, collection: 'agendaJobs'}});

    agenda.define(
        "send email report",
        { priority: "high", concurrency: 10 },
        async (job) => {
          const { to } = job.attrs.data;
          const shortDates = await RetailDAO.getShortDates({email: "sheffield.cineworld@gmail.com"})
          console.log(`short dates array = ${shortDates}`)
          const testDate = shortDates || "Test if date req fails"
          await main(to, testDate);
        }
      );
      
      (async function () {
        await agenda.start();
        await agenda.every("3 days", "send email report", {
          to: "callum-mcneil@hotmail.com",
        });
      })();
})
