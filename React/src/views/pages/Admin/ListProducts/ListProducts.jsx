import { Table } from "react-bootstrap";
import "./ListProducts.scss";
import { useEffect, useState } from "react";
import {
  deleteProduct,
  getAllProduct,
  getProductPage,
} from "../../../../services/productService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ModalDelete from "../../../../components/MoadlDelete/ModalDelete";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import EditProduct from "./EditProduct";
const ListProduct = () => {
  const [page, setPage] = useState(1);
  const [productDetail, setProductDetail] = useState({});
  const [lastPage, setLastPage] = useState(false);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [typeModal, setTypeModal] = useState(false);
  useEffect(() => {
    getListProduct();
  }, []);

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      getListProduct();
      setShowModal(false);
    } catch (e) {
      console.log(e);
    }
  };
  const handleNextPage = async () => {
    if (!lastPage) {
      setPage((prev) => (prev += 1));
      const result = await getProductPage(page + 1);
      if (result && result.length > 0) {
        setProducts(result);
        setLastPage(false);
      } else {
        setPage(prev => prev -= 1)
        setLastPage(true);
      }
    }
  };
  const handlePrevPage = async () => {
    if (page > 1) {
      setPage((prev) => (prev -= 1));
      const result = await getProductPage(page - 1);
      if (result && result.length > 0) {
        setProducts(result);
        setLastPage(false);
      } else {
        setLastPage(true);
      }
    }
  };

  const getListProduct = async () => {
    const results = await getProductPage(page);
    if (results && results.length > 0) {
      setProducts(results);
    }
  };
  return (
    <>
      <div className="list-products-header container">
        <h1 className="list-title">Danh sách sản phẩm:</h1>
        <Link to="/admin/product/add">
          <Button className="btn-add-product">+ Add</Button>
        </Link>
      </div>
      <div className="list-products">
        <span className="arrow-prev" onClick={handlePrevPage}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </span>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>STT</th>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Danh mục</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.length > 0 &&
              products.map((product, index) => {
                const price = product.price.toLocaleString("vi-VN");
                return (
                  <>
                    <tr key={index}>
                      <td>{(page - 1) * 8 + (index + 1)}</td>
                      <td className="image">
                        <img
                          src={`https://localhost:7082/images/product/${product.image}`}
                        ></img>
                        <p>{product.name}</p>
                      </td>
                      <td>{price}VNĐ</td>
                      <td>{product.description}</td>
                      <td>{product.category?.name}</td>
                      <td className="icon-action">
                        <FontAwesomeIcon
                          className="text-danger icon-action"
                          icon={faTrash}
                          onClick={() => {
                            setProductDetail(product);
                            setTypeModal(false)
                            setShowModal(true);
                            
                          }}
                        />
                        <FontAwesomeIcon
                          className="text-warning mx-4 icon-action"
                          icon={faPenToSquare}
                          onClick={() => {
                            setProductDetail(product);
                            setTypeModal(true)
                            setShowModal(true);
                          }}
                        />
                      </td>
                      
                    </tr>
                  </>
                );
              })}
          </tbody>
        </Table>
        <span className="arrow-next" onClick={handleNextPage}>
          <FontAwesomeIcon icon={faChevronRight} />
        </span>
      </div>
      {showModal && (
        <div className="div-modal">
          {typeModal ? (
            <EditProduct data={productDetail} setShowModal={setShowModal} getListProduct = {getListProduct}/>
          ) : (
            <ModalDelete
              setShowModal={setShowModal}
              data={productDetail}
              handleDeleteProduct={handleDeleteProduct}
            />
          )}
        </div>
      )}
    </>
  );
};
export default ListProduct;
