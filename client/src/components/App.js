import React, { useState } from "react";
import "../styles.css";
import Landing from "./Landing";
import { Switch, Route } from "react-router-dom";
import GameRoom from "./GameRoom";

const App = () => {
  const [userName, setUserName] = useState(null);

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={props => <Landing {...props} setUserName={setUserName} />}
      />
      <Route
        path="/:roomID"
        render={props => <GameRoom {...props} userName={userName} />}
      />
    </Switch>
  );
};

export default App;
