import React from "react";
import Container from 'react-bootstrap/Container';

function TickerInfo(){
  return(
    <React.Fragment>
      <Container>
        <hr />
        <div className="p-3 mb-2 bg-light bg-gradient text-dark rounded-5">
        <h4>User Information</h4>
          <ul>
            <li>Ticker is the exchange symbol that this item is traded under.</li>
            <li>Ticker aggregate bars  are for a stock over a given date range in custom time sizes.</li>
            <li>You can track or search stocks, options, indices, forex and crypto. For more information, please go to the API Documentation.</li>
            <li>Note, indices only have close value,highest value, lowest value, and open value.</li>
          </ul>
        </div>

        <div className="p-3 mb-2 bg-light bg-gradient text-dark rounded-5">
          <h6><em>API Documentation:</em></h6>
          <p><em>
          <ul>
            <li><a href="https://polygon.io/docs/stocks/getting-started">Stocks API Documentation</a></li>
            <li><a href="https://platform.openai.com/docs/introduction">ChatGPT Documentation</a></li>
          </ul>
          </em></p>
        </div>
      </Container>
    </React.Fragment>
  )
}

export default TickerInfo;