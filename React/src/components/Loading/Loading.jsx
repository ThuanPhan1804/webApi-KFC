import Spinner from 'react-bootstrap/Spinner';
import "./Loading.scss"
function Loading() {
  return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    
  );
}

export default Loading;