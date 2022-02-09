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
        let query
        if (filters) {
        if ("cinema" in filters) {
            query = {$text: {$search: filters["cinema"]} } 
        }
      }
    let cursor

    try {
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
    
            
    
}