FROM node:8.16-alpine

WORKDIR /usr/api

COPY package.json .
RUN npm install --quiet
RUN npm install -g nodemon

COPY . .

COPY wait-for-postgres.sh /wait-for-postgres.sh
RUN chmod +x /wait-for-postgres.sh

CMD ["/wait-for-postgres.sh", "postgres", "yarn", "run", "dev"]