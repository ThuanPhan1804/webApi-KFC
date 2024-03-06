import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Header = ({ setShow }) => {
  const navigate = useNavigate();
  return (
    <nav
      className="sb-topnav navbar navbar-expand navbar-warning"
      style={{ position: "sticky", top: "0", backgroundColor: "#ff9f9f",zIndex:10}}
    >
      <Container>
      <button
          className="btn btn-sm order-1 order-lg-0 me-4 me-lg-0"
          style={{ fontSize: "20px" }}
          onClick={() => setShow(true)}
          id="sidebarToggle"
          href="#!"
        >
          <i className="fas fa-bars"></i>
        </button>
        <Link to="/" className="navbar-brand ps-3" href="index.html">
          <img
            src="/images/kfc-logo-mobile.svg"
            className="d-block"
            style={{ width: "100px", height: "40px" }}
          ></img>
        </Link>
        
        <p
          style={{
            cursor: "pointer",
            fontSize:"18px",
            textDecoration:"underline"
          }}
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
        >
          Đăng xuất
        </p>
      </Container>
    </nav>
  );
};
export default Header;
