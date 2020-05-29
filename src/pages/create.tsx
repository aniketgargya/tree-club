import React, { useRef, useState, useCallback, useMemo } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { GetStaticProps } from 'next';

import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import { Button, Spinner, Alert } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone'

import MarkdownIt from 'markdown-it';

import { useMutation } from 'react-apollo';
import gql from 'graphql-tag';

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
    ssr: false
});

import { NavBar } from '../components/index';
import { removeErrorLabel } from '../helper/formatter';

const CREATE_POST = gql`

mutation($markdown: String!) {
    createPost(markdown: $markdown) {
        markdown
    }
}

`;


const CreatePage = ({ clientId }) => {
    const markdown = useRef('Type up your post here!');
    const [file, setFile] = useState(undefined);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [mutate, { data, error }] = useMutation(CREATE_POST);
    const memoizedMarkDownParser = useMemo(() => (new MarkdownIt()), []);
    const router = useRouter();

    if (data) router.push('/');

    const renderHTML = useCallback(text => {
        markdown.current = text;
        return memoizedMarkDownParser.render(text);
    }, [markdown, memoizedMarkDownParser]);


    const onDrop = useCallback(([firstFile]) => {
        setFile(firstFile);
    }, [setFile]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const postToImgur = useCallback(async () => {

        const fd = new FormData();
        fd.append('image', file);
        if (file) {
            setUploadingImage(true);

            const response = await fetch('https://api.imgur.com/3/image', {
                method: 'POST',
                headers: {
                    'Authorization': `Client-ID ${clientId}`
                },
                body: fd
            });

            const data = await response.json();

            setUploadingImage(false);
            setUploadedImages(previousUploadedImages => {
                return previousUploadedImages.concat([data.data.link]);
            });
        }
    }, [file, setUploadingImage, setUploadedImages]);

    return (
        <>
            <NavBar />
            <main className="p-5">
                <MdEditor
                    value="Type up your post here!"
                    renderHTML={renderHTML}
                />

                <Button
                    className="px-5 mt-5 post-button"
                    onClick={() => mutate({ variables: { markdown: markdown.current } })}
                >
                    Post
            </Button>

                <table className={`table ${uploadedImages.length == 0 || "mt-5"}`}>
                    <tbody>
                        {
                            uploadedImages.map((uploadedImage, i) => (
                                <tr key={i}>
                                    <td>
                                        <a href={uploadedImage}>{uploadedImage}</a>
                                    </td>
                                    <td>
                                        <CopyToClipboard text={uploadedImage}><span className="copy">Copy</span></CopyToClipboard>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                {
                    uploadingImage ? <Spinner animation="border" className="mt-5" /> : (
                        <>
                            <div {...getRootProps()} className="dragNDrop mt-5" style={{ backgroundColor: "white" }}>
                                <input {...getInputProps()} />
                                {
                                    isDragActive ?
                                        <p>Drop the files here ...</p> :
                                        <p>Drag 'n' drop some files or click here</p>
                                }
                            </div>

                            {file && (
                                <Button
                                    className="px-5 mt-5"
                                    onClick={() => { postToImgur(); }}
                                >
                                    Upload to Imgur
                                </Button>
                            )}
                        </>
                    )
                }
                {error && <Alert className="mt-3" variant="danger">{removeErrorLabel(error.message)}</Alert>}
            </main>
        </>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            clientId: process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID
        }
    }
};

export default CreatePage;