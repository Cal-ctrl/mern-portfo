import http from "../http-common"

class MediaDataService {
    getAll() {
        return http.get(`api/v1/projects/media`)
    }

    createMedia(mediaFormData) {
         return http.post("api/v1/projects/media", mediaFormData)
    }

    updateMedia(id, mediaFromData) {
        return http.put(`api/v1/projects/media?id=${id}`, mediaFromData)
    }

    deleteMedia(id){
        return http.delete(`api/v1/projects/media?id=${id}`)
    }
}


export default new MediaDataService;