import React from "react";
import "./Backdrop.scss";

function Backdrop({ backdropClickHandler }) {
  return <div className="backdrop" onClick={backdropClickHandler}></div>;
}

export default Backdrop;
