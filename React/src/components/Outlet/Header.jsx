import { useContext, useEffect, useState } from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import Category from "../Category/Category";
import { Dropdown } from "react-bootstrap";
import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useNavigate } from "react-router-dom";
import { ActiveContext } from "../../views/App";
import { tab } from "@testing-library/user-event/dist/tab";
import { constant, reduce } from "lodash";
const Header = (props) => {
  const [showCategory, setShowCategory] = useState(false);
  const { infoUser, setInfoUser, cart, setActive, setClick } =
    useContext(ActiveContext);
  const [login, setLogin] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();
  const navs = [
    {
      name: "thực đơn",
      link: "/menu",
    },
    {
      name: "khuyễn mãi",
      link: "/menu",
    },
    {
      name: "lịch sử hình thành",
      link: "/kfc-story",
    },
    {
      name: "Đơn hàng của bạn",
      link: "/invoice",
    },
  ];
  const [activeTab, setActiveTab] = useState(0);

  const handleLogOut = () => {
    try {
      localStorage.clear();
      setInfoUser({});
      navigate("/account");
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    const account = localStorage.getItem("account");
    account ? setLogin(true) : setLogin(false);
    return () => {};
  }, []);
  useEffect(() => {
    const quantityCart = cart.map((item) => item.quantity);
    const sumQuantityCart = quantityCart.reduce((total, number) => {
      return total + number;
    }, 0);
    setQuantity(sumQuantityCart);
  }, [cart]);
  // window.onscroll = () =>{
  //     console.log(window.scrollY);
  // }
  return (
    <div className="header">
      <section className="common-header container">
        <div className="header-top">
          <Button
            onClick={() => setShowCategory(true)}
            className="category-left"
          >
            <FontAwesomeIcon icon={faBars} style={{ color: "#000000" }} />
          </Button>
          <div className="header-left">
            <div className="logo">
              <Link to="/">
                <picture class="link-index-page">
                  <source
                    className="logo-image"
                    media="(max-width: 992px)"
                    type="image/webp"
                    srcSet="/images/kfc-logo-mobile.svg"
                  />
                  <img className="logo-image" src="/images/kfc-logo.svg" />
                </picture>
              </Link>
            </div>
            <ul>
              {navs.map((nav, index) => {
                return index === 1 ? (
                  <li
                    className="nav"
                    key={index}
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                      });
                      console.log(index, activeTab);
                      setActiveTab(index);
                    }}
                  >
                    <Link
                      className={index === activeTab ? "active" : ""}
                      to={
                        localStorage.getItem("account") ? nav.link : "/account"
                      }
                      style={{ textTransform: "uppercase" }}
                      //   onClick={() => {
                      //     setTimeout(()=>{
                      //         setActive(0);
                      //         setClick(true);
                      //         setTimeout(() => {
                      //         setClick(false);
                      //     }, 2000);
                      //     },1000)
                    >
                      {nav.name}
                      <div className="line"></div>
                    </Link>
                  </li>
                ) : (
                  <li
                    key={index}
                    className="nav"
                    onClick={() => {
                      setActiveTab(index);
                      if (index === 0) {
                        window.location.reload();
                        window.scrollTo({
                          top: 0,
                          behavior: "instant",
                        });
                      }
                    }}
                  >
                    <Link
                      className={index === activeTab ? "active" : ""}
                      to={nav.link}
                    >
                      {nav.name}
                      <div className="line"></div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="header-right">
            <span className="booking">
              <Link
                to={localStorage.getItem("address") ? "/delivery" : "/menu"}
                className="btn-booking"
              >
                {!localStorage.getItem("address")
                  ? "Đặt hàng ngay"
                  : "Thay đổi địa chỉ"}
              </Link>
            </span>
            <ul>
              <Dropdown>
                <Dropdown.Toggle
                  style={{ backgroundColor: "unset", border: "none" }}
                  id="dropdown-basic"
                >
                  <FontAwesomeIcon
                    className="login-icon"
                    icon={faUser}
                    style={{ color: "#000000", fontSize: "20px" }}
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {localStorage.getItem("account") &&
                    infoUser.username &&
                    infoUser.username === "admin" && (
                      <Dropdown.Item>
                        <Link to="/admin">Quản lý</Link>
                      </Dropdown.Item>
                    )}
                  {!localStorage.getItem("account") && (
                    <Dropdown.Item>
                      <Link
                        to="/account"
                        className="login"
                        style={{ marginLeft: "16px" }}
                      >
                        Đăng nhập
                      </Link>
                    </Dropdown.Item>
                  )}

                  {localStorage.getItem("account") && (
                    <Dropdown.Item>
                      <span className="line"></span>
                      <p
                        className={login ? "log-out" : "d-none"}
                        onClick={handleLogOut}
                      >
                        Đăng xuất
                      </p>
                    </Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>

              <div className="cart">
                <Link
                  to={localStorage.getItem("address") ? "/cart" : "/delivery"}
                >
                  <img src="/images/cart.png"></img>

                  <p className="cart-quantity">
                    {!localStorage.getItem("account") ? (
                      ""
                    ) : quantity > 9 ? (
                      <p className="quantity">
                        9<span className="quantity-plus">+</span>
                      </p>
                    ) : (
                      quantity
                    )}
                  </p>
                </Link>
              </div>
              <Button
                onClick={() => setShowCategory(true)}
                className="category-right"
              >
                <FontAwesomeIcon icon={faBars} style={{ color: "#000000" }} />
              </Button>
            </ul>
          </div>
        </div>
      </section>
      {showCategory && (
        <Category
          showCategory={showCategory}
          setShowCategory={setShowCategory}
        />
      )}
    </div>
  );
};
export default Header;
