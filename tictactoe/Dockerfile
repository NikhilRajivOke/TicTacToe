FROM node:22 as build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY public /app/public/
COPY src /app/src/
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]