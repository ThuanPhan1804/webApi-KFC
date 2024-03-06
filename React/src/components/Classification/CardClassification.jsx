import { Card } from "react-bootstrap";
import "./CardClassification.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { ActiveContext } from "../../views/App";
import React from "react";
const CardClassification = ({classification}) =>{   
  const { active, setActive, setClick } = React.useContext(ActiveContext);

    return(
        <div className="card-classification col-lg-3 col-md-4 col-sm-6" >
        <div className="card-img">
            <img src={`/images/Category/${classification.img}`}/>
        </div>
            <Card.Body>
                <h3>{classification.name}</h3>
            </Card.Body>

        </div>
    )
}
export default CardClassification;