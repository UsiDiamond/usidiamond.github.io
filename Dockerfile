FROM node:20-alpine AS build
WORKDIR /opt/usidiamond.github.io/
COPY package*.json ./
RUN npm install
COPY ./ ./
RUN npm run build

FROM nginx:stable-alpine
# Patch any OS-level CVEs in the base image
RUN apk upgrade --no-cache
# Remove the default server config included by the upstream image
RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /opt/usidiamond.github.io/public/usidiamond.github.io/browser/. /usr/share/nginx/html
RUN chown -R nginx:nginx /usr/share/nginx/html
USER nginx
EXPOSE 8080
