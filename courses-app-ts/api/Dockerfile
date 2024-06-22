FROM node

WORKDIR /app

RUN apt update && apt install -y build-essential

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD [ "npm", "run", "dev" ]