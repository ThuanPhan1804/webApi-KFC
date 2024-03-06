import { useContext, useState } from "react";
import "./CategoryHeader.scss";
import { Carousel } from "react-responsive-carousel";
import { ActiveContext } from "../../views/App";
import Slider from "react-slick";
import _ from "lodash";
const CategoryHeader = (props) => {
  const { tabActive, setTabActive, handleScrollIntoView} = props;
  const items = [
    {
      name: "Ưu đãi",
      id: "promotion",
    },
    {
      name: "Món mới",
      id: "new-product",
    },
    {
      name: "Combo 1 người",
      id: "for-one",
    },
    {
      name: "Combo nhóm",
      id: "sharing",
    },
    {
      name: "gà rán - gà quay",
      id: "fried-rosted-chicken",
    },
    {
      name: "Burger-Cơm-Mì Ý",
      id: "burgur-rice-spaghetti",
    },
    {
      name: "Thức uống và thức ăn nhanh",
      id: "snack",
    },
  ];
  const { click,setClick } = useContext(ActiveContext);
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow:4,
    slidesToScroll:4,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ]
  };
  // console.log(offsetHeight);
  const deboundSetClick = _.debounce(() => {
   setClick(false);
}, 2000);
  const handleTabActive = (index) => {
    setTabActive(index);
    console.log(tabActive);
  };
  return (
    <div className="category-header">
      <section className="header-bottom container">
        <ul className="classification">
        <Slider {...settings}>
        {items.map((item, index) => {
            return (
              <li
                className={index === tabActive ? "active" : ""}
                key={index}
                onClick={() => {
                    handleTabActive(index);
                    handleScrollIntoView(index);
                    setClick(true);
                    deboundSetClick();
                }}
              >
                <h4 key={index} className="name-classification">
                  {item.name}
                </h4>
                <div className="line"></div>
              </li>
            );
          })}
        </Slider>
    
   
        </ul>
      </section>
    </div>
  );
};
export default CategoryHeader;
