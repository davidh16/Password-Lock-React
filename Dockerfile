FROM node:18-alpine as base

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5713

FROM base as local

CMD ["npm", "run", "dev"]

FROM base as build

RUN npm install -g serve

RUN npm run build

FROM build as deploy

CMD ["serve", "-s", "-l", "5713", "./dist"]
