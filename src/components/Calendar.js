import React from "react";
import dateFns from "date-fns";
import Header from "./common/Header";
import { connect } from "react-redux";
import { loadMonthlyEvents, setMonth } from "../actions";

class Calendar extends React.Component {
  state = {
    currentDate: new Date()
  };

  componentDidMount() {
    this.props.loadMonthlyEvents(this.props.user.selectedMonth.getMonth());
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.user.selectedMonth !== this.props.user.selectedMonth ||
      nextProps.user.user !== this.props.user.user
    ) {
      this.props.loadMonthlyEvents(nextProps.user.selectedMonth.getMonth());
    }
  }

  getDayNames = () => {
    const dateFormat = "dd";
    const currentMonth = this.props.user.selectedMonth.getMonth();
    let startDate = dateFns.startOfWeek(currentMonth);

    const days = [...Array(7).keys()];

    return days.map((day, index) => {
      return (
        <div className="column ui center aligned segment" key={index}>
          {dateFns.format(dateFns.addDays(startDate, day), dateFormat)}
        </div>
      );
    });
  };

  getMonthDays = () => {
    const { selectedMonth } = this.props.user;
    const startMonth = dateFns.startOfMonth(selectedMonth);
    const endMonthDay = dateFns.endOfMonth(selectedMonth);
    const startOfWeek = dateFns.startOfWeek(startMonth);
    const daysInMonth = dateFns.getDaysInMonth(selectedMonth);

    const firstDay = this.makeDayObject(startMonth);

    let monthDays = [firstDay];

    for (let i = 1; i < daysInMonth; i++) {
      let day = dateFns.addDays(startMonth, i);
      monthDays.push(this.makeDayObject(day));
    }

    let extraDaysStart = [];
    let extraDaysEnd = [];

    if (monthDays[0].day !== 0) {
      extraDaysStart = [this.makeDayObject(startOfWeek)];

      for (let i of [...Array(monthDays[0].day).keys()]) {
        if (i > 0) {
          let day = dateFns.addDays(startOfWeek, i);
          extraDaysStart.push(this.makeDayObject(day));
        }
      }
    }

    if (monthDays[daysInMonth - 1].day !== 6) {
      for (let i of [...Array(6 - monthDays[daysInMonth - 1].day).keys()]) {
        let day = dateFns.addDays(endMonthDay, i + 1);
        extraDaysEnd.push(this.makeDayObject(day));
      }
    }

    let totalVisibleDays = [...extraDaysStart, ...monthDays, ...extraDaysEnd];

    const weeks = [];
    let index = 0;

    while (index < totalVisibleDays.length) {
      weeks.push(totalVisibleDays.slice(index, index + 7));
      index += 7;
    }

    return weeks.map((week, index) => {
      const { selectedMonth } = this.props.user;
      const weekDays = week.map((day, index) => {
        let style = { padding: 5, height: 80, overflow: "hidden" };
        day.month === selectedMonth.getMonth()
          ? (style["fontWeight"] = "bold")
          : (style["opacity"] = 0.4);

        const isToday =
          day.month === this.state.currentDate.getMonth() &&
          day.date === this.state.currentDate.getDate() &&
          day.year === this.state.currentDate.getFullYear() ? (
            <div className="ui top attached blue label small">{day.date}</div>
          ) : null;

        const dayEvents = this.props.user.monthlyEvents.filter(e => {
          let eventDate = e.date.split("/");
          return (
            Number(eventDate[1]) === day.date &&
            Number(eventDate[0]) === day.month + 1 &&
            Number(eventDate[2]) === day.year
          );
        });

        const renderDayEvents = dayEvents.map(e => {
          return (
            <div
              className="ui mini label"
              style={{ display: "block", margin: 1 }}
              key={e.id}
            >
              {e.title} {" - "}
              {e.time}
            </div>
          );
        });

        return (
          <div
            className="column ui left aligned segment"
            key={index}
            style={style}
            onClick={() => {
              this.props.goToDay(day);
            }}
          >
            {day.date}
            {renderDayEvents}
            {isToday}
          </div>
        );
      });

      return (
        <div className="seven columns row" style={{ padding: 0 }} key={index}>
          {weekDays}
        </div>
      );
    });
  };

  makeDayObject(day) {
    return {
      date: day.getDate(),
      day: day.getDay(),
      month: day.getMonth(),
      year: day.getFullYear()
    };
  }

  nextMonth = () => {
    this.props.setMonth(dateFns.addMonths(this.props.user.selectedMonth, 1));
  };

  previousMonth = () => {
    this.props.setMonth(dateFns.subMonths(this.props.user.selectedMonth, 1));
  };

  render() {
    const { selectedMonth } = this.props.user;
    const dateFormat = "MMMM YYYY";

    return (
      <div className="ui grid">
        <Header
          leftButton={this.previousMonth}
          rightButton={this.nextMonth}
          title={dateFns.format(selectedMonth, dateFormat).toUpperCase()}
        />
        <div className="seven columns row">{this.getDayNames()}</div>
        {this.getMonthDays()}
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
  { loadMonthlyEvents, setMonth }
)(Calendar);
