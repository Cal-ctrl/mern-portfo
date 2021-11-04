import axios from "axios"

export default axios.create({
    baseURL: "https://myportfoapp.herokuapp.com/api/v1/projects",
    headers:{
        "Content-type": "application/json"
    }
})
