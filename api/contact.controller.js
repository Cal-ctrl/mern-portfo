import contactDAO from "../dao/contactDAO.js"

export default class ContactController {

    static async apiPostContactMessage(req, res, next) {
        console.log(req.body);
        
        const email = req.body.email
        const message = req.body.message

        const messageCreate = await contactDAO.postContact(email, message)
        res.json({status: "success"})
    } catch (e){
        res.status(500).json({ error: e.message})
    }
}