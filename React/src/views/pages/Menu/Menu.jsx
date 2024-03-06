import { useContext, useEffect, useRef, useState } from "react";
import { useLayoutEffect } from "react";
import Loading from "../../../components/Loading/Loading";
import ListProduct from "../../../components/Product/ListProduct";
import "./Menu.scss";
import CategoryHeader from "../../../components/Category/CategoryHeader";
import { Button, Form, Container } from "react-bootstrap";
import _ from "lodash";
import { Link } from "react-router-dom";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  getAllDessert,
  getProductByPrice,
  searchProduct,
} from "../../../services/productService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { getProductPage } from "../../../services/productService";
import {
  getAllNewProduct,
  getAllComboForOne,
  getAllPromotion,
  getAllBurger,
  getAllChicken,
  getAllSnack,
  getAllComboForShare,
} from "../../../services/productService";
import { getAllProduct } from "../../../services/productService";
import { parsePath } from "react-router-dom";
import { ActiveContext } from "../../App";
import axios from "axios";
const Menu = () => {
  const [search, setSearch] = useState({
    typeSearch: 1,
    price: 11000,
  });
  const rangeSearchRef = useRef();
  const [productSearchPrice, setProductSearchPrice] = useState([]);
  const [listProducts, setListProducts] = useState({
    promotions: [],
    newProducts: [],
    comboForOne: [],
    comboShare: [],
    chicken: [],
    burger: [],
    snack: [],
    dessert: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const {
    active: tabActive,
    setActive: setTabActive,
    click,
    setClick,
    wishLists,
  } = useContext(ActiveContext);

  const promotionRef = useRef(null);
  const newProductRef = useRef(null);
  const comboForOneRef = useRef(null);
  const comboShareRef = useRef(null);
  const chickenAndChickenRef = useRef(null);
  const burgerRef = useRef(null);
  const snackRef = useRef(null);
  const dessertRef = useRef(null);
  const ref = [
    promotionRef,
    newProductRef,
    comboForOneRef,
    comboShareRef,
    chickenAndChickenRef,
    burgerRef,
    snackRef,
    dessertRef
  ]
  const [products, setProducts] = useState([]);
  const [scrollTop, setScrollTop] = useState();
  const [productWishList, setProductWishList] = useState([]);
  const [lastPage, setLastPage] = useState(false);
  const [page, setPage] = useState(1);
  const [searchName, setSearchName] = useState();
  const [listAllProduct,setListAllProduct] = useState([]);
  useEffect(() => {
    // getMenuPage();
    getAllProducts();
    return () => {};
  }, []);
  useEffect(() => {
    handleScrollIntoView(tabActive);
    return () => {};
  }, [click]);
  const searchProductByName = _.debounce(async (e) => {
    const result = await searchProduct(e.target.value);
    if (result) {
      setSearchName(result);
    } else if (result.length <= 0) {
      setSearch({
        ...search,
        typeSearch: 1,
      });
    }
  }, 1000);
  const filterCategory = async(list) =>{
    const category = await axios("https://localhost:7082/api/Categories");
    let listProduct = [];
    for(var i = 0; i < category.data.length; i++){
      var listProductCategory = list.filter(p => p.categoryId === i);
      listProduct.push(listProductCategory);
  }
  setListProducts(listProduct)
  setIsLoading(false);
}
  const getAllProducts = async() =>{
      const list = await getAllProduct();
      filterCategory(list);
  } 
  const handleNextPage = async () => {
    if (!lastPage) {
      setPage((prev) => (prev += 1));
      const result = await getProductPage(page + 1);
      if (result && result.length > 0) {
        setProducts(result);
        setLastPage(false);
      } else {
        setPage(prev => prev -= 1)
        setLastPage(true);
      }
    }
  };
  const handlePrevPage = async () => {
    if (page > 1) {
      setPage((prev) => (prev -= 1));
      const result = await getProductPage(page - 1);
      if (result && result.length > 0) {
        setProducts(result);
        setLastPage(false);
      } else {
        setLastPage(true);
      }
    }
  };

  // const getMenuPage = async () => {
  //   const listPromotion = await getAllPromotion();
  //   const listNewProduct = await getAllNewProduct();
  //   const listComboForOne = await getAllComboForOne();
  //   const listComboShare = await getAllComboForShare();
  //   const listChicken = await getAllChicken();
  //   const listSnack = await getAllSnack();
  //   const listDessert = await getAllDessert();
  //   const listBurger = await getAllBurger();
  //   if (
  //     listPromotion &&
  //     listComboForOne &&
  //     listNewProduct &&
  //     listComboShare &&
  //     listChicken &&
  //     listBurger &&
  //     listSnack &&
  //     listDessert
  //   ) {
  //     setListProduct({
  //       promotions: listPromotion,
  //       newProducts: listNewProduct,
  //       comboForOne: listComboForOne,
  //       comboShare: listComboShare,
  //       chicken: listChicken,
  //       burger: listBurger,
  //       snack: listSnack,
  //       dessert: listDessert,
  //     });
  //     setIsLoading(false);
  //   }
  // };
  window.onscroll = () => {
    // console.log("hello");
    try {
      // console.log(promotionRef.current);
      // const scrollY = window.scrollY;
      if (
        !promotionRef &&
        !newProductRef &&
        !comboForOneRef &&
        !comboShareRef &&
        !chickenAndChickenRef &&
        !burgerRef &&
        !snackRef &&
        !dessertRef
      ) {
        return;
      } else if (!click) {
        setScrollTop(window.pageYOffset || window.scrollTop);
        if (promotionRef.current.getBoundingClientRect().y - 183 <= 10) {
          setTabActive(0);
        }
        if (newProductRef.current.getBoundingClientRect().y - 183 <= 10) {
          setTabActive(1);
        }
        if (comboForOneRef.current.getBoundingClientRect().y - 183 <= 10) {
          setTabActive(2);
        }
        if (comboShareRef.current.getBoundingClientRect().y - 183 <= 10) {
          setTabActive(3);
        }
        if (
          chickenAndChickenRef.current.getBoundingClientRect().y - 183 <=
          10
        ) {
          setTabActive(4);
        }
        if (burgerRef.current.getBoundingClientRect().y - 183 <= 10) {
          setTabActive(5);
        }
        if (snackRef.current.getBoundingClientRect().y - 183 <= 10) {
          setTabActive(6);
        }
        if (dessertRef.current.getBoundingClientRect().y - 183 <= 10) {
          setTabActive(7);
        }
      }
      // setTimeout(()=>{
    } catch (e) {
      console.log(e);
    }
  };
const handleScrollIntoView = () =>{

}
  const handleSearch = _.debounce(async (e) => {
    setSearchName([]);
    if(e.target.name === "form-select" && +e.target.value === 0){
      const results = await getProductPage(page);
      if (results && results.length > 0) {
        setProducts(results);
      }
    }
    if (e.target.name === "form-select" && +e.target.value !== 4) {
      console.log(e.target.value);
      const result = await getProductByPrice({
        ...search,
        typeSearch: +e.target.value,
      });
      if (result) {
        setProductSearchPrice(result);
        console.log("true");
      }
    } else if (+e.target.value !== 4) {
      const result = await getProductByPrice(search);
      if (result) {
        setProductSearchPrice(result);
        console.log(productSearchPrice);
      }
    } else {
      let product = wishLists.map((obj) => {
        return obj.product;
      });
      setProductWishList(product);
      console.log(product);
    }
  }, 500);

  return isLoading ? (
    <div className="loading">
      <Loading />
    </div>
  ) : (
    <div className="menu container" style={{minHeight:"600px"}}>
      {/* <CategoryHeader
        className="container"
        tabActive={tabActive}
        setTabActive={setTabActive}
        handleScrollIntoView={handleScrollIntoView}
        setClick={setClick}
      /> */}
      <div className="classification-item container d-flex search">
        <div className="div-search">
          <h3>Tìm kiếm món ăn theo: </h3>
          <div className="div-btn-search">
            <Form.Select
              name="form-select"
              aria-label="Default select example"
              value={search.typeSearch}
              onChange={(e) => {
                rangeSearchRef.current.value = 11000;
                setSearch({
                  price: 11000,
                  typeSearch: +e.target.value,
                });
              }}
              onInput={handleSearch}
            >
              <option value="1">Danh mục</option>
              <option value="0">Tất cả</option>
              <option value="2">Giá cao hơn</option>
              <option value="3">Giá thấp hơn</option>
              <option value="4">Danh sách yêu thích</option>
            </Form.Select>
            <div
              className={
                search.typeSearch === 1 || search.typeSearch === 4 || search.typeSearch === 0
                  ? "d-none"
                  : "range-search"
              }
            >
              <Form.Range
                defaultValue={0}
                min={11000}
                step={1000}
                max={500000}
                ref={rangeSearchRef}
                onChange={(e) => {
                  setSearch({
                    ...search,
                    price: +e.target.value,
                  });
                }}
              />
              <div className="demo-price">
                {search.typeSearch === 2 ? (
                  <>
                    <p>{search.price.toLocaleString("vi-VN")}VNĐ</p>
                    <p>500.000VNĐ</p>
                  </>
                ) : (
                  <>
                    <p>0</p>
                    <p>{search.price.toLocaleString("vi-VN")}VNĐ</p>
                  </>
                )}
              </div>
            </div>
            <Button
              onClick={handleSearch}
              className={
                search.typeSearch === 1 || search.typeSearch === 4 || search.typeSearch === 0
                  ? "d-none"
                  : "btn btn-search form-control"
              }
            >
              Tìm kiếm
            </Button>
          </div>
        </div>
        <div className="input-search">
          <Form.Control type="search" onChange={searchProductByName} placeholder="Nhập vào tên món ăn"/>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
      </div>
      {searchName && searchName.length > 0 ? (
        <>
          <div className="classification-item container">
            <h1>Kết quả tìm kiếm:</h1>
            <div className="row">
              <ListProduct products={searchName}></ListProduct>
            </div>
          </div>
        </>
      ) : search.typeSearch === 1 ? (
        <>
  
          {listProducts && listProducts.length > 0 && listProducts.map((item,index) => {
            return(
              <div
              ref={ref[index]}
              className="classification-item container"
            >
                <ListProduct products={item} typeSearch={search.typeSearch} />
            </div>
            )
          })}
        </>
      ) : search.typeSearch === 0 ?
          (
            <div className="list-products">
            <span className="arrow" onClick={handlePrevPage}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </span>
            <div className="classification-item container">
            <h1>
              Tất cả món ăn
            </h1>
            <div className="row">
              <ListProduct products={products}></ListProduct>
            </div>
          </div>
          <span className="arrow" onClick={handleNextPage}>
          <FontAwesomeIcon icon={faChevronRight} />
        </span>
            </div>
                      )
       : search.typeSearch === 4 && productWishList.length > 0 ? (
        <>
          <div className="classification-item container">
            <h1>Các món ăn bạn đã thích</h1>
            <div className="row">
              <ListProduct products={productWishList}></ListProduct>
            </div>
          </div>
        </>
      ) : search.searchType === 3 ||
        search.searchType === 2 ||
        productSearchPrice.length > 0 ? (
        <>
          <div className="classification-item container">
            <h1>
              Món ăn giá {search.typeSearch === 2 ? "trên" : "dưới"}:{" "}
              {search.price.toLocaleString("vi-VN")}VNĐ
            </h1>
            <div className="row">
              <ListProduct products={productSearchPrice}></ListProduct>
            </div>
          </div>
        </>
      ) : (
        <div className="no-product">
          <Container>
            <div className="div-img">
              <img src="/images/no-found-product.webp"></img>
            </div>
            <div className="no-page-title">
              Không tìm thấy món ăn trong khoản giá này!
            </div>
            <Button>
              <Link
                onClick={() => {
                  setSearch({ ...search, typeSearch: 1 });
                }}
              >
                Trở Lại Menu
              </Link>
            </Button>
          </Container>
        </div>
      )}
    </div>
  );
};
export default Menu;
