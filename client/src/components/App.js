import React, { useState } from "react";
import Landing from "./Landing";
import { Switch, Route } from "react-router-dom";
import GameRoom from "./GameRoom";
import GameBoard from "./GameBoard";

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
        // render={props => <GameBoard />}
      />
    </Switch>
  );
};

export default App;
