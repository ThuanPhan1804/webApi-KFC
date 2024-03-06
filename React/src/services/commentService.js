import instance from "./customAxios";
export const getComments = (productId) =>{
    return instance.get(`/api/Comments/${productId}`)
}
export const postComment = (data) =>{
    return instance.post(`api/Comments?userId=${data.userId}&productId=${data.productId}&Content=${data.message}`)
}

export const deleteCommentById = (id) =>{
    return instance.delete(`api/Comments/${id}`)
}

