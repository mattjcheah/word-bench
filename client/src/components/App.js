import React, { useEffect } from "react";
import Landing from "./Landing";
import { Switch, Route } from "react-router-dom";
import GameRoom from "./GameRoom";
import Socket from "../services/socket";
import ServerContext from "./ServerContext";
import { useServer } from "./useServer";

function App() {
  const [state, dispatch] = useServer();

  useEffect(() => {
    const socket = new Socket(dispatch);

    dispatch({ type: "INIT_SOCKET", socket });

    return () => {
      socket.closeConnection();
    };
  }, []);

  return (
    <ServerContext.Provider value={state}>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/:roomID" component={GameRoom} />
      </Switch>
    </ServerContext.Provider>
  );
}

export default App;
