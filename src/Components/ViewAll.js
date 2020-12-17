import React, { useState } from "react";
import { connect } from "react-redux";
import "./ViewAll.scss";
import FilterListIcon from "@material-ui/icons/FilterList";
import SortIcon from "@material-ui/icons/Sort";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import moment from "moment";

const weekDays = ["Sun", "Mon", "Wed", "Thu", "Fri", "Sat"];
const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function ViewAll(props) {
  const [data, setData] = useState(JSON.parse(JSON.stringify(props.data)));

  const deleteItemHandler = (index) => {
    let newData = JSON.parse(JSON.stringify(data));
    newData.splice(index, 1);
    setData(JSON.parse(JSON.stringify(newData)));
    props.noteData(newData);
  };

  const sortingHandler = (e) => {
    if (e.target.value === "Oldest") {
      let oldWiseSorted = props.data.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
      setData(JSON.parse(JSON.stringify(oldWiseSorted)));
    }
    if (e.target.value === "Newest") {
      let newWiseSorted = props.data.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
      return setData(JSON.parse(JSON.stringify(newWiseSorted)));
    }
  };

  const filteringHandler = (e) => {
    if (e.target.value === "week") {
      let week = props.data.filter(
        (week) => week.weeknum == moment(new Date()).week()
      );
      setData(week);
    }
    if (e.target.value === "month") {
      let month = props.data.filter(
        (month) => month.month == moment(new Date()).month() + 1
      );
      setData(month);
    }
    if (e.target.value === "year") {
      let year = props.data.filter(
        (year) => year.year == moment(new Date()).year()
      );

      setData(year);
    }
  };

  const editHandler = (id) => {
    props.history.push("/edit/" + id);
  };

  return (
    <div className="viewall">
      <div className="header">
        <div className="heading">
          <h1>View All Entries</h1>
        </div>
        <div className="conditions">
          <div className="filtering">
            <span>
              <FilterListIcon />
            </span>
            <span>
              <select className="form-control" onChange={filteringHandler}>
                <option>Recent</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </span>
          </div>
          <div className="sorting">
            <span>
              <SortIcon />
            </span>
            <span>
              <select className="form-control" onChange={sortingHandler}>
                <option>Recent</option>
                <option>Newest</option>
                <option>Oldest</option>
              </select>
            </span>
          </div>
        </div>
      </div>
      <div className="entries ">
        {data.map((data, index) => (
          <div key={index} className="entry container">
            <span className="entry_data">
              <p className="entry_heading">
                <strong>{data?.heading}</strong>
                <span className="pl-4" style={{ color: "black" }}>
                  <strong>
                    {data ? (
                      <span>
                        {weekDays[new Date(data.date).getDay().toString()] +
                          " ," +
                          month[new Date(data.date).getMonth().toString()] +
                          " " +
                          new Date(data.date).getDate().toString() +
                          " " +
                          new Date(data.date).getFullYear().toString()}
                      </span>
                    ) : null}
                  </strong>
                </span>
              </p>
              <p className="entry_content">{data?.content}</p>
            </span>
            <span>
              <EditIcon
                className="editIcon"
                onClick={() => editHandler(data?.id)}
              />
              <DeleteIcon
                className="deleteIcon"
                onClick={() => deleteItemHandler(index)}
              />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    noteData: (data) => dispatch({ type: "DATA", noteData: data }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewAll);
