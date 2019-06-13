import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

import introspectionQueryResultData from '../../fragmentTypes.json';

import './App.css';

const token = '39722e4ff1b952870568e954f087ef7a230456a4';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

const httpLink = {
  uri: 'https://api.github.com/graphql',
  headers: {
    authorization: `Bearer ${token}`
  }
};

const client = new ApolloClient({
  link: new HttpLink(httpLink),
  cache: new InMemoryCache(fragmentMatcher)
});

function App() {
  return (
    <ApolloProvider client={ client }>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={ null } />
          <Route exact path='/user/:login' component={ null }/>
          <Route exact path='/user/:login/repo/:repo' component={ null }/>
          <Route path='*' component={ null }/>
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
