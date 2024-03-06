import "./CardPay.scss";
import { Form,Button } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { ActiveContext } from "../../views/App";
import { getPromotionPercent } from "../../services/promotionService";
import ModalPay from "./ModalPay";
import { addInvoices } from "../../services/invoicesService";
import { useNavigate } from "react-router-dom";
const CardPay = ({cart}) => {
const [quantity,setQuantity] = useState(0);
const navigate = useNavigate();
const [promotion,setPromotion] = useState(false);
const [codePromotion,setCodePromotion] = useState("");
const [percent,setPercent] = useState(1);
const [price,setPrice] = useState(0);
const [priceNoPromotion,setPriceNoPromotion] = useState(0);
const [showModal,setShowModal] = useState(false);
const {setCart} = useContext(ActiveContext);
  const handleOnBlur = (e) => {
    if(e.target.value.split(" ").join("") === ""){
        console.log(e.target.value.split(" ").join(""));
        e.target.classList.remove("input-promotion-focused")
    }
  };
  const handleAddPromotion = async (e) =>{
    const result = await getPromotionPercent(codePromotion)
    if(result !== 0 && typeof(result) == "number" && !promotion){
      setPercent(result);
      setPrice(price*percent)
      setPromotion(true);
    }
    else{
      return;
    }
  }
  const handleChange = (e) =>{
    setCodePromotion(e.target.value)
  }
  const handleOrder = async(e) =>{
    const data = {
      userId:localStorage.getItem("userId"),
      phone:localStorage.getItem("phone"),
      address:localStorage.getItem("address"),
      promotion:codePromotion
    }
    await addInvoices(data);
    navigate("/menu")
    setCart([]);
  }
  useEffect(()=>{
    try{
      const quantityCart = cart.map((item)=>item.quantity)
      const sumQuantityCart = quantityCart.reduce((total,number)=>{return total+number},0)
      setQuantity(sumQuantityCart);
      const totalPriceEachProduct = cart.map(item=>{
        return item.product.price * item.quantity
      })
      const sumPrice = totalPriceEachProduct.reduce((total,number)=>{
        return total + number;
      })
      setPriceNoPromotion(sumPrice);
      setPrice(sumPrice);
    }
   catch(e){
    console.log(e);
   }
   return () => {};

  },[cart])
  return (
    <div className="card-pay">
      <div className="quantity-products">
        <h2>{quantity} món</h2>
      </div>
      <hr/>
      <div className="promotion">
        <h4>Bạn có mã giảm giá...</h4>
        <Form.Group
          className="mb-3 div-input-promotion"
          controlId="formBasicpromotion"
        >
          <Form.Control
            className="input-promotion"
            name="promotion"
            type="promotion"
            onBlur={handleOnBlur}
            value={codePromotion}
            onClick={(e)=>{
              e.target.classList.add("input-promotion-focused")
            }}
            onChange={handleChange}
          />
          <span className="span-promotion">
            <Form.Label className="label-promotion"   >
              Nhập mã giảm giá...
            </Form.Label>
          </span>
          <Button className="btn-promotion btn-secondary" onClick={handleAddPromotion}>Áp dụng</Button>
        </Form.Group>
        <hr></hr>
        <div className="price-no-promotion">
          <p>Giá tiền</p>
          <p>{priceNoPromotion.toLocaleString("vi-VN")}VNĐ</p>
        </div>
        <div className="price-promotion">
          <p>Tổng tiền</p>
          <p>{!promotion ? `${priceNoPromotion.toLocaleString("vi-VN")}VNĐ` : `${((1 - percent) * price).toLocaleString("vi-VN")}VNĐ`}</p>
        </div>
      </div>
      <hr/>
      <div className="booking">
        <Button className="btn-booking" onClick={handleOrder}>Đặt hàng</Button>
      </div>
    </div>
  );
};
export default CardPay;
