import React from "react";
import Calendar from "./Calendar";
import DaySchedule from "./DaySchedule";
import { connect } from "react-redux";
import { logIn } from "../actions";

class Main extends React.Component {
  state = { view: "calendar", selectedDay: null };

  componentDidMount() {
    if (this.props.auth.isAuthenticated()) {
      const { userProfile, getProfile } = this.props.auth;
      if (!userProfile) {
        getProfile((err, profile) => {
          this.props.logIn(profile);
        });
      } else {
        this.props.logIn(userProfile);
      }
    }
  }

  goToDay = day => {
    this.setState({
      view: "daySchedule",
      selectedDay: day
    });
  };

  switchView = view => {
    this.setState({
      view
    });
  };

  renderContent() {
    if (this.state.view === "calendar")
      return <Calendar goToDay={this.goToDay} />;
    else if (this.state.view === "daySchedule")
      return (
        <DaySchedule
          selectedDay={this.state.selectedDay}
          switchView={this.switchView}
        />
      );
  }

  render() {
    return (
      <div className="ui container">
        {this.props.auth.isAuthenticated() ? this.renderContent() : null}
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
  { logIn }
)(Main);
