FROM node:20-alpine AS build
WORKDIR /opt/usidiamond.github.io/
COPY package*.json ./
RUN npm install
COPY ./ ./
RUN npm run build

FROM nginx:stable-alpine
# Patch OS-level CVEs in the base image before doing anything else
RUN apk upgrade --no-cache \
 && rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf
# --chown avoids a separate RUN layer for ownership change
COPY --from=build --chown=nginx:nginx \
    /opt/usidiamond.github.io/public/usidiamond.github.io/browser \
    /usr/share/nginx/html/browser
USER nginx
EXPOSE 8080
# Container-level health check (also present in docker-compose for orchestrators
# that don't read compose files, e.g. plain docker run / Kubernetes)
HEALTHCHECK --interval=10s --timeout=5s --retries=3 --start-period=15s \
    CMD curl -fs http://localhost:8080/ > /dev/null
