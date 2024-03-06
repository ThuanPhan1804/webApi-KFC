import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import "./ModalDelete.scss"
function ModalDeleteInvoice({data,setShowModal,handleDeleteInvoice}) {
  return (
    <div
      className="modal show modal-invoice"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton onClick={()=>{setShowModal(false)}}>
          <Modal.Title>Xác nhận xóa</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Xác nhận xóa hóa đơn:{data.code}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={()=>handleDeleteInvoice(data.id)}>Xác nhận</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default ModalDeleteInvoice;