import { Table } from "react-bootstrap";
import "./ListUsers.scss";
import { useEffect, useState } from "react";
import { getAllAccount } from "../../../../services/accountService";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import ModalDelete from "../../../../components/MoadlDelete/ModalDelete";
import { deleteAccount } from "../../../../services/userService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import EditAccount from "./EditAccount";
const ListUsers = () => {
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [accountDetail, setAccountDetail] = useState(false);
  const [typeModal, setTypeModal] = useState(false);
  const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    getListAccount();
  }, []);
  const getListAccount = async () => {
    const results = await getAllAccount();
    if (results && results.length > 0) {
      setAccounts(results);
      console.log(results);
    }
  };
  const handleDeleteAccount = async (id) => {
    try {
      await deleteAccount(id);
      getListAccount();
      setShowModal(false);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
    <div className="list-title-header d-flex justify-content-between">
    <h1 className="list-title">Danh sách tài khoản</h1>
      
      <Link to="/admin/account/add">
        <Button className="btn-add-user" style={{padding:"12px 24px",backgroundColor:"green",border: "none"}}>Add+</Button>
      </Link>
    </div>
      
      <Table hover className="table-light table-list-users">
        <thead>
          <tr>
            <th>STT</th>
            <th>Email</th>
            <th>Fullname</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {accounts &&
            accounts.length > 0 &&
            accounts.map((account, index) => {
              return (
                <tr key={index}>
                  <td>{(page - 1) * 10 + (index + 1)}</td>
                  <td>{account.email}</td>
                  <td>{account.userName}</td>
                  <td>{account.phoneNumber}</td>
                  <td className="icon-action">
                    <FontAwesomeIcon
                      className="text-danger icon-action"
                      icon={faTrash}
                      onClick={() => {
                        setAccountDetail(account);
                        setTypeModal(false);
                        setShowModal(true);
                      }}
                    />
                    <FontAwesomeIcon
                      className="text-warning mx-4 icon-action"
                      icon={faPenToSquare}
                      onClick={() => {
                        setAccountDetail(account);
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
            <EditAccount
              data={accountDetail}
              setShowModal={setShowModal}
              getListAccount={getListAccount}
            />
          ) : (
            <ModalDelete
              setShowModal={setShowModal}
              data={accountDetail}
              handleDeleteAccount={handleDeleteAccount}
            />
          )}
        </div>
      )}
    </>
  );
};
export default ListUsers;
