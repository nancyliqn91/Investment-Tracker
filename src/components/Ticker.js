import React from "react";
import PropTypes from "prop-types";

function Ticker(props){

  return (
    <React.Fragment>
      <div onClick = {() => props.whenTickerClicked(props.id)}>
        <h3>Ticker: {props.name}</h3>
        <p><em>{props.formattedWaitTime}</em></p>
        <hr/>
      </div>
    </React.Fragment>
  );
}

Ticker.propTypes = {
  name: PropTypes.string,

  id: PropTypes.string,
  whenTickerClicked: PropTypes.func,
  formattedWaitTime: PropTypes.string
}

export default Ticker;