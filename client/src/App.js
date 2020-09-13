import React, { useEffect } from "react";
import Landing from "./screens/Landing";
import { Switch, Route } from "react-router-dom";
import GameRoom from "./screens/GameRoom";
import Socket from "./services/socket";
import ServerContext from "./components/ServerContext";
import { useServer } from "./components/useServer";
import { ApolloProvider } from "@apollo/client";
import client from "./graphql/apollo";

function App() {
  const [state, dispatch] = useServer();

  useEffect(() => {
    const socket = new Socket(dispatch);

    dispatch({ type: "INIT_SOCKET", socket });

    return () => {
      socket.closeConnection();
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch({
      type: "INIT_CLEAR_ERROR",
      clearError: () => dispatch({ type: "SET_JOIN_ERROR", errorMessage: "" }),
    });
  }, [dispatch]);

  return (
    <ApolloProvider client={client}>
      <ServerContext.Provider value={state}>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/:roomID" component={GameRoom} />
        </Switch>
      </ServerContext.Provider>
    </ApolloProvider>
  );
}

export default App;
