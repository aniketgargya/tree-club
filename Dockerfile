FROM node:14

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .
RUN npm i

COPY . .

EXPOSE 3000
# or npm run start
CMD ["npm", "run", "dev"]