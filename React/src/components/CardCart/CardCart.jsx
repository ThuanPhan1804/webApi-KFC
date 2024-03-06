import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus,faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { addCart,getCart } from "../../services/cartService";
import "./CardCart.scss"
import { useContext, useEffect, useState } from "react";
import { ActiveContext } from "../../views/App";
const CardCart = ({cart,setCart}) => {
  const userId = localStorage.getItem("userId");
  const handleAddCart = async(id) =>{
    let dataCart = {
      userId,
      productId:id,
      quantity:1
    }
    const result = await addCart(dataCart);
    if(result){
    getCartUser(userId)
    }
  };
  const getCartUser = async(userId) =>{
    let result = await getCart(userId);
    if(result){
      setCart(result);
    }
  }
  const handleSubtractCart = async(id)=>{
    const userId = localStorage.getItem("userId");
    let dataCart = {
      userId,
      productId:id,
      quantity:-1
    }
    const result = await addCart(dataCart);
    if(result){
    getCartUser(userId)
    }
  }
  return (
    <>
      <div className="card-cart">
        <div className="cart-img">
          <img src={`https://localhost:7082/images/product/${cart.product.image}`} />
        </div>
        <div className="cart-info">
          <h3>{cart.product.name}</h3>
          </div>
          <div className="card-cart-action">
          <div className="div-quantity">
          <FontAwesomeIcon icon={faCircleMinus} onClick={()=>handleSubtractCart(cart.product.id)}/>
          <p className="quantity">{cart.quantity}</p>
          <FontAwesomeIcon icon={faCirclePlus} onClick={()=>handleAddCart(cart.product.id)}/>
          </div>
          <p className="price">{cart.product.price.toLocaleString("vi-VN")}VNĐ</p>
          </div>
      </div>
    </>
  );
};
export default CardCart;
