FROM node:18

COPY package*.json ./
RUN npm install
RUN npm install -g nodemon

COPY . .

EXPOSE 3000

CMD ["nodemon", "src/App.js"]