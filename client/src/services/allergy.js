import http from "../http-common"


class AllergyDataService {
    getAllAllergy(){
        return http.get("/allergy")
    }
    get(id){
        return http.get(`/allergy?id=${id}`)
    }

    createFoodItem(data, token){
        http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return http.post("/allergy", data)
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
        return http.get(`/allergy?${string}`);
      } 

    updateFoodItem(data, token) {
        http.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        return http.put("/allergy", data)
    }

    deleteFoodItem(id, token) {
        // const axiosConfig = {headers: {Authorisation = `Bearer ${token}`}}
        http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return http.delete(`/allergy?id=${id}`)
    }

    sendSelected(data) {
        console.log(data);
        return http.post("/download", data)
    }
    downloadSelected() {
        return http.get("/download", {responseType: "blob"});
    }
}

export default new AllergyDataService;