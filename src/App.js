import React from "react";
import { Switch, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";

import client from "./graphql/apollo";
import Landing from "./screens/Landing";
import GameRoom from "./screens/GameRoom";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/:roomID" component={GameRoom} />
      </Switch>
    </ApolloProvider>
  );
};

export default App;
