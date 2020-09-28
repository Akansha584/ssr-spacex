import React from 'react';
import "./card-image.css";
import '../styles.css';

const CardImage = (props) => {
  return (
    <div>
      <div className="imageContainer fr jtc">
        <img src={props.imageLink} alt={props.missionName} className="cardImage" />
      </div>
      <h3 className="fs_16 imageTitle " style={{ maxWidth: 'fit-content' }}>{`${props.missionName}#${props.flightNumber}`}</h3>
    </div>
  );
}


export default CardImage;
