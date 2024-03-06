import instance from "./customAxios"
import axios from "axios";
export const getAllPromotion = () => {
   return instance.get(`/api/Products/OfCategory?categoryId=0`);
}
export const getAllNewProduct = () => {
   return instance.get(`/api/Products/OfCategory?categoryId=1`);
}
export const getAllComboForOne = () => {
   return instance.get(`/api/Products/OfCategory?categoryId=2`);
}
export const getAllComboForShare = () => {
   return instance.get(`/api/Products/OfCategory?categoryId=3`);
}
export const getAllChicken = () => {
   return instance.get(`/api/Products/OfCategory?categoryId=4`);
}
export const getAllBurger = () => {
   return instance.get(`/api/Products/OfCategory?categoryId=5`);
}
export const getAllSnack = () => {
   return instance.get(`/api/Products/OfCategory?categoryId=6`);
}
export const getAllDessert = () => {
   return instance.get(`/api/Products/OfCategory?categoryId=7`);
}
export const getAllProduct = () =>{
   return instance.get(`/api/Products`);
}
export const getAllProducts = () =>{
   return instance.get(`/api/Products`);
}
export const getProduct = (id) =>{
   return instance.get(`/api/Products/${id}`);
}
export const getProductByPrice = (search) =>{
   if(search.typeSearch === 2 || search.typeSearch === 3){
      console.log(search.typeSearch);
      return instance.get(`/api/Products/${search.typeSearch === 2 ? "upperprice" : "lowerprice"}?price=${search.price}`);
   }
   else return;
}
export const getProductPage = (page) =>{
   return instance.get(`/api/Products/page?page=${page}`);
}
export const postProduct = (data,image) =>{
   let config = {
      headers:{
         'Content-Type': 'multipart/form-data',
      }
   };
   return axios.post(`https://localhost:7082/api/Products?name=${data.name}&price=${data.price}&description=${data.description}&ImageName=${data.imageName}&Status=${data.status}&CategoryId=${data.categoryId}`,image,config);
}
// export const postProduct = (data) =>{  
//    return instance.post(`/api/Products`,data.fileImage);
// }
export const deleteProduct = (id) =>{
   return instance.delete(`https://localhost:7082/api/Products/${id}`);
}
export const putProduct = (data,image) =>{
   let config = {
      headers:{
         'Content-Type': 'multipart/form-data',
      }
   };
      return axios.put(`https://localhost:7082/api/Products?id=${data.id}&Name=${data.name}&Price=${data.price}&Description=${data.description}&ImageName=${data.imageName}&Status=${data.status}&CategoryId=${data.categoryId}`,image,config);
}
export const searchProduct = (name) =>{
   return instance.get(`/api/Products/search?search=${name === "" ? "null" : name}`)
}
