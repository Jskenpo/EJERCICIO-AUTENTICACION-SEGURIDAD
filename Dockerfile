FROM node:18

COPY package*.json ./
RUN npm install
RUN npm install express-session
RUN npm install keycloak-connect

COPY . .

EXPOSE 3000

CMD ["node", "src/App.js"]