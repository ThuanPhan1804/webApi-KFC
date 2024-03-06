import { Outlet } from "react-router-dom";
import Header from "../../../components/Outlet/Header";
import "./Layout.scss"
import { useState } from "react";
import CategoryHeader from "../../../components/Category/CategoryHeader";
import { Container } from "react-bootstrap";
import Footer from "../../../components/Outlet/Footer";
const Layout = () =>{
        return(
        <>
            <Header/>
            <div className="content-web">
            <Outlet />
            </div>
            <Footer/>
        </>
    )
}
export default Layout;