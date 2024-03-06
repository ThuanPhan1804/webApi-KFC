
import instance from "./customAxios"
export const getWishListByUser = (id) => {
   return instance.get(`https://localhost:7082/api/WishLists/UserWishLists?userId=${id}`);
}
export const postWishListByUser = (data) => {
    return instance.post(`https://localhost:7082/api/WishLists/?UserId=${data.userId}&productid=${data.productId}`);
 }
 export const deleteWishListByUser = (data) => {
    return instance.delete(`https://localhost:7082/api/WishLists/?UserId=${data.userId}&productid=${data.productId}`);
 }
 