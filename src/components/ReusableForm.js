import React, { useState } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ReusableForm(props) {
  const [multiplier, setMultiplier] = useState(1);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [timespan, setTimespan] = useState("minute");

  const handleMultiplierChange = (event) => {
    setMultiplier(parseInt(event.target.value));
  };

  const handleFromDateChange = (date) => {
    setFrom(date);
  };

  const handleToDateChange = (date) => {
    setTo(date);
  };

  const handleTimespanChange = (event) => {
    setTimespan(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call the formSubmissionHandler with the form data
    props.formSubmissionHandler({
      multiplier,
      from: from ? from.toISOString().split("T")[0] : "",
      to: to ? to.toISOString().split("T")[0] : "",
      timespan,
    });
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="multiplier"
          placeholder="multiplier"
          value={multiplier}
          onChange={handleMultiplierChange}
        />

        <DatePicker
          selected={from}
          onChange={handleFromDateChange}
          placeholderText="From"
        />
        <DatePicker
          selected={to}
          onChange={handleToDateChange}
          placeholderText="To"
        />

        <select value={timespan} onChange={handleTimespanChange}>
          <option value="minute">Minute</option>
          <option value="hour">Hour</option>
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="quarter">Quarter</option>
          <option value="year">Year</option>
        </select>

        <button type="submit">{props.buttonText}</button>
      </form>
    </React.Fragment>
  );
}

ReusableForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string,
};

export default ReusableForm;


// import React from "react";
// import PropTypes from "prop-types";

// function ReusableForm(props) {
//   return (
//     <React.Fragment>
//       <form onSubmit={props.formSubmissionHandler}>
//         <input
//           type='text'
//           name='name'
//           placeholder='Ticker - "AAPL"' />
//         <input
//           type='text'
//           name='multiplier'
//           placeholder='multiplier -"5"' />
//         <input
//           type='text'
//           name='timespan'
//           placeholder='timespan - "minute"' />
//         <input
//           type='text'
//           name='from'
//           placeholder='from - "2023-01-09"' />
//         <input
//           type='text'
//           name='to'
//           placeholder='to - "2023-07-09"' />

//         <button type='submit'>{props.buttonText}</button>
//       </form>
//     </React.Fragment>
//   );
// }

// ReusableForm.propTypes = {
//   formSubmissionHandler: PropTypes.func,
//   buttonText: PropTypes.string
// };

// export default ReusableForm;