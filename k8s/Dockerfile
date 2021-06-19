FROM node:alpine as my-frontend2
WORKDIR /opt/app
COPY package.json .

RUN yarn install
COPY . .
RUN yarn build

FROM nginx
COPY --from=my-frontend2 /opt/app/build/ /usr/share/nginx/html
