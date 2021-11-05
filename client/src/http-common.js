import axios from "axios"

export default axios.create({
    baseURL: "https://myportfoapp.herokuapp.com/",
    headers:{
        "Content-type": "application/json"
    }
})
