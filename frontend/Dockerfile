FROM node as build-stage

WORKDIR /eMath/frontend

# Install dependencies
COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . /eMath/frontend

RUN npm run build

FROM nginx:1.15
COPY --from=build-stage /eMath/frontend /usr/share/nginx/html

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
