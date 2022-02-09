import RetailDAO from "../dao/retailDAO.js";


export default class RetailController{

    static async apiGetRetail(req, res, next) {
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if (req.query.name) {
            filters.name = req.query.name
        }

        

        const { retailList, totalNumItems } = await RetailDAO.getItems({
            filters,
            page,
        })
        let response = {
            cinemas: retailList,
            page: page,
            filters: filters,
            total_results: totalNumItems
        }
        res.json(response)

    }

    static async apiPostRetail(req, res, next) {
        
        const cinema =  req.body.cinema
        const items = req.body.items
        const stockRooms = req.body.stockRooms
        const dateAdded = new Date()
        
        const cinemaRetailCreate = await RetailDAO.addCinemaStock(cinema, items, stockRooms, dateAdded)
        console.log(`item create`, cinemaRetailCreate)
        res.json({status: `success`})
    } catch (e){
        res.status(500).json({ error: e.message})
    }

    static async apiUpdateRetail(req, res, next) {
        
        const id = req.body.id
        const cinema =  req.body.cinema
        const items = req.body.items
        const stockRooms = req.body.stockRooms
        const dateAdded = new Date()
        
        const cinemaRetailCreate = await RetailDAO.updateRetail(id, cinema, items, stockRooms, dateAdded)
        console.log(`item update`, cinemaRetailCreate)
        res.json({status: `success`})
    } catch (e){
        res.status(500).json({ error: e.message})
    }

    static async apiDeleteRetailInfo(req, res, next){
        try{
            const cinemaID = req.query.id
            console.log(cinemaID);

            const deleteResponce = await RetailDAO.deleteRetail(
                cinemaID
                )
            res.json({status:`success`})

        }catch (e) {
            res.status(500).json({error: e.message})
        }
    } 


}