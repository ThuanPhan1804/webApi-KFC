import { Card, Button } from "react-bootstrap";
import "./CardProduct.scss";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { faXbox } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addCart } from "../../services/cartService";
import { getCart } from "../../services/cartService";
import { ActiveContext } from "../../views/App";
import { useNavigate } from "react-router-dom";
import { deleteWishListByUser, postWishListByUser } from "../../services/wishListService";
import { toast } from "react-toastify";
const CardProduct = ({ product }) => {
  const price = product.price.toLocaleString("vi-VN");
  const navigate = useNavigate();
  const [showDescription, setShowDescription] = useState(false);
  const { wishLists, setCart, getWishList } = useContext(ActiveContext);
  const userId = localStorage.getItem("userId");
  const [isWishList, setIsWishList] = useState(false);
  const handleAddCart = async (id) => {
    if (localStorage.getItem("account")) {
      if (!localStorage.getItem("phone") && !localStorage.getItem("address")) {
        navigate("/delivery");
      } else {
        let dataCart = {
          userId,
          productId: id,
          quantity: 1,
        };
        const result = await addCart(dataCart);
        if (result) {
          let result = await getCart(userId);
          setCart(result);
        }
      }
    } else {
      navigate("/account");
    }
  };
  const handleWishList = async () => {
    if(localStorage.getItem("account")){
      const data = {
        productId: product.id,
        userId,
      };
      try {
        if(!isWishList){
          const result = await postWishListByUser(data);
          if (result) {
            getWishList();
          };
        }
        else{
          const result = await deleteWishListByUser(data);
          if (result) {
            getWishList();
          };
        }
        
      } catch (e) {
        toast.error("Đã xảy ra lỗi vui lòng thử lại!")
      }
    }
    else{
      navigate("/account")
    }
  
  };
  useEffect(() => {
    let isWishList = wishLists.find((obj) => obj.product.id == product.id);
    setIsWishList(!!isWishList);
    return () => {};
  });
  const handleDetailProduct = () => {};
  return (
    <div className="card-product col-lg-3 col-md-4 col-sm-6">
      <div
        className="icon-description"
        onClick={() => {
          setShowDescription(!showDescription);
        }}
      >
        <FontAwesomeIcon
          icon={showDescription ? faXbox : faExclamation}
          style={{ color: "#000000" }}
        />
      </div>
      <div
        className="description"
        style={showDescription ? { zIndex: 1, opacity: 1 } : {}}
      >
        {product.description}
      </div>
      <div
        className="card-img"
        onClick={handleDetailProduct}
        style={showDescription ? { opacity: 0 } : {}}
      >
        <Link to={`/detail-product/${product.id}`}>
          <img
            src={
              `https://localhost:7082/images/product/${product.image}` ||
              `/images/Combo/${product.image}` ||
              `/images`
            }
          />
        </Link>
      </div>
      <Card.Body style={showDescription ? { opacity: 0 } : {}}>
        <div className="card-detail-title">
          <p className="card-title">{product.name}</p>
          <p className="card-price">
            {price}
            <u>đ</u>
          </p>
        </div>

        <Card.Text onClick={() => setShowDescription(true)}>
          {product.description}
        </Card.Text>
        <div className="card-action">
          <Button onClick={() => handleAddCart(product.id)}>Thêm</Button>
          <div className="btn-heart" onClick={()=>handleWishList()}>
            <FontAwesomeIcon
              icon={isWishList ? faHeartSolid : faHeartRegular}
              style={isWishList ? { color: "#e4002b" } : {}}
              
            />
          </div>
        </div>
      </Card.Body>
    </div>
  );
};
export default CardProduct;
