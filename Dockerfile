FROM node:alpine as ts-compiler
WORKDIR /usr/app
COPY package*.json ./
COPY ecosystem.config*.cjs ./
COPY tsconfig*.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM node:alpine as ts-remover
WORKDIR /usr/app
COPY --from=ts-compiler /usr/app/package*.json ./
# COPY --from=ts-compiler /usr/app/.env ./
# COPY --from=ts-compiler /usr/app/ecosystem.config*.cjs ./
COPY --from=ts-compiler /usr/app/dist ./dist


FROM node:alpine
WORKDIR /usr/app

RUN apk add --no-cache openssl

# ENV DOCKERIZE_VERSION v0.6.1
# RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
#     && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
#     && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

COPY --from=ts-remover /usr/app ./

# Instale pm2
# RUN npm install pm2 -g
RUN npm i --save module-alias
ENTRYPOINT [ "npm", "start" ] 

USER 1000