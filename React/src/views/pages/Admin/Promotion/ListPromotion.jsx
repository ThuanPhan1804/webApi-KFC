import { Table } from "react-bootstrap";
import "./ListPromotion.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPromotion } from "../../../../services/promotionService";
import { Button } from "react-bootstrap";
// import ModaldeletePromotion from "../../../../components/MoadlDelete/ModaldeletePromotion";
import { deletePromotion } from "../../../../services/promotionService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditPromotion from "./EditPromotion";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import ModalDeletePromotion from "../../../../components/MoadlDelete/ModalDeletePromotion";
// import EditPromotion from "./EditPromotion";
const ListPromotion = () => {
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [promotionDetail, setPromotionDetail] = useState(false);
  const [typeModal, setTypeModal] = useState(false);
  const [promotions, setpromotions] = useState([]);
  useEffect(() => {
    getListPromotion();
  }, []);
  const getListPromotion = async () => {
    const results = await getAllPromotion();
    if (results && results.length > 0) {
      setpromotions(results);
      console.log(results);
    }
  };
  const handleDeletePromotion = async (id) => {
    try {
      await deletePromotion(id);
      getListPromotion();
      setShowModal(false);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div className="edit-promotion-header d-flex justify-content-between">
      <h1 className="list-titli">Danh sách khuyến mãi</h1>
      <Link to="/admin/promotion/add">
        <Button className="btn-add-promotion px-5 py-3" style={{backgroundColor:"green",border:"none"}}>Add+</Button>
      </Link>
      </div>
      
      <Table hover className="table-light table-list-promotions">
        <thead>
          <tr>
            <th>STT</th>
            <th>Name</th>
            <td>Description</td>
            <th>Percent</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {promotions &&
            promotions.length > 0 &&
            promotions.map((promotion, index) => {
              return (
                <tr key={index}>
                  <td>{(page - 1) * 10 + (index + 1)}</td>
                  <td>{promotion.name}</td>
                  <td>{promotion.description}</td>
                  <td>{promotion.percent*100}%</td>
                  <td className="icon-action">
                    <FontAwesomeIcon
                      className="text-danger icon-action"
                      icon={faTrash}
                      onClick={() => {
                        setPromotionDetail(promotion);
                        setTypeModal(false);
                        setShowModal(true);
                      }}
                    />
                    <FontAwesomeIcon
                      className="text-warning mx-4 icon-action"
                      icon={faPenToSquare}
                      onClick={() => {
                        setPromotionDetail(promotion);
                        setTypeModal(true);
                        setShowModal(true);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      {showModal && (
        <div className="div-modal">
          {typeModal ? (
            <EditPromotion
              data={promotionDetail}
              setShowModal={setShowModal}
              getListPromotion={getListPromotion}
            />
          ) : (
            <ModalDeletePromotion
              setShowModal={setShowModal}
              data={promotionDetail}
              handleDeletePromotion={handleDeletePromotion}
            />
          )}
        </div>
      )}
    </>
  );
};
export default ListPromotion;
