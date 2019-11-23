import React from "react";
import "../styles.css";
import Landing from "./Landing";

import { Switch, Route } from "react-router-dom";
import Lobby from "./Lobby";
import ErrorPage from "./ErrorPage";

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route
          path="/([a-zA-Z0-9_]{6})"
          render={props => <Lobby {...props} userName={"Jeff"} />}
        />
        <Route component={ErrorPage} />
      </Switch>
    );
  }
}

export default App;