FROM node:18-alpine as base

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5713

FROM base as debug

CMD ["npm", "run", "dev"]

FROM base as production

RUN npm i -g serve
RUN npm run build

CMD [ "serve", "-s", "dist" ]