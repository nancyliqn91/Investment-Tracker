import React from "react";
import PropTypes from "prop-types";

function TickerForm(props) {
  return (
    <React.Fragment>
      <form onSubmit={props.formSubmissionHandler}>
        <input
          type='text'
          name='name'
          placeholder='Ticker - "AAPL"' />
        <input
          type='text'
          name='multiplier'
          placeholder='multiplier -"5"' />
        <input
          type='text'
          name='timespan'
          placeholder='timespan - "minute"' />
        <input
          type='text'
          name='from'
          placeholder='from - "2023-01-09"' />
        <input
          type='text'
          name='to'
          placeholder='to - "2023-07-09"' />

        <button type='submit'>{props.buttonText}</button>
      </form>
    </React.Fragment>
  );
}

ReusableForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string
};

export default TickerForm;