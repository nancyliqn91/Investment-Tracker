import React, { useState } from "react";
import { serverTimestamp } from "firebase/firestore";
import PropTypes from "prop-types"; 
import ReusableForm from "./ReusableForm";

function NewTickerForm(props){
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);

  function handleNewTickerFormSubmission(event) {
    event.preventDefault();
    props.onNewTickerCreation({
      name: event.target.name.value,
      multiplier: parseInt(event.target.multiplier.value), 
      timespan: event.target.timespan.value, 
      from: from ? from.toISOString().split("T")[0] : "",
      to: to ? to.toISOString().split("T")[0] : "",
      // from: event.target.from.value, 
      // to: event.target.to.value, 

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