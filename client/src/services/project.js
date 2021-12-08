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

    updateProject(data, token) {
        http.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        return http.put("/api/v1/projects/projects", data)
    }

    deleteProject(id) {
        return http.delete(`/api/v1/projects/projects?id=${id}`)
    }
    getSnakeGame() {
        return http.get(`/snake`)
    }
}

export default new ProjectDataService;