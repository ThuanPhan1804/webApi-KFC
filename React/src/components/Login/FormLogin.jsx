import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "./FormLogin.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye,faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import validateForm from "../../function/validateForm";
import { login } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { ActiveContext } from "../../views/App";
import { toast } from "react-toastify";
import _ from "lodash";
const FormLogin = ({setShowFormRegister}) => {
    const [isEyesOpen,setIsEyesOpen] = useState(false);
    const [messageErrorUsername,setMessageErrorUsername] = useState("");
    const {infoLogin,setInfoLogin} = useContext(ActiveContext)
    const [dataLogin,setDataLogin] = useState({
      username : "",
      password : ""
    })
    const navigate = useNavigate();
    const handleOnBlur = (e) =>{
      // let results = validateForm(e);
      // console.log(results);
      // if(results === "username"){
      //   e.target.style.borderBottom = "2px solid red";
      //   setMessageErrorUsername("Vui lòng nhập một địa chỉ Username hợp lệ");
      // }
      // else{
      //   e.target.style.borderBottom = "1px solid black";
      //   setMessageErrorUsername(" ");
      // }
      
    }
    const handleChangeDataLogin = (e) =>{
      let name = e.target.name;
      let value = e.target.value;
      setDataLogin({...dataLogin, [name] : value });
      setMessageErrorUsername("");
    }
    const hanleCheckEmptyForm = () =>{
      if(dataLogin.username !== "" && dataLogin.password !== ""){
        return false;
      } 
      return true;
    } 
    const handleLogin = _.debounce(async(dataLogin) =>{
      try{
        const result = await login(dataLogin);
      if(result){
        localStorage.setItem("account",result.token);
        localStorage.setItem("userId",result.userId);
        navigate("/");
        window.location.reload(); 
      }
      }
      catch(e){
        toast.error("Mật khẩu hoặc tài khoản không chính xác! Vui lòng thử lại",{
          autoClose:1000
        })
      }
    },1000)
  return (
    <>
      <Form className="form-login-account">
        <h1>ĐĂNG NHẬP</h1>
        <Form.Group className="mb-3 div-input-username" controlId="username">
          <Form.Control className="input-username" name="username" type="username" onFocus={(e)=>e.target.classList.add("input-focused")} onChange={handleChangeDataLogin} onBlur={handleOnBlur}/>
          <span className="span-username">
            <Form.Label className="label-username" onChange={handleChangeDataLogin}>Tên đăng nhập</Form.Label>
          </span>
          <span className="error-message-username">
            <p>{messageErrorUsername}</p>
          </span>
        </Form.Group>

        <Form.Group className="mb-3 div-input-password" controlId="password">
        <Form.Control className="input-password" name="password" type={isEyesOpen ? "text" : "password"}  onFocus={(e)=>e.target.classList.add("input-focused")} onChange={handleChangeDataLogin} onBlur={handleOnBlur}/>
          <span className="span-password">
            <Form.Label className="label-password">Mật khẩu</Form.Label>
          </span>
          <FontAwesomeIcon className="icon-eyes" icon={isEyesOpen ? faEyeSlash : faEye} onClick={()=>setIsEyesOpen(!isEyesOpen)}/>
        </Form.Group>
        <Link to="" className="forgot-password" onClick={()=>setShowFormRegister(true)}>Chưa có tài khoản? Đăng ký!</Link>
        <Button disabled={hanleCheckEmptyForm() ? "disabled" : ""} variant="primary"  className="form-control btn-submit" onClick={()=>handleLogin(dataLogin)}>
          Đăng nhập
        </Button>
        {/* <Button type="submit" className="form-control btn-submit-google" >
          <img src="/images/google.svg"/>
          <p>Đăng nhập với google</p>
        </Button> */}
        
      </Form>
    </>
  );
};
export default FormLogin;
 