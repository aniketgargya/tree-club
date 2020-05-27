FROM node:14

WORKDIR /usr/src/app

RUN npm i -g nodemon

COPY package.json .
COPY package-lock.json .
RUN npm i

COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]