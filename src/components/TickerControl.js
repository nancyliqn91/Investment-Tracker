import NewTickerForm from './NewTickerForm';
import TickerList from './TickerList';
import EditTickerForm from './EditTickerForm';
import TickerDetail from './TickerDetail';
import React, { useEffect, useState } from 'react';
import TickerAPI from './TickerAPI';
import CryptoAPI from './CryptoAPI';
import Button from 'react-bootstrap/Button';

import { collection, addDoc, doc, updateDoc, onSnapshot, deleteDoc, query, orderBy } from "firebase/firestore";
import { db, auth } from './../firebase.js';
import { formatDistanceToNow } from 'date-fns';
import SignIn from './SignIn';

function TickerControl() {

  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [mainTickerList, setMainTickerList] = useState([]);
  const [selectedTicker, setSelectedTicker] = useState(null);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);
  const [calling, setCalling] = useState(false);
  const [crypto, setCrypto] = useState(false);
  
  useEffect(() => {    
    const queryByTimestamp = query(
      collection(db, "tickers"), 
      orderBy('timeOpen')
    );
    const unSubscribe = onSnapshot(
      queryByTimestamp, 
      (querySnapshot) => {
        const tickers = [];
        querySnapshot.forEach((doc) => {
          const timeOpen = doc.get('timeOpen', {serverTimestamps: "estimate"}).toDate();
          const jsDate = new Date(timeOpen);
          tickers.push({
            name:doc.data().name,
            multiplier:doc.data().multiplier,
            timespan:doc.data().timespan,
            from:doc.data().from,
            to:doc.data().to,
            timeOpen: jsDate,
            formattedWaitTime: formatDistanceToNow(jsDate),
            id: doc.id
          });
        });
        setMainTickerList(tickers);
      },
      (error) => {
        setError(error.message);
      }
    );

    return () => unSubscribe();
  }, []);
  
  const handleClick = () => {
    if (selectedTicker != null) {
      setFormVisibleOnPage(false);
      setSelectedTicker(null);
      setEditing(false);
      setCalling(false);
      setCrypto(false);
    } else {
      setFormVisibleOnPage(!formVisibleOnPage);
    }
  }

  const handleDeletingTicker = async (id) => {
    await deleteDoc(doc(db, "tickers", id));
    setSelectedTicker(null);
  } 

  const handleEditClick = () => {
    setEditing(true);
  }

  const handleCallClick = () => {
    setCalling(true);
  }

  const handleCryptoClick = () => {
    setCrypto(true);
  }

  const handleEditingTickerInList = async (tickerToEdit) => {
    const tickerRef = doc(db, "tickers", tickerToEdit.id);
    await updateDoc(tickerRef, tickerToEdit);
    setEditing(false);
    setSelectedTicker(null);
  }

  const handleAddingNewTickerToList = async (newTickerData) => {
    await addDoc(collection(db, "tickers"), newTickerData);
    setFormVisibleOnPage(false);
  }

  const handleChangingSelectedTicker = (id) => {
    const selection = mainTickerList.filter(ticker => ticker.id === id)[0];
    
    setSelectedTicker(selection);
  }
 
  let currentlyVisibleState = null;
  let buttonText = null; 

  if (auth.currentUser == null) {
    return (
      <React.Fragment>
        <h1 className='hint'>You must be signed in to access the ticker list.</h1>    
        <SignIn/>       
      </React.Fragment>    
    )
  } else if (auth.currentUser != null) {
    if (error) {
      currentlyVisibleState = <p>There was an error: {error}</p>
    } else if (editing) {      
      currentlyVisibleState = <EditTickerForm 
      ticker = {selectedTicker} 
      onEditTicker = {handleEditingTickerInList} />
      buttonText = "Return to Ticker List";
    } 
    // make call
    else if (calling ) {      
      currentlyVisibleState = <TickerAPI 
      name={selectedTicker.name}
      multiplier={selectedTicker.multiplier}
      timespan={selectedTicker.timespan}
      from={selectedTicker.from}
      to={selectedTicker.to} />
      buttonText = "Return to Ticker List";
    }  
    else if (crypto ) {      
      currentlyVisibleState = <CryptoAPI 
      name={selectedTicker.name} />
      buttonText = "Return to Ticker List";
    } 
    else if (selectedTicker != null) {
      currentlyVisibleState = <TickerDetail 
      ticker={selectedTicker} 
      onClickingDelete={handleDeletingTicker}
      onClickingEdit = {handleEditClick} 
      // make api call
      onClickingCall = {handleCallClick} 
      onClickingCrypto = {handleCryptoClick} 
      />
      buttonText = "Return to Ticket List";
    } else if (formVisibleOnPage) {
      currentlyVisibleState = <NewTickerForm 
      onNewTickerCreation={handleAddingNewTickerToList}/>;
      buttonText = "Return to Ticker List"; 
    } else {
      currentlyVisibleState = <TickerList 
      onTickerSelection={handleChangingSelectedTicker} 
      tickerList={mainTickerList} />;
      buttonText = "Add Ticker"; 
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        {error ? null : 
        <Button variant="primary" onClick={handleClick}>{buttonText}</Button> } 
      </React.Fragment>
    );
  }
}

export default TickerControl;

