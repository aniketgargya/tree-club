import React from 'react';
import App from 'next/app';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo'
import fetch from 'node-fetch';

import 'bootstrap/dist/css/bootstrap.min.css';

import '../styles/main.css';
import 'react-markdown-editor-lite/lib/index.css';

class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props;

        const client = new ApolloClient({
            uri: 'http://localhost:3000/graphql',
            fetch
        });

        return (
            <ApolloProvider client={client} >
                <Component {...pageProps} />
            </ApolloProvider>
        );
    }
}

export default MyApp;