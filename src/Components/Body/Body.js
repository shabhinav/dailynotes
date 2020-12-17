import React, { Component } from "react";
import "./Body.scss";
import momemt from "moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { connect } from "react-redux";

class Body extends Component {
  state = {
    currentdate: new Date(),
    saving: false,
    content: "",
    heading: "",
  };

  dateHandler = async (date) => {
    await this.setState({
      currentdate: date,
    });
  };

  async componentDidUpdate() {
    let data = [...this.props.data];
    let obj = {};
    obj.id = Math.round(Math.random() * 1000);
    obj.heading = this.state.heading;
    obj.content = this.state.content;
    obj.date = this.state.currentdate;
    obj.weeknum = momemt(this.state.currentdate).week();
    obj.month = momemt(this.state.currentdate).month() + 1;
    obj.year = momemt(this.state.currentdate).year();
    data.push(obj);
    if (this.props.saved) {
      if (this.state.content && this.state.heading) {
        this.props.noteData(data);
        await this.setState({
          content: "",
          heading: "",
          currentdate: new Date(),
        });
      }
      this.props.saving();
    }
  }

  dataHandler = async (e, type) => {
    if (type === "title") {
      await this.setState({
        heading: e.target.value,
      });
    } else {
      await this.setState({
        content: e.target.value,
      });
    }
    setTimeout(async () => {
      this.setState({
        saving: true,
      });
    }, 1000);
    setTimeout(async () => {
      this.setState({
        saving: false,
      });
    }, 3000);
  };

  render() {
    return (
      <div className="body ">
        <div className="inner_body container mt-3 shadow">
          <div className="body_saving mb-2">
            <span
              style={{
                visibility: `${this.state.saving ? "visible" : "hidden"}`,
              }}
            >
              Saving Now....
            </span>
          </div>
          <div className="body_currentDate">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                value={this.state.currentdate}
                onChange={this.dateHandler}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
          <div className="body_title mt-3">
            <input
              className="bodyTitle_inputfield"
              type="text"
              placeholder="Enter Title"
              onChange={(e) => this.dataHandler(e, "title")}
              value={this.state.heading}
            />
          </div>
          <div className="bodyTextArea_container">
            <textarea
              className="body_textArea mt-5"
              placeholder="Your Entry Here ......"
              onChange={(e) => this.dataHandler(e, "content")}
              value={this.state.content}
            ></textarea>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    saved: state.saving,
    data: state.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saving: () => dispatch({ type: "SAVING", savingData: false }),
    noteData: (data) => dispatch({ type: "DATA", noteData: data }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Body);
