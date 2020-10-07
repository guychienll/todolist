import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  ${reset}
  *{
      font-family: "Amatic SC", cursive;
    border-radius:3px;
  }
  input{
    font-size: 1.5rem;
    border: 2px solid #000;
    ::placeholder{
      font-size: 1.5rem;
    }
  }
  button{
    font-size: 1rem;
    border: 2px solid #000;
    :disabled{
    border: 2px solid #bbb;
    }
    :active{
      font-size: 1.5rem;
      outline: none;
    }
  }
  li{
      font-family:  "Amatic SC", cursive;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
