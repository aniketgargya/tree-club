import React, { FC } from 'react';
import MarkdownIt from 'markdown-it';
import parse from 'html-react-parser';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Card } from 'react-bootstrap';

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
            <div>
                <h1 className="text-center">Tree Club</h1>
            </div>
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
                                        <Card className="mb-5 card" key={_id}>
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