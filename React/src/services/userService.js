import instance from "./customAxios";
export const login = (data) =>{
    return instance.post(`/api/Users/login?Username=${data.username}&Password=${data.password}`);
 }
 export const register = (data) =>{
    return instance.post(`/api/Users/register?Username=${data.username}&Password=${data.password}&Email=${data.email}&PhoneNumber=${data.numberPhone}`);
 }
 export const getDataUser = (id) =>{
   return instance.get(`/api/Users/CheckUser?Id=${id}`);
}
export const putAccount = (data,id) =>{
   return instance.put(`/api/Users/${id}?Name=${data.username}&Email=${data.email}&Phone=${data.numberPhone}`)
}
export const deleteAccount = (id) =>{
   return instance.delete(`/api/Users/${id}`)
}