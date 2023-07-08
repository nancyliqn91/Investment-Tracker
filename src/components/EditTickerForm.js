import React from "react";
import ReusableForm from "./ReusableForm";
import PropTypes from "prop-types";

function EditTickerForm (props) {
  const { ticker } = props;

  function handleEditTickerFormSubmission(event) {
    event.preventDefault();
    props.onEditTicker({
      name: event.target.name.value, 
      multiplier: parseInt(event.target.multiplier.value), 
      timespan: parseInt(event.target.timespan.value), 
      from: event.target.from.value, 
      to: event.target.to.value, 

      id: ticker.id,
      timeOpen: ticker.timeOpen, 
      formattedWaitTime: ticker.formattedWaitTime 
    });
  }

  return (
    <React.Fragment>
      <ReusableForm 
        formSubmissionHandler={handleEditTickerFormSubmission} 
        buttonText="Update Ticker" />
    </React.Fragment>
  );
}

EditTickerForm.propTypes = {
  onEditTicker: PropTypes.func,
  ticker: PropTypes.object
};

export default EditTickerForm;