import React, { Component } from "react";
import calendar from "../assets/calendar-512.png";
import { connect } from "react-redux";
import { config } from "../config";

const logoutURL = config.logoutURL;

class Login extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`);
  }

  login = () => {
    this.props.auth.login();
  };

  logout = () => {
    this.props.auth.logout();
  };

  render() {
    const { user } = this.props;
    let { isAuthenticated } = this.props.auth;
    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      textAlign: "center"
    };

    return (
      <div className="ui secondary menu right">
        {!isAuthenticated() && (
          <div style={style}>
            <img className="ui small image" src={calendar} alt="calendar" />
            <h1>Calendar</h1>
            <div
              className="ui massive blue button fluid"
              onClick={() => {
                this.login();
              }}
            >
              Log In
            </div>
          </div>
        )}
        {isAuthenticated() && (
          <div className="ui container">
            <div className="ui right menu">
              <div className="ui blue image label">
                <img src={user.user ? user.user.picture : null} alt="user" />
                {user.user ? user.user.nickname : ""}
              </div>
              <a
                href={logoutURL}
                className="ui basic blue button right floated"
                onClick={() => {
                  this.logout();
                }}
              >
                Log Out
              </a>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.mainReducer
  };
};

export default connect(
  mapStateToProps,
  {}
)(Login);
