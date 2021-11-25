import http from "../http-common"

class ContactDataService {
    
    createMessage(data){
        return http.post("/api/v1/projects/contact",data)

    }
}

export default new ContactDataService