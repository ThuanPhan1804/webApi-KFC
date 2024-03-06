import { useState, useEffect } from "react";
import "./AddPromotion.scss";
import { Button, Container, Form, Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { register } from "../../../../services/userService";
import { useNavigate } from "react-router-dom";
import { type } from "@testing-library/user-event/dist/type";
import { postPromotion } from "../../../../services/promotionService";
const AddPromotion = () => {
  const navigation = useNavigate();
  const [dataPromotion, setDataPromotion] = useState({
    name: "",
    description: "",
    percent: 1,
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDataPromotion({
      ...dataPromotion,
      [name]: value,
    });

    console.log(isNaN(dataPromotion.percent));
  };
  useEffect(() => {
    return () => {};
  });
  const handleAdd = async (e) => {
    const result = await postPromotion(dataPromotion);
    console.log(result);
    if (result) {
      navigation("/admin/promotions");
    }
  };
  const checkValidate = () => {
    if (isNaN(dataPromotion.percent)) {
      return false;
    } else {
      return true;
    }
  };
  return (
    <>
      <div className="add-Promotion">
        <div className="add-Promotion-right">
          <h1 className="title-add-Promotion">Thêm khuyến mãi</h1>

          <div className="add-card-Promotion">
            <Form encType="multipart/form-data">
              <Form.Group className="mb-2 col-right ">
                <Form.Label htmlFor="name">Tên khuyến mãi</Form.Label>
                <Form.Control
                  type="name"
                  id="name"
                  name="name"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-2 col-sm-12">
                <Form.Label htmlFor="description">Mô tả</Form.Label>
                <Form.Control
                  type="text"
                  id="description"
                  name="description"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-2 col-sm-12">
                <Form.Label htmlFor="percent">Giá</Form.Label>
                <Form.Control
                  type="text"
                  id="percent"
                  name="percent"
                  onChange={handleChange}
                />
              </Form.Group>
              <Button
                className="add"
                onClick={handleAdd}
                disabled={checkValidate() ? "" : "disabled"}
              >
                Thêm
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddPromotion;
