import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { useNavigate } from "react-router-dom";
import { validatePhone } from "../../function/validateForm";
import { Form } from "react-bootstrap";
import { Button, Dropdown } from "react-bootstrap";
import "./Delivery.scss";
import { getAddress } from "../../services/deliveryService";
export default function Delivery() {
    const navigate = useNavigate();
    const [addressVN,setAddressVN] = useState([]);
    const phone = localStorage.getItem("phone");
    const address = localStorage.getItem("address");
  const [infoDelivery, setInfoDelivery] = useState({
    houseNumber: "",
    streetName: "",
    ward: "",
    district: "",
    city: "",
    phoneNumber: "",
  });
  useEffect(()=>{
    if(address !== null){
        const addressInfo = address.split(",")
        setInfoDelivery({
            houseNumber:addressInfo[0],
            streetName:addressInfo[1],
            ward:addressInfo[2],
            district:addressInfo[3],
            city:addressInfo[4],
            phoneNumber:phone
        })
    }
    return () => {};
     },[])
  const checkEmptyForm = () =>{
    if(infoDelivery.houseNumber !== "" && infoDelivery.streetName !== "" && infoDelivery.ward !== "" && infoDelivery.district !== "" && infoDelivery.city !== "" && (infoDelivery.phoneNumber !== "" && validatePhone(infoDelivery.phoneNumber))){
        return true;
    }
    else{
        return false;
    }
  }
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInfoDelivery({ ...infoDelivery, [name]: value });
  };
  const handeOnBlur = (e) =>{
    if(!validatePhone(e.target.value) && e.target.name === "numberPhone"){

    }
  }
  const handleSubmit = () =>{
    localStorage.setItem("phone",`${infoDelivery.phoneNumber}`)
    localStorage.setItem("address", `${infoDelivery.houseNumber}, ${infoDelivery.streetName}, ${infoDelivery.ward}, ${infoDelivery.district}, ${infoDelivery.city}`)
    navigate("/menu")
} 
  return (
    <>
      <div
        className="gradient-custom "
        style={{ maxWidth: "800px", height: "400px" }}
      >
        <MDBRow className="pt-3 mx-3 row-delivery">
          <MDBCol md="3">
            <div
              className="text-center"
              style={{ marginTop: "50px", marginLeft: "10px" }}
            >
              <MDBIcon fas icon="shipping-fast text-white" size="3x" />
              <MDBTypography tag="h3" className="text-white">
                Welcome
              </MDBTypography>
              <p className="white-text">
                Lưu ý: Đơn hàng của bạn có thể bị hủy nếu địa chỉ giao hàng được cung cấp không hợp lệ!
              </p>
            </div>
            <div className="text-center">
              <Button className="back-button" onClick={()=>navigate("/menu")}>Go back</Button>
            </div>
          </MDBCol>
          <MDBCol md="9" className="justify-content-center">
            <MDBCard className="card-custom pb-4">
              <MDBCardBody className="mt-0 mx-5">
                <div className="text-center mb-3 pb-2 mt-3">
                  <MDBTypography tag="h4" style={{ color: "#495057" }}>
                    Thông tin giao hàng
                  </MDBTypography>
                </div>

                <form className="mb-0">
                  <MDBRow className="row-input mb-4">
                    <MDBCol>
                      <MDBInput
                        label="Số nhà"
                        name="houseNumber"
                        type="text"
                        onChange={handleChange}
                        value={infoDelivery.houseNumber}
                      />
                    </MDBCol>
                    <MDBCol>
                      <MDBInput
                        label="Tên đường"
                        name="streetName"
                        type="text"
                        onChange={handleChange}
                        value={infoDelivery.streetName}

                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="row-input mb-4">
                    <MDBCol>
                      <MDBInput
                        label="Phường"
                        name="ward"
                        type="text"
                        onChange={handleChange}
                        value={infoDelivery.ward}
                      />
                    </MDBCol>
                    <MDBCol>
                    <MDBInput
                        label="Quận"
                        name="district"
                        type="text"
                        onChange={handleChange}
                        value={infoDelivery.district}
                        
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="row-input mb-4">
                    <MDBCol>
                    <MDBInput
                        label="Thành Phố"
                        name="city"
                        type="text"
                        onChange={handleChange}
                        value={infoDelivery.city}

                      />
                    </MDBCol>
                    <MDBCol>
                      <MDBInput
                        label="Số điện thoại"
                        name="phoneNumber"
                        type="text"
                        onChange={handleChange}
                        value={infoDelivery.phoneNumber}
                      />
                    </MDBCol>
                  </MDBRow>

                  <div className="float-end">
                    <Button className="btn-confirm" disabled={checkEmptyForm(infoDelivery) ? "" : "disabled"} onClick={handleSubmit}>Xác nhận</Button>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </div>
      <div>
  </div>
    </>
  );
}
