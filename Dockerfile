FROM node:14

WORKDIR /app

ENV FORCE_COLOR=1

ARG imgurclientid
ENV NEXT_PUBLIC_IMGUR_CLIENT_ID=${imgurclientid}

COPY package.json .
COPY package-lock.json .
RUN npm i

RUN mkdir src/
COPY src src

EXPOSE 3000
RUN npm run build
CMD ["npm", "run", "start"]