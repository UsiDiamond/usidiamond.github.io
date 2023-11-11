FROM node:20
WORKDIR /opt/usidiamond.github.io/
COPY ./ /opt/usidiamond.github.io/
CMD [ "node","/opt/usidiamond.github.io/server.js" ]
EXPOSE 8080