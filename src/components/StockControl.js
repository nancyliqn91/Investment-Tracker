import React from 'react';
import NewTickerForm from './NewTicketForm';
import TickerList from './TickerList';
import TickerDetail from './TickerDetail';
import EditTickerForm from './EditTickerForm';
import Stocks from './Stocks';

class StockControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage:false,
      mainTickerList: [], 
      selectedTicker: null,
      editing: false
    };
  }

  handleClick = () => {
    if (this.state.selectedTicker != null) {
      this.setState({
        formVisibleOnPage: false,
        selectedTicker: null,
        editing: false
      });
    } else {
      this.setState(prevState => ({
        formVisibleOnPage: !prevState.formVisibleOnPage,
      }));
    }
  }

  handleAddingNewTickerToList = (newTicker) => {
    const newMainTickerList = this.state.mainCoffeeList
    .concat(newTicker);
    this.setState({mainTickerList: newMainTickerList,
                  formVisibleOnPage: false });
  }

  handleChangingSelectedTicker = (id) => {
    const selectedTicker = this.state.mainTickerList
    .filter(ticker => ticker.id === id)[0];
    this.setState({selectedTicker: selectedTicker});
  }

  handleDeletingTicker = (id) => {
    const newMainTickerList = this.state.mainTickerList
    .filter(ticker => ticker.id !== id);
    this.setState({
      mainTickerList: newMainCoffeeList,
      selectedTicker: null
    });
  }

  handleEditClick = () => {
    this.setState({editing: true});
  }

  handleEditingTickerInList = (tickerToEdit) => {
    const editedMainTickerList = this.state.mainTickerList
      .filter(ticker => ticker.id !== this.state.selectedTicker.id)
      .concat(tickerToEdit);
    this.setState({
        mainTickerList: editedMainTickerList,
        editing: false,
        selectedTicker: null
      });
  }

  handleBuyClick = () => {
    const selectedTicker = this.state.selectedTicker;

    if (selectedCoffee.quantity > 0) {
    this.setState({
      mainTickerList: this.state.mainTickerList
      .filter(ticker => ticker.id !== selectedTicker.id)
      .concat({...selectedTicker, quantity: selectedTicker.quantity - 1}), 
      selectedTicker: null })
    }
  }

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
      onClickingDelete = {this.handleDeletingTicker} onClickingEdit = {this.handleEditClick}  onClickingBuy={this.handleBuyClick} />

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

export default StockControl;