import http from "../http-common"


class AllergyDataService {
    getAllAllergy(){
        return http.get("/api/v1/projects/allergy")
    }
    get(id){
        return http.get(`/api/v1/projects/allergy?id=${id}`)
    }

    createFoodItem(data, token){
        http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return http.post("/api/v1/projects/allergy", data)
    }

    find(query, page = 0) {
        let string = ""

        const queries = Object.entries(query)
        queries.forEach(([k,v], i) => {
            const amountQueries = queries.length - 1
            const valueQuery = String(v).replace(/ /g, "%20");
            
        if (i === amountQueries) {
            string = string.concat(String(k), "=", valueQuery)
        } else {
            string = string.concat(String(k), "=", valueQuery,"&")
        }
        })
        console.log(string);
        return http.get(`/api/v1/projects/allergy?${string}`);
      } 

    updateFoodItem(data, token) {
        http.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        return http.put("/api/v1/projects/allergy", data)
    }

    deleteFoodItem(id, token) {
        // const axiosConfig = {headers: {Authorisation = `Bearer ${token}`}}
        http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return http.delete(`/api/v1/projects/allergy?id=${id}`)
    }

    sendSelected(data) {
        console.log(data);
        return http.post("/api/v1/projects/download", data)
    }
    downloadSelected() {
        return http.get("/api/v1/projects/download", {responseType: "blob"});
    }
}

export default new AllergyDataService;