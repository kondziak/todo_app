FROM node:17-alpine

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm install axios

RUN npm install @mui/icons-material @mui/material @emotion/react @emotion/styled

COPY . .

EXPOSE 3000

CMD ["npm","start"]