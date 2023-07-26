import React from "react";
import PropTypes from "prop-types";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ReusableForm(props) {
  return (
    <React.Fragment>
      <Container className="p-3 mb-2 bg-light bg-gradient text-dark rounded-5">
        <Form onSubmit={props.formSubmissionHandler}>
          <Row className='mb-3'>
            <Col sm>
              <Form.Group>
              <Form.Label>Type your Ticker -e.g. "AAPL"</Form.Label> 
              <Form.Control                
                type='text'
                name='ticker'
                // placeholders passed down from Edit form
                placeholder={props.name} />
              </Form.Group>
            </Col>
          </Row>

          <Row className='mb-3'>
            <Col sm>
              <Form.Group >
              <Form.Label>Multiplier?</Form.Label>
              <Form.Control 
                // input
                type='number'
                name='multiplier'
                placeholder={props.multiplier} />
              </Form.Group>
            </Col>
            <Col sm>
              <Form.Group>
              <Form.Label>Date From?</Form.Label>
              <Form.Control 
                // input
                type='date'
                name='from'
                placeholder={props.from}/>
              </Form.Group>
            </Col>
            <Col sm>
              <Form.Group>
              <Form.Label>Date To?</Form.Label>
              <Form.Control 
                // input
                type='date'
                name='to'
                placeholder={props.to}/>
              </Form.Group>
            </Col>
            <Col sm>
              <Form.Group>
              <Form.Label>Timespan?</Form.Label>
              <select name="timespan">
                <option value="minute">Minute</option>
                <option value="hour">Hour</option>
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
                <option value="quarter">Quarter</option>
                <option value="year">Year</option>
              </select>
              </Form.Group>
            </Col>
          </Row>
          <Button variant='primary' size='sm' type='submit' className="btn btn-primary">{props.buttonText}</Button>
        </Form>
      </Container>
    </React.Fragment>
  );
}

ReusableForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string,
};

export default ReusableForm;

