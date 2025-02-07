FROM node:18

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "src/App.js"]