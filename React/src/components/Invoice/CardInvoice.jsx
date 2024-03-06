import { useEffect, useState } from "react";
import "./CardInvoice.scss"
import { Button } from "react-bootstrap";
const CardInvoice = ({data}) =>{
    const [backgroundColor,setBackgroundColor] = useState("");
    useEffect(()=>{
        switch (data.invoiceStatusId){
            case 1: setBackgroundColor("#5353ff");break;
            case 2: setBackgroundColor("#e2e321");break;
            case 3: setBackgroundColor("#04c814");break;
            case 4: setBackgroundColor("#ff8d42");break;
            case 5: setBackgroundColor("#ff2f2f");break;

        }
    })
    return(<>
            <div className="card-invoice">
            <div className="card-invoice-left">
                <div className="code">Mã hóa đơn: {data.code} </div>
                <div className="code">Địa chỉ giao hàng: {data.shippingAddress} </div>
                <div className="code">Số điện thoại giao hàng: {data.shippingPhone} </div>
                <div className="code">Tổng tiền thanh toán: {data.total.toLocaleString("vi-VN")}VNĐ </div>
            </div>
            <div className="card-invoice-right">
               <span className="status-invoice" style={{backgroundColor:backgroundColor}}>
                {data.invoiceStatus.name}
               </span>
            </div>
            </div>
    </>)
}
export default CardInvoice;