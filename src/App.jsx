import React, { useState } from "react";
import "./App.css";
import router from "./Pages/index.js";
import { Provider } from "react-redux";
import { store } from "./Store/store.js";





export default function App() {
  return (
    <Provider store={store}>
      <div>
        {router()}
      </div>
    </Provider>
  );
}


