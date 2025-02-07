FROM node:18

WORKDIR /src

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "App.js"]