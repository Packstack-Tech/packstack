# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:alpine as build
WORKDIR /app
COPY package*.json /app/
RUN yarn
COPY ./ /app/
RUN yarn build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]