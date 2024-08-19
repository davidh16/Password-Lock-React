FROM node:18-alpine as base

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5713

RUN for var in $(env | grep "^${VITE}_" | awk -F= '{print $1}'); do \
      echo "Processing variable $var"; \
      value=$(eval echo \$$var); \
      echo "$var=$value"; \
      # Example: Set environment variables based on build args
      export $var=$value; \
    done

FROM base as local

CMD ["npm", "run", "dev"]

FROM base as build

RUN npm install -g serve

RUN npm run build

FROM build as deploy

CMD ["serve", "-s", "-l", "5713", "./dist"]
