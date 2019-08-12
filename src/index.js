import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import * as serviceWorker from './serviceWorker';

const token = "d04a5ee332e41912ee6ee4f1be130b3f3a20a47d";

const httpLink = {
    uri: 'https://api.github.com/graphql',
    headers: {
        authorization: `Bearer ${token}`
    }
};

const client = new ApolloClient({
    link: new HttpLink(httpLink),
    cache: new InMemoryCache()
});

ReactDOM.render(<ApolloProvider client={client}><App /></ApolloProvider>, document.getElementById('root'));

serviceWorker.unregister();
