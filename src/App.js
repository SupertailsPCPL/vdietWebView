
import React, { useEffect, useState } from 'react';
import Layout from "./pages/PDP.js";
import ErrorScreen from './components/ErrorScreen/ErrorScreen.js'

import './App.css';



function App() {
  const [isErrorScreen, setIsErrorScreen] = useState(false);
  let productId;
  useEffect(() => {
    let urlValue = window.location.href;
    urlValue = urlValue.split('/vdiet');
    if (urlValue[urlValue.length - 1].includes("productId")) {
      let pid = urlValue[urlValue.length - 1].split("=");
      if(pid.length > 1){
        productId = pid[pid.length - 1]
      }
      else{
        setIsErrorScreen(true);
      }
      console.log(productId);
      if(!productId){
        setIsErrorScreen(true);
      }
    }
    else {
      setIsErrorScreen(true);
    }
  }, []);
  return (
      !isErrorScreen ?     
      <Layout />
      :
      <ErrorScreen />
  );
}

export default App;
