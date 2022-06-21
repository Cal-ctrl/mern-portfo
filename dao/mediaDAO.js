import { ObjectId } from "mongodb"

let media 

export default class MediaDAO {
    static async injectDB(conn) {
        if(media) {
            return
        }
        try {
            media = await conn.db(process.env.PORTFO_NS).collection("media") 
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in mediaDAO: ${e}`
            )
        }
    }

    static async getMedia({
        filters = null,
        page = 0,
    } = {}) {
        let query
        if (filters) {
        if ("name" in filters) {
            query = {$text: {$search: filters["name"]} } 
        }
      }
    let cursor

    try {
        cursor = await media
        .find(query)
    } catch (e) {
        console.error(`unable to find command, ${e}`)
        return { mediaList: [], totalNumMedia: 0}
    }

    try {
        const mediaList = await cursor.toArray()
        const totalNumMedia = page === 0 ? await media.countDocuments(query) : 0
        return { mediaList, totalNumMedia }
    } catch (e) {
        console.error(
            `unable to convert cursor to array or problem counting docs, ${e}`
        )
        return { mediaList: [], totalNumMedia: 0}
    }

    }

    static async addMedia(title, review, dateAdded, score) {
        try {
            const mediaDoc = {
                title: title,
                review: review,
                date: dateAdded,
                score: score
            }
            return await media.insertOne(mediaDoc)
        } catch (e) {
            console.error(`unable to create media ${e}`)
            return {error: e}

        }
    }

    static async updateMedia(id, review, score) {
        try{
            const mediaUpdate = await media.updateOne(
                {_id: ObjectId(id)},
                { $set: {
                    review: review,
                    score: score
                    }
                    },
            )
            return mediaUpdate

        } catch (e) {
            console.error(`unable to update media ${e}`)
            return {error: e}

        }
    }

    static async deleteMedia(id) {
        try {
            const mediaDelete = await media.deleteOne(
                {_id: ObjectId(id)}
            )
            return mediaDelete
        } catch (e) {
            console.error(`unable to delete media ${e}`)
            return {error: e}

        }
    }

    
}