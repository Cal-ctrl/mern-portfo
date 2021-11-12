import { ObjectId } from "mongodb"

let allergy

export default class AllergyDAO {
    static async injectDB(conn) {
        if (allergy) {
            return
        }
        try {
            allergy = await conn.db(process.env.PORTFO_NS).collection("allergy")
        } catch (e){
            console.error(
                `Unable to establish a collection handle in allergyDAO: ${e}`);

        }

    }

    static async getAllergyInfo({
        filters = null,
        page = 0,
    } = {}) {
        let query = {}
        if (filters) {
            if ("name" in filters) {
                query = {$text: {$search: filters["name"]} } 
            } else {
                const dietArray = ["Vegetarian", "Vegan", "Halal_Certified", "Kosher", "Gluten_free"]
                const allergenArray = ["Milk_and_milk_proteins", "Egss", "Fish", "Peanuts", "Soybeans", "Barley", "Wheat", "Rye", "Oats", "Cereals_containing_gluten", "Crustaceans", "Nuts", "Celery", "Mustard", "Sesame", "Sulphites", "Lupin", "Molluscs" ]

                console.log(filters);
                for (const key in filters) {

                        if (dietArray.includes(key)) {
                            const newFilter = "diets." + [key]
                            query[[newFilter]] = (filters[key] === "true" ? true : false )

                        } else if (allergenArray.includes(key)) {
                            const newFilter = "allergyInfo." + [key]
                            query[[newFilter]] = (filters[key] === "true" ? false : true )

                        } else {
                            query[[key]] = true
                        }
           
                   
                }


                console.log(query);

            }
        }
    
    let cursor

    try {
        cursor = await allergy
        .find(query)
    } catch (e) {
        console.error(`unable to find command, ${e}`)
        return { allergyList: [], totalNumAllergy: 0}
    }

    try {
        const allergyList = await cursor.toArray()
        const totalNumAllergy = page === 0 ? await allergy.countDocuments(query) : 0
        return { allergyList, totalNumAllergy }
    } catch (e) {
        console.error(
            `unable to convert cursor to array or problem counting docs, ${e}`
        )
        return { allergyList: [], totalNumAllergy: 0}
    }



    }

    static async addFood(name, diets, allergen, currentMenu, foodType){
        try {
            const allergyDoc = {
                name: name,
                diets: diets,
                allergyInfo: allergen,
                currentMenu: currentMenu,
                type: foodType

            } 
            return await allergy.insertOne(allergyDoc)
        } catch (e) {
            console.error(`unable to add document : ${e}`)
            return {error: e}

        }

    }

    static async updateFood (id, name, dietry, allergen, currentMenu, type) {
        try {
            const updateFood = await allergy.updateOne(
                {_id: ObjectId(id)}, 
                {$set: {
                    name: name,
                    diets: dietry,
                    allergyInfo: allergen,
                    currentMenu: currentMenu,
                    type: type
                        }
                    })
                    return updateFood
        } catch(e) {
            console.error(`unable to update document: ${e}`)
            return {error: e}

        }
        
    }

    static async deleteFood(id) {
        try {
            const deleteFood = await allergy.deleteOne(
                {_id: ObjectId(id)}
            )
            return deleteFood
        } catch(e) {
            console.error(`unable to delete document: ${e}`)
            return {error: e}
        }
    }



}