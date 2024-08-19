FROM node:18-alpine as base

# Define ARG to accept the concatenated ENV_VARS string
ARG ENV_VARS

# Split the ENV_VARS string and set each variable as an environment variable
RUN set -eux; \
  for var in $(echo $ENV_VARS | tr " " "\n"); do \
    key=$(echo $var | cut -d= -f1); \
    value=$(echo $var | cut -d= -f2-); \
    echo "Setting ENV $key=$value"; \
    export $key="$value"; \
  done

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
