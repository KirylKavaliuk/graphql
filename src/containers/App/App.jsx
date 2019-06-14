import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

import introspectionQueryResultData from '../../fragmentTypes.json';

import Users from '../Users';
import Repos from '../Repos';
import RepoPage from '../RepoPage';

import './App.css';

const token = 'c8fffac371d44b0cf1066ae30d5327d3a9425c95';

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
          <Route exact path='/' component={ Users } />
          <Route exact path='/user/:login' component={ Repos }/>
          <Route exact path='/user/:login/repo/:repo' component={ RepoPage }/>
          <Route path='*' component={ null }/>
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
