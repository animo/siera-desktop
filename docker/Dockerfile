FROM node:16 as build

WORKDIR /app

ARG NPM_TOKEN
ARG NPM_REGISTRY_URL

COPY package.json .
COPY yarn.lock .

RUN echo "//${NPM_REGISTRY_URL}/:_authToken=${NPM_TOKEN}" > .npmrc && \
    yarn install --production && \
    rm -f .npmrc

COPY . .

RUN yarn build

FROM node:16

COPY --from=build /app /app

WORKDIR /app

CMD ["node", "build/app.js"]