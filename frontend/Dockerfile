FROM node

WORKDIR /eMath/frontend

# Install dependencies
COPY package.json ./
COPY yarn.lock ./

COPY . /eMath/frontend


EXPOSE 3000

CMD ["yarn", "start"]
