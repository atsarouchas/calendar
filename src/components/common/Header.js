import React from "react";

const Header = props => {
  return (
    <div className="one column row">
      <div className="column blue center aligned" style={{ padding: 40 }}>
        {props.leftButton ? (
          <button
            className="ui icon button basic tiny inverted black left floated"
            onClick={props.leftButton}
          >
            <i className="angle left icon" />
          </button>
        ) : null}
        <span style={{ fontSize: 40 }}>{props.title}</span>
        {props.rightButton ? (
          <button
            className="ui icon button basic tiny inverted black right floated"
            onClick={props.rightButton}
          >
            <i className="angle right icon" />
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
