import { combineReducers } from "redux";
const INITIAL_STATE = {
  user: null,
  userEvents: [],
  todaysEvents: [],
  monthlyEvents: [],
  selectedMonth: new Date()
};

const getStateFromLocal = (user, state) => {
  let finalState = state;
  const store = JSON.parse(localStorage.getItem("store"));
  if (store) {
    if (store.user.sub === user.sub) {
      finalState["userEvents"] = store["userEvents"];
    }
  }

  return finalState;
};

const mainReducer = (state = INITIAL_STATE, action) => {
  let events = state.userEvents;
  switch (action.type) {
    case "LOG_IN_SUCCESS":
      const user = action.payload;
      const _state = getStateFromLocal(user, state);
      return { ..._state, user };

    case "SUBMIT_EVENT":
      const newEvent = action.payload.event;
      events.push(newEvent);

      localStorage.setItem(
        "store",
        JSON.stringify({ ...state, userEvents: events })
      );

      return {
        ...state,
        userEvents: events
      };

    case "GET_TODAYS_EVENTS":
      let todaysEvents = events.filter(e => e.date === action.payload);
      return {
        ...state,
        todaysEvents
      };

    case "LOAD_MONTHLY_EVENTS":
      let monthlyEvents = events.filter(
        e => Number(e.date.split("/")[0]) === action.payload + 1
      );

      return {
        ...state,
        monthlyEvents
      };

    case "SET_MONTH":
      return {
        ...state,
        selectedMonth: action.payload
      };

    case "DELETE_EVENT":
      let indexOfEvent = events.findIndex(e => e.id === action.payload.id);
      let userEvents = events;
      userEvents.splice(indexOfEvent, 1);

      localStorage.setItem("store", JSON.stringify({ ...state, userEvents }));

      return {
        ...state,
        userEvents
      };

    case "UPDATE_EVENT":
      let indexToUpdate = events.findIndex(e => e.id === action.payload.id);
      let usrEvents = events;
      usrEvents[indexToUpdate] = action.payload;

      localStorage.setItem(
        "store",
        JSON.stringify({ ...state, userEvents: usrEvents })
      );

      return {
        ...state,
        userEvents: usrEvents
      };

    default:
      return state;
  }
};

export default combineReducers({ mainReducer });
