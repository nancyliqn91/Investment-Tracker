import React from "react";
import { serverTimestamp } from "firebase/firestore";
import PropTypes from "prop-types"; 
import ReusableForm from "./ReusableForm";

function NewTickerForm(props){
  function handleNewTickerFormSubmission(event) {
    event.preventDefault();
    props.onNewTickerCreation({
      name: event.target.name.value,
      type: event.target.type.value,
      multiplier: parseInt(event.target.multiplier.value), 
      timespan: event.target.timespan.value, 
      from: event.target.from.value, 
      to: event.target.to.value, 
      timeOpen: serverTimestamp()
    });
  }

  return (
    <React.Fragment>
      <ReusableForm 
        formSubmissionHandler={handleNewTickerFormSubmission}
        buttonText="Add Ticker" />
    </React.Fragment>
  );
}

NewTickerForm.propTypes = {
  onNewTickerCreation: PropTypes.func
};

export default NewTickerForm;