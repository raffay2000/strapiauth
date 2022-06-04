import React from "react";
import Routes from "./src/routes/index";
import { store } from "./src/Redux/store/index";
import {Provider}  from "react-redux";
const App = () => {
  return( 
    <Provider store={store}>
      <Routes/>
    </Provider>
  )
};

export default App;
