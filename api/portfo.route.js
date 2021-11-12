import express from "express";
import ProjectCtrl from "./projects.controller.js"
import AllergyCtrl from "./allergy.controller.js" 
import ContactCtrl from "./contact.controller.js"
import { auth } from 'express-oauth2-jwt-bearer';
import jwt from "express-jwt";
import jwksRsa from "jwks-rsa";
import jwtAuthz from "express-jwt-authz"

const authorizeAccessToken = jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://dev-yzf7krro.us.auth0.com/.well-known/jwks.json`
    }),
    audience: `https://portfo-api-users`,
    issuer: `https://dev-yzf7krro.us.auth0.com/`,
    algorithms: ["RS256"]
  });

//Post put and delete calls are for the Client only
  const checkPermissions = jwtAuthz(["user:client"], {
      customScopeKey: "permissions"
  })
// Project permsisions for Admin only. 
  const checkProjectPermissions = jwtAuthz(["admin"], {
    customScopeKey: "permissions"
})

const checkJwt = auth({
    audience: 'https://portfo-api-users',
    issuerBaseURL: `http//localhost:3000`,
  });

const router = express.Router()

router.route("/").get(ProjectCtrl.apiGetProjects)

router
    .route("/projects")
    .post(authorizeAccessToken, checkProjectPermissions, ProjectCtrl.apiPostProject) // Auth Needed
    .put(authorizeAccessToken, checkProjectPermissions, ProjectCtrl.apiUpdateProject) // Auth Needed
    .delete(authorizeAccessToken, checkProjectPermissions, ProjectCtrl.apiDeleteProject) //Auth Needed


router.route("/allergy")
    .get(AllergyCtrl.apiGetAllergyInfo)
    .post(authorizeAccessToken, checkPermissions, AllergyCtrl.apiPostAllergyInfo) //Auth needed
    .put(authorizeAccessToken, checkPermissions, AllergyCtrl.apiUpdateAllergyInfo) // Auth Needed
    .delete(authorizeAccessToken, checkPermissions, AllergyCtrl.apiDeleteAllergyInfo) // Auth Needed 

router.route("/contact")
      .post(ContactCtrl.apiPostContactMessage)



export default router;