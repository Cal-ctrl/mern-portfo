import { query } from "express";
import MediaDAO from "../dao/mediaDAO.js";

export default class MediaController{

    static async apiGetMedia(req, res, next) {
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if (req.query.name) {
            filters.name = req.query.name
        }

        

        const { mediaList, totalNumMedia } = await MediaDAO.getMedia({
            filters,
            page,
        })
        let response = {
            media: mediaList,
            page: page,
            filters: filters,
            total_results: totalNumMedia
        }
        res.json(response)


    }

    static async apiPostMedia(req, res, next) {

        const mediaTitle = req.body.title
        const mediaReview = req.body.review
        const dateAdded = new Date()
        const score = req.body.score

        console.log(`Posting this information: `, req.body)

        const mediaCreate = await MediaDAO.addMedia(
            mediaTitle,
            mediaReview,
            dateAdded,
            score
        ).catch(err => console.error(err, `Unable to create media, error in submit`))
        res.json({ status: "success"})

    } catch (e){
        res.status(500).json({ error: e.message})
    }

    static async apiUpdateMedia(req, res, next) {
        try{
        const mediaId = req.body.media_id
        const mediaReview = req.body.review
        const mediaScore = req.body.score

        const mediaResponce = await MediaDAO.updateMedia(
            mediaId,
            mediaReview,
            mediaScore
        )
        res.json({status: "success"})

        } catch (e) {
            res.status(500).json({error: e.message})
        }
    }

    static async apiDeleteMedia(req, res, next){
        try {
            const mediaId = req.query.id
            console.log(mediaId);

            const deleteResponce = await MediaDAO.deleteMedia(
                mediaId,
            )
            res.json({status: "success"})

        }  catch (e) {
            res.status(500).json({error: e.message})
        }
    }

}
