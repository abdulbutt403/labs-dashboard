import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";
let persistor = persistStore(store);
import store from "./store";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { MaterialUIControllerProvider } from "context";

ReactDOM.render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </MaterialUIControllerProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
