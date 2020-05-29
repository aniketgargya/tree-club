import React, { FC } from 'react';
import MarkdownIt from 'markdown-it';
import parse from 'html-react-parser';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Card, Spinner, Alert } from 'react-bootstrap';
import { NavBar } from '../components/';
import { removeErrorLabel } from '../helper/formatter';

const getPosts = gql`
{
    getPosts {
        _id
        markdown
        created
        author {
            name
            imageURL
        }
    }
}
`;

const Index: FC = () => {
    const mdParser = new MarkdownIt();

    return (
        <>
            <NavBar />
            <header>
                <h1 className="text-center">Welcome to Uni's Tree Club</h1>
            </header>
            <div className="mx-5 mw-100">
                <Query query={getPosts}>
                    {({ loading, error, data }: any) => (
                        <>
                            {loading && <Spinner animation="border" />}
                            {error && <Alert className="mt-3" variant="danger">{removeErrorLabel(error.message)}</Alert>}
                            {
                                data && (
                                    data.getPosts.map(({ markdown, _id, author: { imageURL, name } }: any) => (
                                        <Card className="mb-5" key={_id}>
                                            <div className="pb-2 mb-2" style={{ borderBottom: "1px grey solid" }}>
                                                <img src={imageURL} style={{ borderRadius: "50%", height: "3.5rem", width: "3.5rem" }} />
                                                <span style={{ marginLeft: "1rem" }}>{name}</span>
                                            </div>
                                            {parse(mdParser.render(markdown))}
                                        </Card>
                                    ))
                                )
                            }
                        </>
                    )}
                </Query>
            </div>
        </>
    );
};

export default Index;