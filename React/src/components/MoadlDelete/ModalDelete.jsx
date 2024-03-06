import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import "./ModalDelete.scss"
function ModalDelete({data,setShowModal,handleDeleteProduct,handleDeleteAccount}) {
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton onClick={()=>{setShowModal(false)}}>
          <Modal.Title>Xác nhận xóa</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Xác nhận xóa: {data.name ? data.name : data.userName}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={()=>handleDeleteProduct(data.id)}>Xác nhận</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default ModalDelete;