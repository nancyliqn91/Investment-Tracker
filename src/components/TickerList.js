import React from "react";
import Ticker from "./Ticker";
import PropTypes from "prop-types";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function TickerList(props){

  return (
    <Container>
    <Row>
    <Col>
    <React.Fragment>
      <div className="p-3 mb-2 bg-light bg-gradient text-dark rounded-5">      
      {props.tickerList.map((ticker) => {
        return <Ticker
          whenTickerClicked = { props.onTickerSelection }
          name={ticker.name}
          type={ticker.type}
          multiplier={ticker.multiplier}
          timespan={ticker.timespan}
          from={ticker.from}
          to={ticker.to}

          formattedWaitTime={ticker.formattedWaitTime}
          id={ticker.id}
          key={ticker.id}/>
      })}
      </div>
    </React.Fragment>
    </Col>
    </Row>
    </Container>
  );
}

TickerList.propTypes = {
  tickerList: PropTypes.array,
  onTickerSelection: PropTypes.func
};

export default TickerList;