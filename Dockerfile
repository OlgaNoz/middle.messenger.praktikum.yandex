FROM node

WORKDIR /messenger

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["node", "server.js"]
