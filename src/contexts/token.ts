import { createContext } from 'react';

const TokenContext: React.Context<{
    token: string
    setToken: React.Dispatch<string>
}> = createContext({
    token: null,
    setToken: null
});

export default TokenContext;