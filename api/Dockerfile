FROM node:12.7.0-alpine

WORKDIR /usr/src/api

COPY package*.json ./
RUN npm install -g yarn
RUN yarn install

COPY . .

EXPOSE 80
CMD ["yarn", "run", "start"]
