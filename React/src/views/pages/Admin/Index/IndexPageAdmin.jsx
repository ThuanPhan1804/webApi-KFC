import { Outlet } from "react-router-dom"
import Header from "../Header/Header";
import SideNavigation from "../SideNavigation/SideNavigation";
import { Container } from "react-bootstrap";
import { useState } from "react";
const IndexPageAdmin = () =>{
    const [show,setShow] = useState(false);
    return(
        <>
        <Header setShow = {setShow}/>
        <SideNavigation show={show} setShow = {setShow}/>
        <div className="mt-3 container">
        <Outlet/>
        </div>
        </>
    )
}
export default IndexPageAdmin;