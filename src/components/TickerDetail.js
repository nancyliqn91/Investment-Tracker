import React from "react";
import PropTypes from "prop-types";

function TickerDetail(props){
  const { ticker, onClickingDelete, onClickingEdit, onClickingAPI } = props; 

  return (
    <React.Fragment>
      <h1>Ticker Detail</h1>
      <h3>Name: {ticker.name}</h3>

      <p><em>Date Starts: {ticker.from}</em></p>
      <p><em>Date Ends: {ticker.to}</em></p>
      <p><em>Multiplier Timespan: {ticker.multiplier} {ticker.timespan}</em></p>

      <button onClick={onClickingEdit}>Update Ticker</button>
      <button onClick={()=> onClickingDelete(ticker.id)}>Delete Ticker</button>

      <button onClick={()=> onClickingAPI(ticker.id)}>Ticker Information</button>

      <hr/>
    </React.Fragment>
  );
}

TickerDetail.propTypes = {
  ticker: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func,
  onClickingAPI: PropTypes.func
};

export default TickerDetail;