import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./ModalPay.scss"
function ModalPay({setShowModalPay}) {
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton onClick={()=>{setShowModalPay(false)}}>
          <Modal.Title>Xác nhận đặt món</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Thông tin đặt hàng</p>
          <div className='address-order'>Địa chỉ nhận hàng: {localStorage.getItem("address")}</div>
          <div className='phone-order'>Số điện thoại nhận hàng: {localStorage.getItem("phone")}</div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary">Xác nhận</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default ModalPay;