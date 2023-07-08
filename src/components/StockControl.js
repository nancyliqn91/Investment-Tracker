import React from 'react';
import NewTickerForm from './NewTickerForm';
import TickerList from './TickerList';
import TickerDetail from './TickerDetail';
import EditTickerForm from './EditTickerForm';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import * as a from './../actions';
import { formatDistanceToNow } from 'date-fns';

import Stocks from './Stocks';

class StockControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      selectedTicker: null,
      editing: false
    };
  }

  componentDidMount() {
    this.waitTimeUpdateTimer = setInterval(() =>
      this.updateTicketElapsedWaitTime(),
    1000
    );
  }

  componentWillUnmount(){
    console.log("component unmounted!");
    clearInterval(this.waitTimeUpdateTimer);
  }

  updateTickerElapsedWaitTime = () => {
    console.log("tickr");
    const { dispatch } = this.props;
    Object.values(this.props.mainTickerList).forEach(ticker => {
        const newFormattedWaitTime = formatDistanceToNow(ticker.timeOpen, {
          addSuffix: true
        });
      const action = a.updateTime(ticker.id, newFormattedWaitTime);
      dispatch(action);
    });
  }

  handleClick = () => {
    if (this.state.selectedTicker != null) {
      this.setState({
        selectedTicker: null,
        editing: false
      });
    } else {
      const { dispatch } = this.props;
      const action = a.toggleForm();
      dispatch(action);
    }
  }

  handleAddingNewTickerToList = (newTicker) => {
    const { dispatch } = this.props;
    const action = a.addTicker(newTicker);
    dispatch(action);
    const action2 = a.toggleForm();
    dispatch(action2);
  }

  handleChangingSelectedTicker = (id) => {
    const selectedTicker = this.props.mainTickerList[id];
    this.setState({selectedTicker: selectedTicker});
  }

  handleDeletingTicker = (id) => {
    const { dispatch } = this.props;
    const action = a.deleteTicker(id);
    dispatch(action);
    this.setState({selectedTicker: null});
  }

  handleEditClick = () => {
    this.setState({editing: true});
  }

  handleEditingTickerInList = (tickerToEdit) => {
    const { dispatch } = this.props;
    const action = a.addTicket(tickerToEdit);
    dispatch(action);
    this.setState({
      editing: false,
      selectedTicker: null
    });
  }

  // handleBuyClick = () => {
  //   const selectedTicker = this.state.selectedTicker;

  //   if (selectedTicker.quantity > 0) {
  //   this.setState({
  //     mainTickerList: this.state.mainTickerList
  //     .filter(ticker => ticker.id !== selectedTicker.id)
  //     .concat({...selectedTicker, quantity: selectedTicker.quantity - 1}), 
  //     selectedTicker: null })
  //   }
  // }

    render(){
    let currentlyVisibleState = null;
    let buttonText = null; 

    if (this.state.editing ) {      
      currentlyVisibleState = <EditTickerForm ticker = {this.state.selectedTicker} 
      onEditTicker = {this.handleEditingTickerInList}/>

      buttonText = "Return to Ticker List";
    } 
    else if (this.state.selectedTicker != null) {
      currentlyVisibleState = <TickerDetail ticker = {this.state.selectedTicker} 
      onClickingDelete = {this.handleDeletingTicker} onClickingEdit = {this.handleEditClick}/>

      {/* onClickingBuy={this.handleBuyClick}  */}
      buttonText = "Return to Ticker List";
    } 
    else if (this.state.formVisibleOnPage) {
      currentlyVisibleState = <NewTickerForm onNewTickerCreation={this.handleAddingNewTickerToList} />
      
      buttonText = "Return to Ticker List";
    } 
    else {
      currentlyVisibleState = <TickerList tickerList={this.state.mainTickerList} 
      onTickerSelection={this.handleChangingSelectedTicker}/>;     
      buttonText = "Add Ticker"; 
    }

    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button> 
      </React.Fragment>
    );
  }

}

StockControl.propTypes = {
  mainTickerList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    mainTickerList: state.mainTickerList,
    formVisibleOnPage: state.formVisibleOnPage
  }
}

StockControl = connect(mapStateToProps)(StockControl);

export default StockControl;