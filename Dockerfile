FROM node:15.6.0
WORKDIR /app
ADD . /app
RUN npm install
EXPOSE 3000
CMD node index.js
