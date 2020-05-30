import React, { useState, useEffect } from 'react';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo'
import fetch from 'node-fetch';

import { TokenContext } from '../contexts/';

import 'bootstrap/dist/css/bootstrap.min.css';

import '../styles/main.css';
import 'react-markdown-editor-lite/lib/index.css';

const App = ({ Component, pageProps }) => {
    const [token, setToken] = useState(null);
    const tokenContextValue = { token, setToken };

    useEffect(() => {
        setToken(localStorage.getItem("token"))
    }, []);

    const client = new ApolloClient({
        uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
        // @ts-ignore
        fetch,
        request: ({ setContext }) => {
            setContext({
                headers: {
                    authorization: token ? `Bearer ${token}` : undefined
                }
            })
        }
    });

    return (
        <ApolloProvider client={client} >
            <TokenContext.Provider value={tokenContextValue}>
                <Component {...pageProps} />
            </TokenContext.Provider>
        </ApolloProvider>
    );
}

export default App;