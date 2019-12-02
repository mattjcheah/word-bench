import React from "react";
import "../styles.scss";
import Landing from "./Landing";

import { Switch, Route } from "react-router-dom";
import Lobby from "./Lobby";
import ErrorPage from "./ErrorPage";
import GameRoom from "./GameRoom";

const App = () => {
  // state = {
  //   userName: null
  // };

  // render() {
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route
        path="/([a-zA-Z0-9_]{6})"
        render={props => <GameRoom {...props} userName={"Jeff"} />}
      />
      <Route component={ErrorPage} />
    </Switch>
  );
  // }
};

export default App;
