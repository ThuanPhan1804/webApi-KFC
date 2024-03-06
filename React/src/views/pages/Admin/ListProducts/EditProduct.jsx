import "./EditProduct.scss";
import { useState, useEffect } from "react";
import "./AddProduct.scss";
import { Button, Container, Form, Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { postProduct, putProduct } from "../../../../services/productService";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
const EditProduct = ({ data, getListProduct, setShowModal }) => {
  const navigation = useNavigate();
  const [dataProduct, setDataProduct] = useState({
    id: data.id,
    name: data.name,
    price: data.price,
    description: data.description,
    imageName: data.image,
    status: data.status,
    categoryId: data.categoryId,
  });
  const [imageFile, setImageFile] = useState();
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
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(imageProduct);
    };
  }, [imageProduct]);
  function handleFileImage(e) {
    try {
      const file = e.target.files[0];
      if (e.target.files[0]) {
        setDataProduct({
          ...dataProduct,
          imageName: e.target.files[0].name.split(".")[0],
        });
        setImageFile(file);
      }
      let preview = URL.createObjectURL(file);
      setImageProduct(preview);
    } catch (e) {
      console.log(e);
    }
  }
  const handleEdit = async (e) => {
    const data = new FormData();
    data.append("imageFile", imageFile);
    const result = await putProduct(dataProduct, data);
    console.log(result);
    if (result) {
      getListProduct();
      setShowModal(false);
    }
  };

  return (
    <>
      <div className="edit-product">
        <div className="edit-product-right">
          <div className="edit-product-header d-flex justify-content-between">
            <h1 className="title-edit-product">Sửa sản phẩm</h1>
            <div
              className="btn-close-modal"
              onClick={() => setShowModal(false)}
            >
              <FontAwesomeIcon style={{ fontSize: "30px" }} icon={faClose} />
            </div>
          </div>

          <div className="edit-card-product">
            <Form encType="multipart/form-data">
              <Row className="row-form-edit-product">
                <div className="edit-form-product-left col-left">
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
                    defaultValue={data.name}
                    type="name"
                    id="name"
                    name="name"
                    onChange={handleChange}
                  />

                  <Form.Group className="mb-2 col-sm-12">
                    <Form.Label htmlFor="price">Giá tiền</Form.Label>
                    <Form.Control
                      defaultValue={data.price}
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
                  defaultValue={data.description}
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
                  defaultValue={data.status}
                >
                  <option value={true}>Còn hàng</option>
                  <option value={false}>Hết hàng</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-2 mt-3 col-12">
                <Form.Select
                  aria-label="Default select example"
                  onChange={handleChange}
                  name="categoryId"
                  defaultValue={data.categoryId}
                >
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
              <Button className="edit btn-warning" onClick={handleEdit}>
                Sửa
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditProduct;
