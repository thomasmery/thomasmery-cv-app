import React, { Component } from "react";

class App extends Component {
  renderTitle = title => {
    return <h1>{title}</h1>;
  };

  render = () => {
    return (
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
      </div>
    );
  };
}

export default App;
