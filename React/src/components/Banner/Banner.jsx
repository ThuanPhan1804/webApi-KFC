import { Button } from "react-bootstrap"
import "./Banner.scss"
import { faTruckFast } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext } from "react"
import { ActiveContext } from "../../views/App"
import { Link } from "react-router-dom"
const Banner = () =>{
    const {infoUser}  = useContext(ActiveContext)
    return(
        <div className="banner">
            <span>
            <FontAwesomeIcon className="me-2" icon={faTruckFast} style={{color: "#c70a0a",}} />
            </span>
            <span style={{color:"#fff", margin:"0 12px",fontWeight:"bold"}}>{localStorage.getItem("address") ? `Địa chỉ giao hàng: ${localStorage.getItem("address")}` : infoUser.username ? `Chào mừng tài khoản ${infoUser.username}!` : "Chào mừng quý khách!"}</span>
            <span className="booking">
                    <Link to={localStorage.getItem("address") ? "/delivery" : "/menu"} className="btn-booking">{!localStorage.getItem("address") ? "Đặt hàng ngay" : "Thay đổi địa chỉ"}</Link>
            </span>

        </div>
    )
}
export default Banner;