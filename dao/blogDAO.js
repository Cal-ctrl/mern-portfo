import { ObjectId } from "mongodb"

let blog 

export default class BlogDAO {
    static async injectDB(conn) {
        if(blog) {
            return
        }
        try {
            blog = await conn.db(process.env.PORTFO_NS).collection("blogs") 
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in blogDAO: ${e}`
            )
        }
    }

    static async getBlogs({
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
        cursor = await blog
        .find(query)
    } catch (e) {
        console.error(`unable to find command, ${e}`)
        return { blogList: [], totalNumBlog: 0}
    }

    try {
        const blogList = await cursor.toArray()
        const totalNumBlog = page === 0 ? await blog.countDocuments(query) : 0
        return { blogList, totalNumBlog }
    } catch (e) {
        console.error(
            `unable to convert cursor to array or problem counting docs, ${e}`
        )
        return { blogList: [], totalNumBlog: 0}
    }

    }

    static async addBlog(title, content, dateAdded, blogImg, tags) {
        try {
            const blogDoc = {
                title: title,
                content: content,
                date: dateAdded,
                blogImg: blogImg,
                tags: tags
            }
            return await blog.insertOne(blogDoc)
        } catch (e) {
            console.error(`unable to create blog ${e}`)
            return {error: e}

        }
    }

    static async updateBlog(id, content, tags) {
        try{
            const blogUpdate = await blog.updateOne(
                {_id: ObjectId(id)},
                { $set: {
                    content: content,
                    tags: tags
                    }
                    },
            )
            return blogUpdate

        } catch (e) {
            console.error(`unable to update blog ${e}`)
            return {error: e}

        }
    }

    static async deleteBlog(id) {
        try {
            const blogDelete = await blog.deleteOne(
                {_id: ObjectId(id)}
            )
            return blogDelete
        } catch (e) {
            console.error(`unable to delete blog ${e}`)
            return {error: e}

        }
    }

    
}