import axios from "axios";
const instance = axios.create({
    baseURL: "https://localhost:7082"
})
instance.interceptors.response.use((res)=>{
    return res.data ? res.data : res;
})
export default instance;