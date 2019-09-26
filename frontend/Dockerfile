FROM node

WORKDIR ./eMath/frontend

# Install dependencies
COPY package.json /eMath/frontend

RUN npm install

EXPOSE 3000

CMD ["yarn", "start"]
