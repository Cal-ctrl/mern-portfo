import http from "../http-common"


class RetailDataService {
    getAll() {
        return http.get(`/api/v1/projects/retail`)
    }

    find(query, by = "cinema") {
        return http.get(`/api/v1/projects/retail?${by}=${query}`)
    }

    createRetail(data){
        return http.post("/api/v1/projects/retail", data)
    }

    updateRetail(data) {
        return http.put("/api/v1/projects/retail", data)
    }

    deleteRetail(id) {
        return http.delete(`/api/v1/projects/retail?id=${id}`)
    }
}

export default new RetailDataService;