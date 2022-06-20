import { query } from "express";
import BlogDAO from "../dao/blogDAO.js";

export default class BlogController{

    static async apiGetBlog(req, res, next) {
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if (req.query.name) {
            filters.name = req.query.name
        }

        

        const { blogList, totalNumBlog } = await BlogDAO.getBlogs({
            filters,
            page,
        })
        let response = {
            blogs: blogList,
            page: page,
            filters: filters,
            total_results: totalNumBlog
        }
        res.json(response)


    }

    static async apiPostBlog(req, res, next) {
        const blogTitle = req.body.title
        const blogContent = req.body.content
        const dateAdded = new Date()
        const tags = []
        let blogImage = ""
        try {
            blogImage = req.file.originalname

        } catch (e) {
            console.error(e, blogImage);
        }

        const blogCreate = await BlogDAO.addBlog(
            blogTitle,
            blogContent,
            dateAdded,
            blogImage,
            tags
        ).catch(err => console.error(err, `Unable to create blog, error in submit`))
        res.json({ status: "success"})

    } catch (e){
        res.status(500).json({ error: e.message})
    }

    static async apiUpdateBlog(req, res, next) {
        try{
        const blogId = req.body.blog_id
        const blogContent = req.body.content

        const blogResponce = await BlogDAO.updateBlog(
            blogId,
            blogContent
        )
        res.json({status: "success"})

        } catch (e) {
            res.status(500).json({error: e.message})
        }
    }

    static async apiDeleteBlog(req, res, next){
        try {
            const blogId = req.query.id
            console.log(blogId);

            const deleteResponce = await BlogDAO.deleteBlog(
                blogId,
            )
            res.json({status: "success"})

        }  catch (e) {
            res.status(500).json({error: e.message})
        }
    }

}
