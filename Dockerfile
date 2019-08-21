FROM node:10-alpine

ENV NODE_ENV=production

WORKDIR /home/node/app

COPY package.json ./

COPY . .

RUN yarn install && yarn run build

EXPOSE 5000

CMD yarn start
