import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import { ActiveContext } from "../../views/App";
function Category(props) {
  const { showCategory, setShowCategory } = props;
  const { active, setActive, setClick } = useContext(ActiveContext);

  const categories = [
    "ưu đãi",
    "món mới",
    "combo 1 người",
    "combo nhóm",
    "gà rán - gà quay",
    "burger - cơm - mì ý",
    "Thức ăn nhanh"
  ];
  return (
    <Offcanvas
      show={showCategory}
      onHide={() => setShowCategory(false)}
      placement="end"
    >
      <Offcanvas.Header closeButton>
        <h6>Danh Mục Món Ăn</h6>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {categories.map((category, index) => {
          return (
            <li style={{ listStyle: "none" }}>
              <Link
                to="/menu"
                style={{ textTransform: "uppercase" }}
                onClick={() => {
                  setTimeout(() => {
                    setActive(index);
                    setClick(true);
                    setShowCategory(false);
                    setTimeout(() => {
                      setClick(false);
                    }, 1000);
                  }, 1000);
                }}
              >
                {category}
              </Link>
            </li>
          );
        })}
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default Category;
