import Body from "./components/Body"
import EmptyCard from "./components/EmptyCard";
import React from "react";
import { useState } from 'react';
function App() {
  const [cardData, setCardData] = useState({});
  
  // callback function to update cardData state
  const handleCardData = (data) => {
    setCardData(data);
  };

  return (
    <div>
      
      <Body onCardData = {handleCardData} /> 
      <hr></hr>
      <hr></hr>
      <EmptyCard  cardData = {cardData}/>
    </div>
    
  );
}

export default App;
