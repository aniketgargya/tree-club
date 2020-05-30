import React, { useState, useContext, FC } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Form, Button, Card, Spinner, Alert } from 'react-bootstrap';
import { NavBar } from '../components/';
import { removeErrorLabel } from '../helper/formatter';
import { TokenContext } from '../contexts/';
import { useRouter } from 'next/router';

const SIGN_UP = gql`
mutation ($email: String!, $password: String!, $name: String!) {
    signUp(email: $email, password: $password, name: $name) {
        token
    }
}
`;

const SignUp: FC = () => {
    const [signUp, { loading, data, error }] = useMutation(SIGN_UP);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const { token, setToken } = useContext(TokenContext);
    const router = useRouter();

    if (token) {
        router.replace('/');
    } else if (data) {
        router.replace('/');
        localStorage.setItem("token", data.signUp.token);
        setToken(data.signUp.token);
    }

    return (
        <>
            <NavBar />
            <Card className="mt-5">
                <h1>Sign Up</h1>
                <Form>
                    <Form.Group>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" value={name} onChange={e => setName(e.target.value)} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                    </Form.Group>
                    {loading ? <Spinner animation="border" /> : (
                        <Button variant="primary" onClick={() => { signUp({ variables: { email, password, name } }) }}>
                            Submit
                        </Button>
                    )}

                    {error && <Alert className="mt-3" variant="danger">{removeErrorLabel(error.message)}</Alert>}
                </Form>
            </Card>
        </>
    );
};

export default SignUp;