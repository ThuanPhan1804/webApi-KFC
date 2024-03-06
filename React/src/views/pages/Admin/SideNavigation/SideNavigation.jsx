import "./SideNavigation.scss"
import { Outlet,Link } from "react-router-dom";
import { Offcanvas } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const SideNavigation = ({show,setShow}) =>{
    const listNavigations = [
        {
            name:"Quản lý tài khoản",
            link:"account",
            icon:"fa-solid fa-user"
        },
        {
            name:"Quản lý món ăn",
            link:"product",
            icon:"fa-solid fa-bowl-food"
        },
        {
            name:"Quản lý khuyến mãi",
            link:"promotion",
            icon:"fa-solid fa-list"
        },
        {
            name:"Quản lý hóa đơn",
            link:"invoice",
            icon:"fa-solid fa-file-invoice"
        }
    ]
    return(
        <Offcanvas show={show}>
        <Offcanvas.Header closeButton onClick = {()=>{setShow(false)}}>
          <Offcanvas.Title>Quản lý</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="nav-ul">
            {listNavigations.map((listNavigation, index)=>{
                return(
                    <Link key={index} to={`${listNavigation.link}`} className="nav-link" onClick={()=>setShow(false)}>
                        <FontAwesomeIcon icon={listNavigation.icon}/>
                        <span className="navigation-name">{listNavigation.name}</span>
                    </Link>
                )
            })}
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    )
}
export default SideNavigation;