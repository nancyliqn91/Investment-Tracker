import React from "react";
import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ReusableForm(props) {
  return (
    <Container>
    <Row>
    <Col>
    <React.Fragment> 
    <div className="p-3 mb-2 bg-light bg-gradient text-dark rounded-5">     
      <form onSubmit={props.formSubmissionHandler}>
        <p>Ticker Name</p>
        <input
          type="text"
          name="name"
          placeholder={props.name}
        />
        <p>Ticker Type</p>
        <select name="type">
          <option value="day">Stocks</option>
          <option value="week">Crypto</option>
          <option value="month">Options</option>
          <option value="quarter">Indices</option>
          <option value="year">Forex</option>
        </select>
        <p>Ticker Multiplier</p>
        <input
          type="number"
          name="multiplier"
          placeholder={props.multiplier}
        />
        <p>Date From</p>
        <input
          type="date"
          name="from"
          placeholder={props.from}
        />
        <p>Date To</p>
        <input
          type="date"
          name="to"
          placeholder='to - "2023-07-09"'
        />
        <p>Timespan</p>
        <select name="timespan">
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="quarter">Quarter</option>
          <option value="year">Year</option>
          <option value="minute">Minute</option>
          <option value="hour">Hour</option>
        </select>
        <hr/>
        <Button variant='primary' size='sm' type='submit' className="btn btn-primary">{props.buttonText}</Button>
      </form>
    </div>
    </React.Fragment> 
    </Col>
    </Row>
    </Container>    
  );
}

ReusableForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string,
};

export default ReusableForm;

