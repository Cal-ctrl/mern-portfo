import http from "../http-common"


class ProjectDataService {
    getAll() {
        return http.get()
    }

    find(query, by = "name") {
        return http.get(`?${by}=${query}`)
    }

    createProject(data){
        return http.post("/projects", data)
    }

    updateProject(data) {
        return http.put("/projects", data)
    }

    deleteProject(id) {
        return http.delete(`/projects?id=${id}`)
    }
}

export default new ProjectDataService;