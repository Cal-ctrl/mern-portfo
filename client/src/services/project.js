import http from "../http-common"


class ProjectDataService {
    getAll() {
        return http.get(`/api/v1/projects`)
    }

    find(query, by = "name") {
        return http.get(`/api/v1/projects?${by}=${query}`)
    }

    createProject(data){
        return http.post("/api/v1/projects/projects", data)
    }

    updateProject(data) {
        return http.put("/api/v1/projects/projects", data)
    }

    deleteProject(id) {
        return http.delete(`/api/v1/projects/projects?id=${id}`)
    }
}

export default new ProjectDataService;