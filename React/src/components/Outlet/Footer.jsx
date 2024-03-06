import { Link } from "react-router-dom";
import "./Footer.scss";
import React from "react";
import { ActiveContext } from "../../views/App";
const Footer = () => {
  const { active, setActive, setClick } = React.useContext(ActiveContext);
  const categories = [
    "ưu đãi",
    "món mới",
    "combo 1 người",
    "combo nhóm",
    "gà rán - gà quay",
    "burger - cơm - mì ý",
  ];
  return (
    <div className="footer">
      <div className="footer-top">
       
        <ul className="about">
        <Link to="/" className="navbar-brand ps-3" href="index.html"><img src="/images/kfc-logo-mobile.svg" className="d-block" style={{width:"100px", height:"40px"}}></img>
        <p style={{color:"#fff",fontSize:"20px"}}>Vị ngon trên từng ngón tay </p>
        </Link>
        </ul>
        <ul>
          <h6>Danh Mục Món Ăn</h6>
          {categories.map((category, index) => {
            return (
              <li key={index}>
                <Link
                  to="/menu"
                  style={{ textTransform: "uppercase" }}
                  onClick={() => {
                    setTimeout(() => {
                      setActive(index);
                      setClick(true);
                      setTimeout(() => {
                        setClick(false);
                      }, 500);
                    }, 1000);
                  }}
                >
                  {category}
                </Link>
              </li>
            );
          })}
        </ul>
        <ul className="info">
          <h6>Thông tin liên hệ</h6>
          <li>
            65 Đ. Huỳnh Thúc Kháng, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh
          </li>
          <li>Điện thoại: (092) 3986418</li>
          <li>Email: 0306211050@gmail.com</li>
          <li>Mã số thuế: 03014598625</li>
          <li>
            Ngày cấp: 1998-10-05 - Nơi cấp: Chi cục Thuế Quận 1
          </li>
        </ul>
        <div>

        </div>
      </div>
    </div>
  );
};
export default Footer;
