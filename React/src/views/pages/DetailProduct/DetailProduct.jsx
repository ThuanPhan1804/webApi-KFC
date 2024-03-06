import { Container } from "react-bootstrap";
import "./DetailProduct.scss";
import { useParams } from "react-router-dom";
import { getProduct } from "../../../services/productService";
import { useContext, useEffect, useState } from "react";
import CommentComponent from "../../../components/DetailProduct/Comment";
import { Button } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus,faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import "semantic-ui-css/semantic.min.css";
import { addCart,getCart } from "../../../services/cartService";
import { ActiveContext } from "../../App";
import { useNavigate } from "react-router-dom";
const DetailProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [showCommentComponent, setShowCommentCoponent] = useState(false);
  const [quantity,setQuantity] = useState(0)
  const [priceProduct,setPriceProduct] = useState(0)
  const {setCart} = useContext(ActiveContext)
  useEffect(() => {
    getDetailProduct();
  }, []);
  const getDetailProduct = async () => {
    const result = await getProduct(id);
    if (result) {
      setProduct(result);
      setPriceProduct(result.price.toLocaleString("Vn-vi"))
    }
  };
  const handleAddCart = async() =>{
    const result = await addCart({
      userId : localStorage.getItem("userId"),
      productId: id,
      quantity
    })
    if(result){
      let quantityCart = await getCart(localStorage.getItem("userId"));
      setCart(quantityCart);
      navigate("/cart")
    }
  }
  return (
    <>
      <div className="detail-product">
        <div className="detail-product-left">
          <img
            src={`https://localhost:7082/images/product/${product.image}`}
          />
        </div>
        <div className="detail-product-right">
          <div className="detail-card-product">
            <Container>
              <div className="card-title">
                <h5>{product.name}</h5>
                <p>{product.description}</p>
              </div>
              <hr></hr>
              <div className="card-price d-flex align-items-center ">
                <h5 className="price my-0">Giá tiền: </h5>
                <h5 className="my-0 mx-2">{priceProduct}VNĐ</h5>
              </div>
              <hr></hr>
              <div className="action-detail d-flex justify-content-between">
              <div className="detail-product-action">
          <FontAwesomeIcon icon={faCircleMinus} onClick={()=>{
            if(quantity > 0){
              setQuantity(prev=>prev - 1)

            }
          }}/>
          <p className="quantity">{quantity}</p>
          <FontAwesomeIcon icon={faCirclePlus} onClick={()=>{
            setQuantity(prev=>prev + 1)
          }}/>
          </div>
              <Button disabled = {quantity > 0 ? "" : "disabled"} onClick={handleAddCart}>Thêm Vào Giỏ ({(product.price * quantity).toLocaleString("Vn-vi")}VNĐ)</Button>
              </div>
            </Container>
          </div>
        </div>
      </div>
      <Container className={showCommentComponent ? `d-none` : `d-block my-4`}>
        {" "}
        <Button className="watch-comment" content='Xem đánh giá' labelPosition='left' icon='edit' primary onClick={()=>{
            setShowCommentCoponent(true)
      }}/>
      </Container>
      <Container>
        {showCommentComponent && <CommentComponent productId={product.id} setShowCommentComponent={setShowCommentCoponent}/>}
      </Container>
      
    </>
  );
};
export default DetailProduct;
