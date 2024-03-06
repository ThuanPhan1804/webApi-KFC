import instance from "./customAxios";
export const getCart = (userId) =>{
    return instance.get(`/api/Carts/userId?userId=${userId}`)
}
export const addCart = (data) =>{
    return instance.post(`/api/Carts?userId=${data.userId}&id=${data.productId}&quantity=${data.quantity}`)
}
