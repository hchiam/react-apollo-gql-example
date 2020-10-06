import React from "react";
import ReactDOM from "react-dom";
// import { ApolloProvider } from "@apollo/react-hooks";
// import ApolloClient from "apollo-boost";
import App from "./App";
import NewPost from "./components/NewPost";
import EditPost from "./components/EditPost";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// const apolloClient = new ApolloClient({
//   uri: "https://react-graphql1.herokuapp.com/v1/graphql"
// });

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    {/* <ApolloProvider client={apolloClient}> */}
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/new" component={NewPost} />
        <Route exact path="/edit/:id" component={EditPost} />
      </Switch>
    </BrowserRouter>
    {/* </ApolloProvider> */}
  </React.StrictMode>,
  rootElement
);
