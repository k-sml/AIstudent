import axios from "axios"

const apiClient = axios.create({ 
    baseURL:"http://localhost:8000",
    headers:{
        "Content-Type":"application/json",//json形式で送るため`
    },
})

export default apiClient