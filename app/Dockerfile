FROM node:16-stretch
WORKDIR /usr/src/app
COPY package.json .
RUN yarn
COPY . .
RUN yarn build
EXPOSE 3000