import React from "react";
import TimePicker from "../common/TimePicker";

class EventForm extends React.Component {
  state = {
    newEvent: {
      title: "",
      attendees: "",
      place: "",
      description: "",
      date: this.props.date,
      time: "00:00"
    }
  };

  componentDidMount() {
    if (this.props.selectedEvent) {
      this.setState({
        newEvent: this.props.selectedEvent
      });
    }
  }

  onChange = (field, e) => {
    let newEvent = this.state.newEvent;
    newEvent[field] = e.target.value;
    this.setState({
      newEvent
    });
  };

  changeTime = time => {
    let newEvent = this.state.newEvent;
    newEvent["time"] = time;
    this.setState({
      newEvent
    });
  };

  render() {
    const { newEvent } = this.state;
    return (
      <form
        className="ui form"
        onSubmit={() => {
          this.props.submitEvent(this.state.newEvent);
        }}
      >
        <div className="field">
          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={newEvent.title}
            onChange={e => this.onChange("title", e)}
          />
        </div>
        <div className="field">
          <label>Attendees</label>
          <input
            type="text"
            name="attendees"
            placeholder="Attendees"
            value={newEvent.attendees}
            onChange={e => this.onChange("attendees", e)}
          />
        </div>
        <div className="field">
          <div className="field">
            <label>Place</label>
            <input
              type="text"
              name="place"
              placeholder="Place"
              value={newEvent.place}
              onChange={e => this.onChange("place", e)}
            />
          </div>
          <div className="field">
            <label>Time</label>
            <TimePicker onChange={this.changeTime} value={newEvent.time} />
          </div>
          <div className="field">
            <label>Description</label>
            <textarea
              rows="2"
              value={newEvent.description}
              onChange={e => this.onChange("description", e)}
            />
          </div>
        </div>
        <button className="ui button" type="submit">
          Save Event
        </button>
        <button
          onClick={this.props.back}
          className="ui basic button"
          type="cancel"
        >
          Cancel
        </button>
      </form>
    );
  }
}

export default EventForm;
