import instance from "./customAxios";
export const getAllAccount = () =>{
    return instance.get(`/api/Users`)
}