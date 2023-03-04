import React from "react";
import ReactCardFlip from "react-card-flip";
import useToggleValue from "../../hooks/useToggleValue";
import CardBack from "./CardBack";
import CardFront from "./CardFront";

const Card = ({ cardInfo, index }) => {
  const { value: isFlipped, handleToggleValue: handleFlipped } =
    useToggleValue();

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
      <CardFront
        onClick={handleFlipped}
        cardInfo={cardInfo}
        index={index}
      ></CardFront>
      <CardBack onClick={handleFlipped} cardInfo={cardInfo}></CardBack>
    </ReactCardFlip>
  );
};

export default Card;
