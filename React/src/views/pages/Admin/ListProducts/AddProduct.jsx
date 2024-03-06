import { useState,useEffect } from "react";
import "./AddProduct.scss";
import { Button, Container, Form, Row } from "react-bootstrap";
import {Col} from "react-bootstrap";
import { postProduct } from "../../../../services/productService";
import { useNavigate } from "react-router-dom";
const AddProduct = () => {
  const navigation = useNavigate();
  const [dataProduct, setDataProduct] = useState({
    name: "",
    price: "",
    description: "",
    imageName: "",
    status: true,
    categoryId: "",
  });
  const [imageFile,setImageFile] = useState();
  const [imageProduct, setImageProduct] = useState("");
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDataProduct({
      ...dataProduct,
      [name]: value,
    });
    console.log(dataProduct);
  };
  useEffect(()=>{
    return ()=>{
    URL.revokeObjectURL(imageProduct);
    }
  },[imageProduct])
  function handleFileImage(e) {
    try{
      const file = e.target.files[0];
      if (e.target.files[0]) {
        setDataProduct({
          ...dataProduct,
          imageName: e.target.files[0].name.split(".").slice(0,-1).join("."),
        });
        setImageFile(file);
      }
      let preview = URL.createObjectURL(file);
      console.log(dataProduct);
      setImageProduct(preview);
    }
    catch(e){
      console.log(e);
    }
  
  }
  const handleAdd = async(e) =>{
    const data = new FormData()
    data.append("imageFile",imageFile);
    const result = await postProduct(dataProduct,data);
    console.log(result);
    if(result){
      navigation("/admin/products")
    }
  }

  return (
    <>
      <div className="add-product">
        <div className="add-product-left">
          <img
            src={
              !imageProduct
                ? `/images/default-image-product.webp`
                : imageProduct
            }
          ></img>
        </div>
        <div className="add-product-right">
          <h1 className="title-add-product">Thêm sản phẩm</h1>

          <div className="add-card-product">
            <Form encType="multipart/form-data">
              <Row className="row-form-add-product">
                  <div className="add-form-product-left col-left">
                    <img
                      src={
                        !imageProduct
                          ? `/images/default-image-product.webp`
                          : imageProduct
                      }
                    ></img>
                  </div>
                  <Form.Group className="mb-2 col-right ">
                    <Form.Label htmlFor="name">Tên món</Form.Label>
                    <Form.Control
                      type="name"
                      id="name"
                      name="name"
                      onChange={handleChange}
                    />

                    <Form.Group className="mb-2 col-sm-12">
                      <Form.Label htmlFor="price">Giá tiền</Form.Label>
                      <Form.Control
                        type="text"
                        id="price"
                        name="price"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Form.Group>
              </Row>

              <Form.Group className="mb-2 ">
                <Form.Label htmlFor="description">Mô tả</Form.Label>
                <Form.Control
                  as="textarea"
                  id="description"
                  name="description"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-2 col-12">
                <Form.Label htmlFor="file">Hình ảnh sản phẩm</Form.Label>
                <Form.Control
                  type="file"
                  id="file"
                  name="fileImage"
                  onChange={handleFileImage}
                />
              </Form.Group>
              <Form.Group className="mb-2 mt-3 col-12">
                <Form.Select
                  aria-label="Default select example"
                  onChange={handleChange}
                  name="status"
                >
                  <option>Trạng thái sản phẩm</option>
                  <option value={true}>Còn hàng</option>
                  <option value={false}>Hết hàng</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-2 mt-3 col-12">
                <Form.Select
                  aria-label="Default select example"
                  onChange={handleChange}
                  name="categoryId"
                >
                  <option>Danh mục sản phẩm</option>
                  <option value={0}>Ưu đãi</option>
                  <option value={1}>Món mới</option>
                  <option value={2}>Combo 1 người</option>
                  <option value={3}>Combo nhóm</option>
                  <option value={4}>Gà rán - Gà quay</option>
                  <option value={5}>Burger - Cơm - Mì Ý</option>
                  <option value={6}>Thức ăn nhanh</option>
                  <option value={7}>Thức uống và tráng miệng</option>
                </Form.Select>
              </Form.Group>
              <Button className="add" onClick={handleAdd}>Thêm</Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddProduct;
