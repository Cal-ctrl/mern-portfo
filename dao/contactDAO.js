import { ObjectId } from "mongodb"

let contact 

export default class contactDAO{ 
    static async injectDB(conn) {
        if(contact) {
            return
        }
        try {
            contact = await conn.db(process.env.PORTFO_NS).collection("contact") 
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in projectsDAO: ${e}`
            )
        }
    }

    static async postContact(email, message) {
        try{
            const conactInfo = {
                email: email,
                message: message,
                date: new Date()
            }
        return await contact.insertOne(contactInfo)
        } catch (e){
            console.error(`Error inserting doc into DB: ${e}`)
            return{error: e}
        }
    }

}