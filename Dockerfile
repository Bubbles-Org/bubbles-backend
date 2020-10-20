FROM node:8

WORKDIR /bubbles-backend

COPY . /bubbles-backend

RUN \
    apt-get update -y && \
    apt-get upgrade -y && \
    apt-get install -y curl htop man unzip vim nano wget net-tools && \
    apt-get update

EXPOSE 8080ls

CMD ["sh","-c","npm install && npm start"]
