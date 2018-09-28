import React from "react";
import ReactDOM from "react-dom";


//import "./style/styles.css";
import { Excel } from "./js/components/container/Excel";

class App extends React.Component {
  render() {
    return <Excel />;
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
