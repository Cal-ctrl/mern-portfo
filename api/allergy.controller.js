import { query } from "express";
import AllergyDAO from "../dao/allergyDAO.js";

export default class AllergyController{

    static async apiGetAllergyInfo(req, res, next){
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if (req.query.name) {
            filters.name = req.query.name
        } else {
            filters = {...req.query}
            const test = {...filters, ...req.query}
            console.log(test);
        }

        const { allergyList, totalNumAllergy } = await AllergyDAO.getAllergyInfo({
            filters,
            page,
        })
        let response = {
            allergy: allergyList,
            page: page,
            filters: filters,
            total_results: totalNumAllergy
        }
        res.json(response)
    }

    static async apiPostAllergyInfo(req, res, next) {

     const allergyName = req.body.name
     const allergyDietry = req.body.diets
     const allergens = req.body.allergyInfo 
     const currentMenu = req.body.currentMenu
     const foodType = req.body.type
     const dateAdded = new Date()
     const ingredients = req.body.ingredients
     const restaurant = req.body.restaurant

     const foodCreate = await AllergyDAO.addFood(
         allergyName,
         allergyDietry,
         allergens,
         currentMenu,
         foodType,
         dateAdded,
         ingredients,
         restaurant
     )
     console.log(foodCreate);
     res.json({status: `success`})

    } catch (e){
        res.status(500).json({ error: e.message})
    }

    static async apiUpdateAllergyInfo(req, res, next){

        const foodId = req.body._id
        const allergyName = req.body.name
        const allergyDietry = req.body.diets 
        const allergens = req.body.allergyInfo 
        const currentMenu = req.body.currentMenu
        const type = req.body.type
        const dateAdded = new Date()
        const ingredients = req.body.ingredients
        const restaurant = req.body.restaurant
   

        const allergyResponce = await AllergyDAO.updateFood(
            foodId,
            allergyName,
            allergyDietry,
            allergens,
            currentMenu,
            type,
            dateAdded,
            ingredients,
            restaurant

        )
        res.json({status: `success`})

    } catch (e){
        res.status(500).json({ error: e.message})
    }

    static async apiDeleteAllergyInfo(req, res, next){
        try{
            const foodId = req.query.id
            console.log(foodId);

            const deleteResponce = await AllergyDAO.deleteFood(
                foodId,
                )
            res.json({status:`success`})

        }catch (e) {
            res.status(500).json({error: e.message})
        }
    } 



    
}