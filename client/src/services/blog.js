import http from "../http-common"

class BlogDataService {
    getAll() {
        return http.get(`api/v1/projects/blog`)
    }

    createBlog(blogFormData) {
         return http.post("api/v1/projects/blog", blogFormData)
    }

    deleteBlog(id){
        return http.delete(`api/v1/projects/blog?id=${id}`)
    }
}


export default new BlogDataService;