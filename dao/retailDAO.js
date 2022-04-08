import { ObjectId } from "mongodb"

let retail

export default class RetailDAO {
    static async injectDB(conn){
        if (retail) {
            return
        }
        try {
            retail = await conn.db(process.env.PORTFO_NS).collection("retail") 
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in retailDAO: ${e}`)        
        }
    }

    static async getItems({
        filters = null,
        page = 0,
        } = {}) {
        let query = {}
        if (filters) {
        if ("name" in filters) {
            query = {$text: {$search: filters["name"]} } 
        } else if ("id" in filters) {
            // console.log(filters)
            query = {_id: ObjectId(filters.id)}
        } else {
            query = filters
        }
      }
    let cursor

    try {
        console.log("Current Query", query)
        cursor = await retail
        .find(query)
    } catch (e) {
        console.error(`unable to find command, ${e}`)
        return { retailList: [], totalNumItems: 0}
    }

    try {
        const retailList = await cursor.toArray()
        const totalNumItems = page === 0 ? await retail.countDocuments(query) : 0
        return { retailList, totalNumItems }
    } catch (e) {
        console.error(
            `unable to convert cursor to array or problem counting docs, ${e}`
        )
        return { retailList: [], totalNumItems: 0}
    }

    }


    static async addCinemaStock (cinema, items, stockRooms, dateAdded) {
        try {
            const retailDoc = {
                cinema: cinema,
                items: items,
                stockRooms,
                dateAdded: dateAdded,
            }
            return await retail.insertOne(retailDoc)
        }
        catch (e) {
            console.error(`unable to add document : ${e}`)
            return {error: e}
            }
        }

        static async updateRetail (id, cinema, items, stockRooms, dateAdded) {
            try {
                const updateRetail = await retail.updateOne(
                    {_id: ObjectId(id)}, 
                    {$set: {
                        cinema: cinema,
                        items: items,
                        stockRooms: stockRooms,
                        dateAdded: dateAdded
                                }
                        })
                        return updateRetail
            } catch(e) {
                console.error(`unable to update document: ${e}`)
                return {error: e}
    
            }
        }

        static async deleteRetail(id) {
            try {
                const deleteRetail = await retail.deleteOne(
                    {_id: ObjectId(id)}
                )
                return deleteRetail
            } catch(e) {
                console.error(`unable to delete document: ${e}`)
                return {error: e}
            }
        }

        static async getShortDates({
            filters = null,
            page = 0,
            } = {}) {
            let query = {}
            if (filters) {
            if ("name" in filters) {
                query = {$text: {$search: filters["name"]} } 
            } else if ("id" in filters) {
                // console.log(filters)
                query = {_id: ObjectId(filters.id)}
            } else {
                query = filters
            }
          }
        let cursor
    
        try {
            console.log("Current Query", query, filters)
            cursor = await retail
            .find(query)
        } catch (e) {
            console.error(`unable to find command, ${e}`)
            return { retailList: [], totalNumItems: 0}
        }
    
        try {
            const retailList = await cursor.toArray()
            let htmlTable = "<table><tr><th>Item</th><th>Exp Date</th><th>Location</th></tr>"
            const today = new Date()
            const futurePeriod = new Date() + 1814400000
            
            const itemsToCheck = retailList[1].items
            itemsToCheck.forEach(element => {
                const itemDate = new Date(element.expDate[0])
                // console.log(`item Date: ${itemDate}`) //Debug Line 
                if (itemDate < today || itemDate < futurePeriod) {
                    // console.log(`item is out of date: ${element.Item}`) //Debug Line
                    const htmlRow = "<tr><td>" + element.Item + "</td><td>" + itemDate.toDateString() + "</td><td>" + element["Stock Location"] + "</td></tr>"
                    htmlTable += htmlRow
                    return
                }                                                
            });
            console.log(`Completed checking items`)
            return htmlTable 
        } catch (e) {
            console.error(
                `unable to convert cursor to array or problem counting docs, ${e}`
            )
            return { retailList: [], totalNumItems: 0}
        }
    
        }
    
            
    
}