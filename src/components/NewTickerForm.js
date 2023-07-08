import React from "react";
import { v4 } from 'uuid';
import PropTypes from "prop-types"; 
import ReusableForm from "./ReusableForm";
import { formatDistanceToNow } from 'date-fns';

function NewTickerForm(props){

  function handleNewTickerFormSubmission(event) {
    event.preventDefault();
    props.onNewTickerCreation({
      name: event.target.name.value, 
      multiplier: parseInt(event.target.multiplier.value), 
      timespan: parseInt(event.target.timespan.value), 
      from: event.target.from.value, 
      to: event.target.to.value, 

      id: v4(),
      timeOpen: new Date(),
      formattedWaitTime: formatDistanceToNow(new Date(), {
        addSuffix: true
      })
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
  onNewTicketCreation: PropTypes.func
};

export default NewTickerForm;