FROM node:alpine

WORKDIR /opt/myweatherapp

COPY ./package.json ./

RUN npm install

COPY ./ ./

CMD [ "npm", "start"]
