import { useEffect, useState } from "react";
import CardCart from "../../components/CardCart/CardCart";
import CardPay from "../../components/CardCart/CardPay";
import "./Cart.scss";
import { getCart } from "../../services/cartService";
import { ActiveContext } from "../App";
import { useContext } from "react";
const Cart = () => {
  const {cart,setCart} = useContext(ActiveContext)
  useEffect(()=>{
  getCartUser()
  },[])
  const getCartUser = async()=>{
    const userId = localStorage.getItem("userId");
    const result = await getCart(userId)
    if(result){
      setCart(result);
    }
  }
  return (
    <>
      <div className="container">
        <h2>Giỏ hàng của bạn</h2>
        <div className="cart ">
          <div className="cart-left">
          {cart && cart.length > 0 && cart.map((item,index)=>{
            return(
              <CardCart cart={item} setCart={setCart}/>
            )
          })}
          </div>
          <div className="cart-right">
            <CardPay cart={cart}/>
          </div>
        </div>
      </div>

    </>
  );
};
export default Cart;
