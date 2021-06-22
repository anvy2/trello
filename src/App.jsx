import "./App.css";
import List from "./components/List";
import React from "react";
class App extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div
          style={{
            padding: "12px",
            width: "100%",
            textAlign: "center",
            fontSize: "28px",
          }}
        >
          Trello Board
        </div>
        <List />
      </div>
    );
  }
}

export default App;
