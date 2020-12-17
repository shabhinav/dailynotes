import React, { useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import "./Navigation.scss";
import Sidedraw from "./sidebar/Sidedraw";
import Backdrop from "./sidebar/Backdrop";

function Navigation() {
  const [showSidedraw, setShowSidedraw] = useState(false);

  const showSidedrawHandler = () => {
    setShowSidedraw(!showSidedraw);
    // console.log(showSidedraw);
  };

  const backdropClickHandler = () => {
    setShowSidedraw(false);
  };

  return (
    <div className="navbar">
      <MenuIcon className="navbar_menuOption" onClick={showSidedrawHandler} />
      {showSidedraw ? (
        <Sidedraw
          show={showSidedraw}
          showSidedrawHandler={showSidedrawHandler}
        />
      ) : null}
      {showSidedraw ? (
        <Backdrop backdropClickHandler={backdropClickHandler} />
      ) : null}
    </div>
  );
}

export default Navigation;
