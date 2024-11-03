FROM node:18

WORKDIR /app

COPY ../../package.json ../../package-lock.json ../../tsconfig.json ./

RUN npm install

COPY apps/orit-teste .

COPY ../../tsconfig.json ./

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
