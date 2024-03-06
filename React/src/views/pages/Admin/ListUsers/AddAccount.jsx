import { useState, useEffect } from "react";
import "./AddAccount.scss";
import { Button, Container, Form, Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { register } from "../../../../services/userService";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { toast } from "react-toastify";
const AddAccount = () => {
  const navigation = useNavigate();
  const [dataAccount, setDataAccount] = useState({
    email: "",
    username: "",
    numberPhone: "",
    password: "",
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

  const handleAdd =  _.debounce(async(e) => {
    try {
      const result = await register(dataAccount);
      console.log(result);
      if (result) {
        navigation("/admin/account");
      }
    } catch (e) {
      toast.error("Thông tin nhập sai định dạng hoặc đã tồn tại vui lòng nhập lại!", {
        autoClose: 1000,
        
      });
    }
  },1000);

  return (
    <>
      <div className="add-account">
        <div className="add-account-right">
          <h1 className="title-add-account">Thêm tài khoản</h1>

          <div className="add-card-account">
            <Form encType="multipart/form-data">
              <Form.Group className="mb-2 col-right ">
                <Form.Label htmlFor="name">Tên tài khoản</Form.Label>
                <Form.Control
                  type="name"
                  id="username"
                  name="username"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-2 col-sm-12">
                <Form.Label htmlFor="price">Mật khẩu</Form.Label>
                <Form.Control
                  type="text"
                  id="password"
                  name="password"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-2 col-sm-12">
                <Form.Label htmlFor="price">Số điện thoại</Form.Label>
                <Form.Control
                  type="text"
                  id="numberPhone"
                  name="numberPhone"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-2 ">
                <Form.Label htmlFor="description">Email</Form.Label>
                <Form.Control id="email" name="email" onChange={handleChange} />
              </Form.Group>
              <Button className="add" onClick={handleAdd}>
                Thêm
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddAccount;
