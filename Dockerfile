FROM node:20 as build

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

FROM node:20 as production

WORKDIR /app

COPY --from=build /app .
COPY --from=build /app/dist ./dist

ENV PORT=${PORT}
ENV DB_USER=${DB_USER}
ENV DB_HOST=${DB_HOST}
ENV DB_DATABASE=${DB_DATABASE}
ENV DB_PASSWORD=${DB_PASSWORD}
ENV DB_PORT=${DB_PORT}

EXPOSE 3000

CMD [ "npm", "start" ]
