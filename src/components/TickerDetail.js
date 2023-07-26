import React from "react";
import PropTypes from "prop-types";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function TickerDetail(props){
  const { ticker, onClickingDelete, onClickingEdit, onClickingCall,onClickingLine} = props; 

  return (
    <Container>
    <Row>
    <Col>
    <React.Fragment>
    <div className="p-3 mb-2 bg-light bg-gradient text-dark rounded-5">
      <h1>Ticker Detail</h1>
      <h3>Name: {ticker.name}</h3>
      <h3>Type: {ticker.type}</h3>
      <p><em>Date Starts: {ticker.from}</em></p>
      <p><em>Date Ends: {ticker.to}</em></p>
      <p><em>Multiplier Timespan: {ticker.multiplier} {ticker.timespan}</em></p>
      </div>
      <div className="mb-2">
      <Button onClick={onClickingEdit}>Update Ticker</Button>
      <hr/>
      <Button onClick={()=> onClickingDelete(ticker.id)}>Delete Ticker</Button>
      <hr/>
      <Button onClick={onClickingCall}>Bar Aggregates</Button>
      <hr/>
      <Button onClick={onClickingLine}>Line Aggregates</Button>
      </div>
      <hr/>
    </React.Fragment>
    </Col>
    </Row>
  </Container>
  );
}

TickerDetail.propTypes = {
  ticker: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func,
  onClickingCall: PropTypes.func,
  onClickingLine: PropTypes.func
};

export default TickerDetail;