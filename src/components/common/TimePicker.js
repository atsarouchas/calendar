import React from "react";

class TimePicker extends React.Component {
  state = { hour: "00", minute: "00" };

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        hour: nextProps.value.split(":")[0],
        minute: nextProps.value.split(":")[1]
      });
    }
  }

  getHours = () => {
    return [...Array(24).keys()].map(hour => {
      return (
        <option value={hour} key={hour}>
          {hour.toString().length === 1 ? `0${hour}` : hour}
        </option>
      );
    });
  };

  getMinutes = () => {
    return [...Array(60).keys()].map(min => {
      return (
        <option value={min} key={min}>
          {min.toString().length === 1 ? `0${min}` : min}
        </option>
      );
    });
  };

  setTime = (e, value) => {
    this.setState(
      {
        [value]: e.target.value
      },
      () => {
        this.props.onChange(`${this.state.hour}:${this.state.minute}`);
      }
    );
  };

  render() {
    return (
      <div className="two fields">
        <div className="two wide field">
          <label>HH</label>
          <select
            className="ui dropdown"
            onChange={e => this.setTime(e, "hour")}
            value={this.state.hour}
          >
            {this.getHours()}
          </select>
        </div>
        <div className="two wide field">
          <label>mm</label>
          <select
            className="ui dropdown"
            onChange={e => this.setTime(e, "minute")}
            value={this.state.minute}
          >
            {this.getMinutes()}
          </select>
        </div>
      </div>
    );
  }
}

export default TimePicker;
