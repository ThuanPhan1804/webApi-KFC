import { useState, useEffect } from "react";
import "./EditAccount.scss";
import { Button, Container, Form, Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { putAccount } from "../../../../services/userService";
import { useNavigate } from "react-router-dom";
import { faClose } from "@fortawesome/free-solid-svg-icons";
const EditAccount = ({ data, getListAccount, setShowModal }) => {
  const navigation = useNavigate();
  const [accountDetail, setAccountDetail] = useState({});
  const [dataAccount, setDataAccount] = useState({
    email: data.email,
    username: data.userName,
    numberPhone: data.phoneNumber,
    password: data.password,
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDataAccount({
      ...dataAccount,
      [name]: value,
    });
    console.log(dataAccount);
  };
  useEffect(() => {
    return () => {};
  });
  const handleEdit = async (e) => {
    const result = await putAccount(dataAccount,data.id);
    console.log(result);
    if (result) {
      getListAccount();
      setShowModal(false);
    }
  };

  return (
    <>
      <div className="edit-account">
        <div className="edit-account-right">
          <div className="heading-account justify-content-between">
            <h1 className="title-edit-account">Sửa tài khoản</h1>
            <div
              className="btn-close-modal"
              onClick={() => setShowModal(false)}
            >
              <FontAwesomeIcon style={{ fontSize: "30px" }} icon={faClose} />
            </div>
          </div>
          <div className="edit-card-account">
            <Form encType="multipart/form-data">
              <Form.Group className="mb-2 col-right ">
                <Form.Label htmlFor="name">Tên tài khoản</Form.Label>
                <Form.Control
                defaultValue={data.userName}
                  type="name"
                  id="username"
                  name="username"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-2 col-sm-12">
                <Form.Label htmlFor="price">Mật khẩu</Form.Label>
                <Form.Control
                  type="password"
                  id="password"
                  name="password"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-2 col-sm-12">
                <Form.Label htmlFor="price">Số điện thoại</Form.Label>
                <Form.Control
                defaultValue={data.phoneNumber}
                
                  type="text"
                  id="numberPhone"
                  name="numberPhone"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-2 ">
                <Form.Label htmlFor="description">Email</Form.Label>
                <Form.Control id="email" name="email" onChange={handleChange}  defaultValue={data.email}/>
              </Form.Group>
              <Button className="edit" onClick={handleEdit}>
                Sửa
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditAccount;
