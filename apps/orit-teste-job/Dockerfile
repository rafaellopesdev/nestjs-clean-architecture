FROM node:18

WORKDIR /app

COPY ../../package.json ../../package-lock.json ../../tsconfig.json ./

RUN npm install

RUN npm install tsconfig-paths

COPY apps/orit-teste-job .

COPY ../../tsconfig.json ./

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start:dev"]
