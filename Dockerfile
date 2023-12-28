FROM node:18.7.0-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
ENTRYPOINT ["npm", "run", "start"]