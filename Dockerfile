FROM node:8

WORKDIR /bubbles-backend

COPY . /bubbles-backend

RUN \
    apt-get update -y && \
    apt-get upgrade -y && \
    apt-get install -y curl htop man unzip vim nano wget net-tools && \
    apt-get update

EXPOSE 8080

ARG JWT_SECRET
ARG JWT_EXPIRATION_DAYS
ARG DB_URL
ARG ALLOWED_ORIGIN

CMD ["sh","-c","npm install && JWT_SECRET=${JWT_SECRET} JWT_EXPIRATION_DAYS=${JWT_EXPIRATION_DAYS} DB_URL=${DB_URL} ALLOWED_ORIGIN=${ALLOWED_ORIGIN} node app.js"]
