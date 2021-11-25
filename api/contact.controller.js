import contactDAO from "../dao/contactDAO.js"

export default class ContactController {

    static async apiPostContactMessage(req, res, next) {
        console.log(req.body);

        const email = req.body.email
        const content = req.body.content
        const date = req.body.date

        const messageCreate = await contactDAO.postContact(email, content, date)
        
        res.json({status: "success"})
    } catch (e){
        res.status(500).json({ error: e.message})
    }
}