import React, { useState, useContext, FC } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Form, Button, Card, Spinner, Alert } from 'react-bootstrap';
import { NavBar } from '../components/';
import { removeErrorLabel } from '../helper/formatter';
import { TokenContext } from '../contexts/';
import { useRouter } from 'next/router';

const SIGN_IN = gql`
query ($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
        token
    }
}
`;

const SignIn: FC = () => {
    const [signIn, { loading, data, error }] = useLazyQuery(SIGN_IN);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { token, setToken } = useContext(TokenContext);
    const router = useRouter();

    if (token) {
        router.replace('/');
    } else if (data) {
        router.replace('/');
        setToken(data.signIn.token);
    }

    return (
        <>
            <NavBar />
            <Card className="mt-5">
                <h1>Sign In</h1>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                    </Form.Group>
                    {loading ? <Spinner animation="border" /> : (
                        <Button variant="primary" onClick={() => { signIn({ variables: { email, password } }) }}>
                            Submit
                        </Button>
                    )}

                    {error && <Alert className="mt-3" variant="danger">{removeErrorLabel(error.message)}</Alert>}
                </Form>
            </Card>
        </>
    );
};

export default SignIn;