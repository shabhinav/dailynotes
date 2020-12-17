import React, { useEffect, useState } from "react";
import "./Sidedraw.scss";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import { withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";

let sideDrawClasses = "side-drawer";
function Sidedraw(props) {
  useEffect(() => {
    if (props.show) {
      sideDrawClasses = "side-drawer open";
    }
  });

  const onClickHandler = (type) => {
    props.saving();
    if (type === "createnew") {
      props.history.push("/");
      props.showSidedrawHandler();
    }
    if (type === "viewAllNote") {
      setTimeout(() => {
        props.history.push("/viewAll");
        props.showSidedrawHandler();
      }, 10);
    }
  };

  return (
    <div className={sideDrawClasses}>
      <div className="sidedrawer_header"></div>
      <div className="newNote" onClick={() => onClickHandler("createnew")}>
        <span>
          <AddCircleOutlineIcon />
        </span>
        <span>New Entry</span>
      </div>
      <div
        className="viewAllNote"
        onClick={() => onClickHandler("viewAllNote")}
      >
        <span>
          <FormatListBulletedIcon />
        </span>
        <span>View All Enteries</span>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    saving: () => dispatch({ type: "SAVING", savingData: true }),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(Sidedraw));
