# Tree-Club
Buit with React-Bootstrap, Next.js, Imgur API, Apollo, and MongoDB.

## Description
A web app I created that allows the users to create markdown posts and upload images via the Imgur API. These posts can be viewed on the home page. This is was originally created for the University Laboratory High School Tree Club.

## Setup
To run this, you'll need the following:

- An Imgur Application at https://api.imgur.com/oauth2/addclient and to copy the client id

- A random string as a Json Web Token Secret

- A ```.env``` file:
```
NEXT_PUBLIC_IMGUR_CLIENT_ID=1234567890
NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:3000/api/graphql

MONGO_URI=mongodb//localhost:27017
JWT_SECRET=1234567890
```

The application can be run with Docker or without it. If you would like to run it with Docker, checkout the example build and start commands in the ```package.json``` folder.

## Special Thanks
Thanks to all of these companies!

[![React Bootstrap](/github-readme/react-bootstrap.png)](https://react-bootstrap.github.io/)

[![Next.js](/github-readme/nextjs.png)](https://nextjs.org/)

[![Imgur](/github-readme/imgur.jpg)](https://https://imgur.com/)

[![Apollo](/github-readme/apollo.png)](https://www.apollographql.com/)

[![MongoDB](/github-readme/mongo.jpg)](https://www.mongodb.com/)