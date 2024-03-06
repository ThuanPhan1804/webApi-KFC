import instance from "./customAxios"
export const getPromotionPercent = (code) => {
   return instance.get(`/api/Promotions/${code}`);
}
export const postPromotion = (data) => {
   return instance.post(`/api/Promotions?name=${data.name}&description=${data.description}&percent=${data.percent / 100}`);
}
export const getAllPromotion = () => {
   return instance.get(`/api/Promotions`);
}
export const deletePromotion = (code) => {
   return instance.delete(`/api/Promotions/${code}`);
}
export const putPromotion = (data) => {
   return instance.put(`/api/Promotions/${data.id}?name=${data.name}&description=${data.description}&percent=${data.percent / 100}`);
}