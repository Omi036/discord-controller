FROM node:20

WORKDIR /app

COPY . /app

RUN npm install

RUN npm install --prefix /app/web

ENV VITE_SRVPORT=5017 

ENV VITE_BIND=0.0.0.0

ENV WEBPORT=5018

ENV DOCKER_OPEN=false

EXPOSE 5017

EXPOSE 5018

CMD ["npm","run","start"]

