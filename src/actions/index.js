export const logIn = user => {
  return {
    type: "LOG_IN_SUCCESS",
    payload: user
  };
};

export const submitEvent = event => {
  return {
    type: "SUBMIT_EVENT",
    payload: {
      event
    }
  };
};

export const deleteEvent = event => {
  return {
    type: "DELETE_EVENT",
    payload: event
  };
};

export const updateEvent = event => {
  return {
    type: "UPDATE_EVENT",
    payload: {
      event
    }
  };
};

export const getTodaysEvents = date => {
  return {
    type: "GET_TODAYS_EVENTS",
    payload: date
  };
};

export const loadMonthlyEvents = month => {
  return {
    type: "LOAD_MONTHLY_EVENTS",
    payload: month
  };
};

export const setMonth = month => {
  return {
    type: "SET_MONTH",
    payload: month
  };
};
