import axios from "axios"

export default axios.create({
    baseURL: "https://myportfoapp.herokuapp.com", //Production environment
    // baseURL: "http://localhost:5000/", //Testing environment
    headers:{
        "Content-type": "application/json"
    }
})
