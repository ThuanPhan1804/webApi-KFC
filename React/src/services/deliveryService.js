import axios from "axios"

export const getAddress = () =>{
    return axios.get(`https://provinces.open-api.vn/api/?depth=3`)
}

