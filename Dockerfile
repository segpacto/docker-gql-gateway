FROM node:lts-alpine

RUN mkdir -p /app
COPY . /app
WORKDIR /app

RUN npm install --no-audit --no-optional --production

CMD npm start