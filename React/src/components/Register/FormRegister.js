import { FormGroup } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  validateEmail,
  validatePassword,
  validateAddress,
  validatePhone,
  validateUsername,
} from "../../function/validateForm";
import { register,login } from "../../services/userService";
import "./FormRegister.scss";
import { useNavigate } from "react-router-dom";
const FormRegister = ({setShowFormRegister}) => {
  const navigate = useNavigate();
  const [isEyesOpen, setIsEyesOpen] = useState(false);
  const [messageError, setMessageError] = useState({
    messageErrorEmail: "",
    messageErrorNumberPhone: "",
    messageErrorPassword: "",

    // messageErrorAddress:"",
  });
  const [dataRegister, setDataRegister] = useState({
    username: "",
    password: "",
    email: "",
    numberPhone: "",
  });
  const handleChangeDataRegister = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDataRegister({ ...dataRegister, [name]: value });
    console.log(dataRegister);
  };
  const handleRegister = async () => {
    try{
      const result = await register(dataRegister);
      if(result){
        let resultLogin = await login({username: result.userName, password:dataRegister.password});
        if(resultLogin){
          localStorage.setItem("account",resultLogin.token);
          localStorage.setItem("userId",resultLogin.userId);
          navigate("/");
          window.location.reload(); 
        }
      }
    
  } catch (e) {
    toast.error("Thông tin nhập sai định dạng hoặc đã tồn tại vui lòng nhập lại!", {
      autoClose: 1000,
      
    });
  };}
  const handleOnBlur = (e) => {
    if (!validateUsername(e.target.value) && e.target.name === "username") {
      e.target.style.borderBottom = "2px solid red";
      setMessageError({
        ...messageError,
        messageErrorUsername:
          "Tên người dùng phải có ít nhất 7 ký tự, 1 chữ cái hoa và số",
      });
    } else if (e.target.name === "username") {
      e.target.style.borderBottom = "1px solid black";
      setMessageError({ ...messageError, messageErrorUsername: "" });
    } else if (
      !validatePassword(e.target.value) &&
      e.target.name === "password"
    ) {
      e.target.style.borderBottom = "2px solid red";
      setMessageError({
        ...messageError,
        messageErrorPassword:
          "Mật khẩu phải chứa ít nhất 6 ký tự, 1 chữ cái hoa và ký tự đặc biệt",
      });
    } else if (e.target.name === "password" && validatePassword(e.target.value)) {
      console.log(validatePassword(e.target.value));
      e.target.style.borderBottom = "1px solid black";
      setMessageError({ ...messageError, messageErrorPassword: "" });

    } 
    else if (!validateEmail(e.target.value) && e.target.name === "email") {
      e.target.style.borderBottom = "2px solid red";
      setMessageError({
        ...messageError,
        messageErrorEmail: "Vui lòng nhập địa chỉ email hợp lệ",
      });
    } 
    else if (e.target.name === "email") {
      e.target.style.borderBottom = "1px solid black";
      setMessageError({ ...messageError, messageErrorEmail: "" });
    } 
    else if (
      !validatePhone(e.target.value) &&
      e.target.name === "numberPhone"
    ) {
      e.target.style.borderBottom = "2px solid red";
      setMessageError({
        ...messageError,
        messageErrorNumberPhone: "Vui lòng nhập số điện thoại hợp lệ",
      });
    } 
    else if (e.target.name === "numberPhone") {
      e.target.style.borderBottom = "1px solid black";
      setMessageError({ ...messageError, messageErrorNumberPhone: "" });
    }
    // else if(!validateAddress(e.target.value) && e.target.name === "address"){
    //   console.log(!validateAddress(e.target.value));
    //   e.target.style.borderBottom = "2px solid red";
    //   setMessageError({...messageError,messageErrorAddress:"Vui lòng nhập địa chỉ hợp lệ"});
    // }
    // else if(e.target.name === "address"){
    //   e.target.style.borderBottom = "1px solid black";
    //   setMessageError({...messageError,messageErrorNumberPhone:""});
    // }
    if (e.target.value !== "") {
      return;
    } else {
      e.target.classList.remove("input-focused");
    }
  };
  const handleCheckValidate = () => {
    if (
      validateEmail(dataRegister.email) &&
      validatePassword(dataRegister.password) &&
      validateUsername(dataRegister.username) &&
      validatePhone(dataRegister.numberPhone)
    ) {
      console.log("haha");
      return true;
    } else {
      console.log("fail");
      return false;
    }
  };
  return (
    <>
      <Form className="form-register-account">
        <h1>ĐĂNG KÝ</h1>
        <Form.Group className="mb-3 div-input-email" controlId="formBasicEmail">
          <Form.Control
            className="input-register"
            name="email"
            type="email"
            onChange={handleChangeDataRegister}
            onFocus={(e) => e.target.classList.add("input-focused")}
            onBlur={handleOnBlur}
          />
          <span className="span-email">
            <Form.Label className="label-register">
              Địa chỉ email của bạn
            </Form.Label>
          </span>
          <span className="error-message-register">
            <p>{messageError.messageErrorEmail}</p>
          </span>
        </Form.Group>
        <Form.Group
          className="mb-3 div-input-password"
          controlId="formBasicPassword"
        >
          <Form.Control
            className="input-register"
            name="password"
            type={isEyesOpen ? "text" : "password"}
            onChange={handleChangeDataRegister}
            onFocus={(e) => e.target.classList.add("input-focused")}
            onBlur={handleOnBlur}
          />
          <span className="span-password">
            <Form.Label className="label-register">Mật khẩu</Form.Label>
          </span>
          <span className="error-message-register">
            <p>{messageError.messageErrorPassword}</p>
          </span>
          <FontAwesomeIcon
            className="icon-eyes"
            icon={isEyesOpen ? faEyeSlash : faEye}
            onClick={() => setIsEyesOpen(!isEyesOpen)}
          />
        </Form.Group>
        <Form.Group
          className="mb-3 div-input-username"
          controlId="formBasicusername"
        >
          <Form.Control
            className="input-register"
            name="username"
            type="text"
            onChange={handleChangeDataRegister}
            onFocus={(e) => e.target.classList.add("input-focused")}
            onBlur={handleOnBlur}
          />
          <span className="span-username">
            <Form.Label className="label-register">
              Tên tài khoản của bạn
            </Form.Label>
          </span>
          <span className="error-message-register">
            <p>{messageError.messageErrorUsername}</p>
          </span>
        </Form.Group>
        <Form.Group
          className="mb-3 div-input-numberPhone"
          controlId="formBasicNumberPhone"
        >
          <Form.Control
            className="input-register"
            name="numberPhone"
            type="phone"
            onChange={handleChangeDataRegister}
            onFocus={(e) => e.target.classList.add("input-focused")}
            onBlur={handleOnBlur}
          />
          <span className="span-numberPhone">
            <Form.Label className="label-register">
              Nhập số điện thoại của bạn
            </Form.Label>
          </span>
          <span className="error-message-register">
            <p>{messageError.messageErrorNumberPhone}</p>
          </span>
        </Form.Group>
        {/* <Form.Group className="mb-3 div-input-address" controlId="formBasicAddress">
          <Form.Control className="input-register" name="address" type="text" onChange={handleChangeDataRegister} onFocus={(e)=>e.target.classList.add("input-focused")} onBlur={handleOnBlur}/>
          <span className="span-address">
            <Form.Label className="label-register">Example.&: 34/12, Đường Nguyễn Trãi, Quận 1</Form.Label>
          </span>
          <span className="error-message-register">
            <p>{messageError.messageErrorAddress}</p>
          </span>
        </Form.Group> */}
        <Button
          onClick={handleRegister}
          disabled={handleCheckValidate() ? "" : "disabled"}
          variant="primary"
          className="form-control btn-submit"
        >
          Đăng Ký
        </Button>
        <Button
          onClick={()=>setShowFormRegister(false)}
          variant="primary"
          className="form-control btn-submit"
        >
          Đã có tài khoản? Đăng nhập!
        </Button>
        {/* <Button type="submit" className="form-control btn-submit-google">
          <img src="/images/google.svg"/>
          <p>Đăng nhập với google</p>
        </Button> */}
      </Form>
    </>
  );
};
export default FormRegister;
