import { useEffect, useState } from "react";
import CardProduct from "./CardProduct";
import "./ListProduct.scss";
import { getWishListByUser } from "../../services/wishListService";
const ListProduct = ({ products,typeSearch }) => {
  const [cart, setCart] = useState(
    localStorage.getItem("cart") ? localStorage.getItem("cart") : []
  );

  return (
    <>
      {products.length > 0 && (
        <>
          <h1 className={typeSearch === 1 ? `category`:'d-none'}>{products[0].category?.name ? products[0].category.name : ""}</h1>
          <div className="row">
            {products &&
              products.length > 0 &&
              products.map((product, index) => {
                return (
                  <CardProduct
                    key={index}
                    cart={cart}
                    setCart={setCart}
                    product={product}
                  />
                );
              })}
          </div>
        </>
      )}
    </>
  );
};
export default ListProduct;
