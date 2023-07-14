import React from "react";
import Ticker from "./Ticker";
import PropTypes from "prop-types";

function TickerList(props){

  return (
    <React.Fragment>
      <hr/>
      {props.tickerList.map((ticker) => {
        return <Ticker
          whenTickerClicked = { props.onTickerSelection }

          name={ticker.name}
          multiplier={ticker.multiplier}
          timespan={ticker.timespan}
          from={ticker.from}
          to={ticker.to}

          formattedWaitTime={ticker.formattedWaitTime}
          id={ticker.id}
          key={ticker.id}/>
      })}
    </React.Fragment>
  );
}

TickerList.propTypes = {
  tickerList: PropTypes.array,
  onTickerSelection: PropTypes.func
};

export default TickerList;