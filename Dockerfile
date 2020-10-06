FROM node:8

WORKDIR /bubbles-backend

COPY . /bubbles-backend

EXPOSE 8080ls

CMD ["sh","-c","npm install && npm start"]
