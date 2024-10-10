FROM node:14

WORKDIR /app

COPY package*.json ./
COPY public/ /app/public
COPY src/ /app/src

RUN npm install

COPY . .

ENV PORT=3001

RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]
