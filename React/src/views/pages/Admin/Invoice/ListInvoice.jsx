import { Table } from "react-bootstrap";
import "./ListInvoice.scss";
import { useEffect, useState } from "react";
import {
  deleteInvoiceById,
  getAllInvoice,
  putStatusInvoice,
} from "../../../../services/invoicesService";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import Moment from "react-moment";
import ModalDeleteInvoice from "../../../../components/MoadlDelete/ModaldeleteInvoice";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
// import ModaldeleteInvoice from "../../../../components/MoadlDelete/ModaldeleteInvoice";
// import { deleteInvoice } from "../../../../services/invoiceService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
// import Editinvoice from "./Editinvoice";
const ListInvoice = () => {
  const [showModal, setShowModal] = useState(false);
  const [invoiceDetail, setInvoiceDetail] = useState(false);
  const [typeModal, setTypeModal] = useState(false);
  const [lastPage, setLastPage] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    getListInvoice();
  }, []);
  const getListInvoice = async () => {
    const results = await getAllInvoice(page);
    if (results && results.length > 0) {
      setInvoices(results);
      console.log(results);
    }
  };
  // const handleDeleteInvoice = async (id) => {
  //   try {
  //     await deleteInvoice(id);
  //     getListInvoice();
  //     setShowModal(false);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  const handleNextPage = async () => {
    if (!lastPage) {
      setPage((prev) => (prev += 1));
      const result = await getAllInvoice(page + 1);
      if (result && result.length > 0) {
        setInvoices(result);
        setLastPage(false);
      } else {
        setPage((prev) => (prev -= 1));
        setLastPage(true);
      }
    }
  };
  const handlePrevPage = async () => {
    if (page > 1) {
      setPage((prev) => (prev -= 1));
      const result = await getAllInvoice(page - 1);
      if (result && result.length > 0) {
        setInvoices(result);
        setLastPage(false);
      } else {
        setLastPage(true);
      }
    }
  };
  const handleDeleteInvoice = async (id) => {
    try {
      await deleteInvoiceById(id);
      setShowModal(false);
      getListInvoice();
    } catch (e) {
      toast.error("Đã xảy ra lỗi vui lòng thử lại sau!", {
        autoClose: 1000,
      });
    }
  };
  const handleChangeStatusInvoice = async (e, id) => {
    try{
      const result = await putStatusInvoice({ id, statusId: e.target.value });
      if(result){
        getListInvoice();
      }
    }
    catch(e){
      toast.warning("Có lỗi xảy ra vui lòng thử lại!",{
        autoClose:1000
      })
    }
    
  };
  return (
    <>
      <h1 className="list-titli">Danh sách hóa đơn</h1>
      <Link to="/admin/invoices/add">
        <Button className="btn-add-invoice">Add+</Button>
      </Link>
      <div className="list-admin-invoice d-flex justify-content-around">
        <span className="arrow-prev" onClick={handlePrevPage}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </span>
        <Table hover className="table-light table-list-invoices">
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã hóa đơn</th>
              <th>IssuedDate</th>
              <th>ShippingAddress</th>
              <th>ShippingPhone</th>
              <th>Total</th>
              <th>Trạng thái đơn hàng</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices &&
              invoices.length > 0 &&
              invoices.map((invoice, index) => {
                return (
                  <tr key={index}>
                    <td>{(page - 1) * 10 + (index + 1)}</td>
                    <td>{invoice.code}</td>
                    <td>
                      <Moment parse="YYYY-MM-DD HH:mm">
                        {invoice.issuedDate}
                      </Moment>
                    </td>
                    <td>{invoice.shippingAddress}</td>
                    <td>{invoice.shippingPhone}</td>
                    <td>{invoice.total.toLocaleString("VN-vi")}VNĐ</td>
                    <td>
                      <Form.Select
                        value={invoice.invoiceStatus.id}
                        aria-label="Default select example"
                        onChange={(e) =>
                          handleChangeStatusInvoice(e, invoice.id)
                        }
                      >
                        <option value={1}>Đã đặt</option>
                        <option value={2}>Đang giao</option>
                        <option value={3}>Đã giao</option>
                        <option value={4}>Đã thanh toán</option>
                        <option value={5}>Đã hủy</option>
                      </Form.Select>
                    </td>
                    <td className="icon-action">
                      <FontAwesomeIcon
                        className="text-danger mx-3 icon-action"
                        icon={faTrash}
                        onClick={() => {
                          setInvoiceDetail(invoice);
                          // setTypeModal(false);
                          setShowModal(true);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        <span className="arrow-prev" onClick={handleNextPage}>
          <FontAwesomeIcon icon={faChevronRight} />
        </span>
      </div>

      {showModal && (
        <ModalDeleteInvoice
          setShowModal={setShowModal}
          data={invoiceDetail}
          handleDeleteInvoice={handleDeleteInvoice}
        />
      )}
    </>
  );
};
export default ListInvoice;
