import { Button, Container } from "react-bootstrap";
import "./NoPage.scss"
import { Link } from "react-router-dom";
const NoPage = () => {
  return (
    <div className="no-page">
    <Container>
<div className="div-img">
        <img src="/—Pngtree—error 404 page not found_6501259.png"></img>
      </div>
      <div className="no-page-title">
        Không thể tìm thấy trang này!
      </div>
      <Button><Link to ="/">GO HOME</Link></Button>
    </Container>
      
    </div>
  );
};
export default NoPage;
