# The Music Charts
Deployed Version available at http://tree-club.herokuapp.com/

Buit with Bootstrap, Next.js, Imgur API, Apollo, and MongoDB.

## Description
A web app I created that allows the site owner to create markdown posts and upload images via the Imgur API. These posts can be viewed on the home page.

## Setup
To run this, download the repo and do the following.

- Create an Imgur Application at https://api.imgur.com/oauth2/addclient.

- Copy the client id.

- Install dependences:
```bash
npm install
```

- Create a ```.env``` file:
```bash
touch .env # on mac and linux
```

- Put your Imgur client id, graphql url, node environment, and mongo uri in the file like so:
```
MONGO_URI=mongodb://localhost:27017
NODE_ENV=development
IMGUR_CLIENT_ID=1234567890
GRAPHQL_ENDPOINT=http://localhost:3000/graphql
```

- Start in development mode:
```bash
npm run dev
```

- Start in production mode:
```bash
npm run build && npm run start
```

### 🥳 It should be running 🥳

## Special Thanks
Thanks to all of these companies!

[![Tailwindcss](/github-readme/tailwindcss.png)](https://tailwindcss.com/)

[![Next.js](/github-readme/nextjs.png)](https://nextjs.org/)

[![Imgur](/github-readme/imgur.jpg)](https://https://imgur.com/)

[![Apollo](/github-readme/apollo.png)](https://www.apollographql.com/)

[![MongoDB](/github-readme/mongo.jpg)](https://www.mongodb.com/)

[![Heroku](/github-readme/heroku.png)](https://heroku.com/)
