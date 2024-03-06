import logo from "./logo.svg";
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { redirect } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import Home from "./pages/Home";
import History from "./pages/History/History";
import Menu from "./pages/Menu/Menu";
import KFCTabs from "./pages/KFCTabs";
import Story from "./pages/Story";
import { createContext, useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import ListUsers from "./pages/Admin/ListUsers/ListUsers";
import Login from "./pages/LoginRegister/Login/PageAccount";
import IndexPageAdmin from "./pages/Admin/Index/IndexPageAdmin";
import ListProduct from "./pages/Admin/ListProducts/ListProducts";
import Cart from "./Cart/Cart";
import { useNavigate } from "react-router-dom";
import NoPage from "./pages/NoPage";
import DetailProduct from "./pages/DetailProduct/DetailProduct";
import AddUser from "./pages/Admin/ListUsers/AddAccount";
import { getDataUser } from "../services/userService";
import { getCart } from "../services/cartService";
import Delivery from "../components/Delivery/Delivery";
import AddProduct from "./pages/Admin/ListProducts/AddProduct";
import { getWishListByUser } from "../services/wishListService";
import Invoice from "./pages/Invoice/Invoice";
import ListPromotion from "./pages/Admin/Promotion/ListPromotion";
import AddPromotion from "./pages/Admin/Promotion/AddPromotion";
import { ToastContainer } from "react-toastify";
import ListInvoice from "./pages/Admin/Invoice/ListInvoice";
function App() {
  const [active, setActive] = useState(0);
  const [click, setClick] = useState(false);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const [infoUser, setInfoUser] = useState({});
  const userId = localStorage.getItem("userId");

  const [wishLists, setWishList] = useState([]);
  useEffect(async () => {
    if (userId !== null) {
      const result = await getDataUser(userId);
      if (result) {
        setInfoUser(result);
      }
      const cartUser = await getCart(userId);
      if (cartUser) {
        setCart(cartUser);
      }
      getWishList();
    }
    return () => {};
  }, []);
  const getWishList = async () => {
    const getWishList = await getWishListByUser(userId);
    if (wishLists) {
      setWishList(getWishList);
    }
  };
  return (
    <ActiveContext.Provider
      value={{
        active,
        setActive,
        click,
        setClick,
        infoUser,
        setInfoUser,
        cart,
        setCart,
        wishLists,
        getWishList,
      }}
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="menu" element={<Menu />}></Route>
          <Route path="/detail-product/:id" element={<DetailProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/invoice" element={<Invoice />} />

          {/* Account */}
          {!localStorage.getItem("account") && (
            <Route path="/account">
              <Route index element={<Login />} />
            </Route>
          )}
          {/* Story */}
          <Route path="kfc-story" element={<KFCTabs />}>
            <Route index element={<History />} />
            <Route path="story" element={<Story />} />
          </Route>
          {/* Login */}

          <Route />
          {/* Admin */}
        </Route>
        {infoUser.username === "admin" && (
          <Route path="admin" element={<IndexPageAdmin />}>
            <Route index element={<ListUsers />} />
            <Route path="product">
              <Route index element={<ListProduct />} />
              <Route path="add" element={<AddProduct />} />
            </Route>
            <Route path="invoice">
              <Route index element={<ListInvoice />} />
              {/* <Route path="add" element={<AddInvo/>} /> */}
            </Route>
            <Route path="account">
              <Route index element={<ListUsers />} />
              <Route path="add" element={<AddUser />} />
              <Route />
              <Route />
            </Route>
            <Route path="promotion">
              <Route index element={<ListPromotion />} />
              <Route path="add" element={<AddPromotion />} />
              <Route />
              <Route />
            </Route>
          </Route>
        )}
        <Route path="*" element={<NoPage />} />
      </Routes>
      <Routes></Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      <ToastContainer />
    </ActiveContext.Provider>
  );
}

export default App;
export const ActiveContext = createContext(null);
