import { useState, useEffect } from "react";
import "./EditPromotion.scss";
import { Button, Container, Form, Row } from "react-bootstrap";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { Col } from "react-bootstrap";
import { register } from "../../../../services/userService";
import { useNavigate } from "react-router-dom";
import { type } from "@testing-library/user-event/dist/type";
import { postPromotion, putPromotion } from "../../../../services/promotionService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const EditPromotion = ({ data, getListPromotion, setShowModal }) => {
  const navigation = useNavigate();
  const [dataPromotion, setDataPromotion] = useState({
    id:data.id,
    name: data.name,
    description: data.description,
    percent: data.percent,
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
  const handleEdit = async (e) => {
    const result = await putPromotion(dataPromotion);
    console.log(result);
    if (result) {
      getListPromotion();
      setShowModal(false);
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
      <div className="edit-promotion">
        <div className="edit-promotion-right">
        <div className="heading-modal">
        <h1 className="title-edit-promotion">Sửa khuyến mãi</h1>
          <div
              className="btn-close-modal"
              onClick={() => setShowModal(false)}
            >
              <FontAwesomeIcon style={{ fontSize: "30px" }} icon={faClose} />
            </div>
        </div>
          
          <div className="add-card-Promotion">
            <Form encType="multipart/form-data">
              <Form.Group className="mb-2 col-right ">
                <Form.Label htmlFor="name">Tên khuyến mãi</Form.Label>
                <Form.Control
                defaultValue={data.name}
                  type="name"
                  id="name"
                  name="name"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-2 col-sm-12">
                <Form.Label htmlFor="description">Mô tả</Form.Label>
                <Form.Control
                defaultValue={data.description}

                  type="text"
                  id="description"
                  name="description"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-2 col-sm-12">
                <Form.Label htmlFor="percent">Phần trăm giảm giá</Form.Label>
                <Form.Control
                defaultValue={data.percent * 100}
                  type="text"
                  id="percent"
                  name="percent"
                  onChange={handleChange}
                />
              </Form.Group>
              <Button
                className="edit"
                onClick={handleEdit}
                disabled={checkValidate() ? "" : "disabled"}
              >
                Sửa
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditPromotion;
