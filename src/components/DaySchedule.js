import React from "react";
import dateFns from "date-fns";
import Header from "./common/Header";
import EventForm from "./common/EventForm";
import {
  submitEvent,
  getTodaysEvents,
  deleteEvent,
  updateEvent
} from "../actions";
import { connect } from "react-redux";

class DaySchedule extends React.Component {
  state = { date: null, view: "daySchedule", selectedEvent: null };

  componentDidMount() {
    const { selectedDay } = this.props;
    const date = new Date(
      selectedDay.year,
      selectedDay.month,
      selectedDay.date
    );

    this.setState({
      date: date
    });

    this.props.getTodaysEvents(date.toLocaleDateString());
  }

  changeView = view => {
    this.setState({
      view
    });
  };

  newEvent = () => {
    this.changeView("eventForm");
  };

  uuid() {
    return (
      "_" +
      Math.random()
        .toString(36)
        .substr(2, 9)
    );
  }

  submitEvent = e => {
    let eventObj = e;
    eventObj["user"] = this.props.user.user.sub;
    if (eventObj["id"]) {
      this.props.updateEvent(eventObj);
    } else {
      eventObj["id"] = this.uuid();
      this.props.submitEvent(eventObj);
    }
    this.changeView("daySchedule");
    this.props.getTodaysEvents(this.state.date.toLocaleDateString());
  };

  deleteEvent = e => {
    this.props.deleteEvent(e);
    this.props.getTodaysEvents(this.state.date.toLocaleDateString());
  };

  editEvent = e => {
    this.setState({ selectedEvent: e });
    this.changeView("eventForm");
  };

  getEvents(events) {
    return events.map((e, index) => {
      return (
        <div className="ui card" key={index}>
          <div className="content">
            <div className="header">
              {e.title}
              <div className="right floated meta">{e.time}</div>
            </div>
          </div>
          <div className="content">
            <div>
              <b>Description:</b>
            </div>
            <p>{e.description}</p>
            <div>
              <b>Attendees:</b>
            </div>
            <p>{e.attendees}</p>
            <div>
              <b>Place:</b>
            </div>
            <p>{e.place}</p>
          </div>
          <div className="extra content">
            <div className="ui two buttons">
              <div
                className="ui basic green button"
                onClick={() => this.editEvent(e)}
              >
                Edit
              </div>
              <div
                className="ui basic red button"
                onClick={() => this.deleteEvent(e)}
              >
                Delete Event
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  renderContent() {
    const { view } = this.state;
    const { todaysEvents } = this.props.user;
    const now = new Date();

    if (view === "eventForm") {
      return (
        <EventForm
          date={this.state.date.toLocaleDateString()}
          back={() => {
            this.changeView("daySchedule");
          }}
          submitEvent={this.submitEvent}
          selectedEvent={this.state.selectedEvent}
        />
      );
    } else if (view === "daySchedule" && todaysEvents.length === 0) {
      return (
        <div className="ui placeholder segment">
          <div className="ui icon header">
            <i className="calendar plus icon" />
            No events in this day
          </div>
          {now <= this.state.date || dateFns.isSameDay(now, this.state.date) ? (
            <div className="ui primary button" onClick={() => this.newEvent()}>
              Add Event
            </div>
          ) : null}
        </div>
      );
    } else if (view === "daySchedule" && todaysEvents.length > 0) {
      return (
        <div>
          <button className="fluid ui button" onClick={() => this.newEvent()}>
            <i className="calendar plus icon" />
            Add Event
          </button>
          <div className="ui cards">{this.getEvents(todaysEvents)}</div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="ui grid">
        <Header
          leftButton={() => {
            this.props.switchView("calendar");
          }}
          title={dateFns.format(this.state.date, "dddd, DD MMMM YYYY")}
        />
        <div className="one column row">
          <div
            className="ui segment"
            style={{ width: "100%", height: "70vh", overflow: "scroll" }}
          >
            {this.renderContent()}
          </div>
        </div>
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
  { submitEvent, getTodaysEvents, deleteEvent, updateEvent }
)(DaySchedule);
