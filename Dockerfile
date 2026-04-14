FROM node:20
WORKDIR /opt/usidiamond.github.io/
COPY package*.json ./
RUN npm ci
COPY ./ ./
RUN npm run build
CMD [ "node", "/opt/usidiamond.github.io/server.js" ]
EXPOSE 8080