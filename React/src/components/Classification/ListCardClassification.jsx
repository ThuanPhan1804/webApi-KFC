import { useEffect } from "react";
import CardClassification from "./CardClassification";
import "./ListCardClassification.scss";
import React from "react";
import { ActiveContext } from "../../views/App";
import { Link } from "react-router-dom";
const ListCardClassification = () => {
  const { active, setActive, setClick } = React.useContext(ActiveContext);
  const listCardClassification = [
    {
      name: "Ưu Đãi",
      img: "promotion.jpg",
    },
    {
      name: "Món Mới",
      img: "newproduct.jpg",
    },
    {
      name: "Combo 1 Người",
      img: "combo-for-one.jpg",
    },
    {
      name: "Combo Nhóm",
      img: "combo-share.jpg",
    },
    {
      name: "Gà Rán - Gà Quay",
      img: "chicken.jpg",
    },
    {
      name: "Burger-Cơm-Mì Ý",
      img: "burger-rice.jpg",
    },
    {
      name: "Thức Ăn Nhẹ",
      img: "dessert.jpg",
    },
    {
      name: "Thức Uống & Tráng Miệng",
      img: "drink-dessert.jpg",
    },
  ];
  useEffect(() => {
    return () => {};
  });
  return (
    <div className="classification my-5 container">
      <h2>
        <span>Danh mục</span>
      </h2>
      <div className="row-classification">
        {listCardClassification.map((classification, index) => {
          return (
            <Link to="/menu">
            <div
              className="div-classification" style={{cursor:"pointer"}}
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
              <CardClassification key={index} classification={classification} />
            </div>
            </Link>
            
          );
        })}
      </div>
    </div>
  );
};
export default ListCardClassification;
