import { useEffect, useState } from "react";
import "./Invoice.scss";
import { getInvoiceById } from "../../../services/invoicesService";
import ListInvoice from "../../../components/Invoice/ListInvoice";
import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { getAllNewProduct } from "../../../services/productService";
import ListProduct from "../../../components/Product/ListProduct";
const Invoice = () => {
  const navigateInvoice = [
    {
      id: 1,
      name: "Đã đặt",
    },
    {
      id: 2,
      name: "Đang giao",
    },
    {
      id: 3,
      name: "Đã giao",
    },
    {
      id: 4,
      name: "Đã thanh toán",
    },
    {
      id: 5,
      name: "Đã hủy",
    },
  ];
  const [listInvoice, setListInvoice] = useState([]);
  const [typeInvoice, setTypeInvoice] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [newProduct, setNewProudct] = useState([]);
  const getNewProduct = async()=>{
    const newProduct = await getAllNewProduct();
    if (newProduct) {
      setNewProudct(newProduct);
    }
  }
  useEffect( () => {
   getNewProduct();
   return () => getNewProduct();
  }, []);
  useEffect( () => {
   getInvoice();
      return () => getInvoice();
  }, []);
  const getInvoice = async () =>{
    const id = localStorage.getItem("userId");
    const result = await getInvoiceById(id);
    if (result) {
      setListInvoice(result);
      let listInvoiceType = result.filter((p) => p.invoiceStatusId === 1);
      setTypeInvoice(listInvoiceType);
    }
  }
  useEffect(() => {
    let listInvoiceType = listInvoice.filter(
      (p) => p.invoiceStatusId === activeTab + 1
    );
    setTypeInvoice(listInvoiceType);
    return () => setTypeInvoice(listInvoiceType)
  }, [activeTab]);
  return (
    <div className="invoice">
      <div className="invoice-navigate">
        {navigateInvoice.map((item, index) => {
          return (
            <span
              className={
                activeTab === index ? "active-tab span-invoice" : "span-invoice"
              }
              onClick={() => setActiveTab(index)}
            >
              <h1> {item.name}</h1>
            </span>
          );
        })}
      </div>
      {typeInvoice && typeInvoice.length > 0 ? (
        <div className="list-invoice container">
          <ListInvoice data={typeInvoice} />
        </div>
      ) : (
        <div className="no-product">
          <Container>
            <div className="div-img">
              <img src="/images/no-found-product.webp"></img>
            </div>
            <div className="no-page-title">Không có hóa đơn nào!</div>
          </Container>
        </div>
      )}
      <div className="classification-item container">
        <h1>Các món mới</h1>
        <div className="row">
          <ListProduct products={newProduct}></ListProduct>
        </div>
      </div>
    </div>
  );
};
export default Invoice;
