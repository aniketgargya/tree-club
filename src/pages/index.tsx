import React, { FC } from 'react';
import MarkdownIt from 'markdown-it';
import parse from 'html-react-parser';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Card, Spinner } from 'react-bootstrap';
import { NavBar } from '../components/';

const getPosts = gql`
{
    getPosts {
        _id
        markdown
        created
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
                            {loading && <p >Loading...</p>}
                            {error && (
                                <div className="">{error.message}</div>
                            )}
                            {
                                data && (
                                    data.getPosts.map(({ markdown, _id }: any) => (
                                        <Card className="mb-5" key={_id}>
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