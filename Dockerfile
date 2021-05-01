FROM node:12-alpine AS ui-builder
ARG HOST=127.0.0.1
ARG PORT=4050
ENV VUE_APP_API_HOST ${HOST}
ENV VUE_APP_API_PORT ${PORT}
WORKDIR /ui
COPY ./ui/. .
RUN npm install && \
npm run build

FROM golang:1.15-alpine AS api-builder
WORKDIR /api
COPY . .
RUN apk --no-cache add gcc musl-dev && \
go mod tidy && \
go build -trimpath -o bin/SimpleDocker App.go && \
chmod a+x bin/SimpleDocker

FROM alpine
LABEL maintainer="zhoutao825638@vip.qq.com, k8scat@gmail.com"
ARG PORT=4050
ENV API_PORT ${PORT}
ENV REDIS_ADDR redis:6379
EXPOSE ${PORT}
WORKDIR /app
COPY --from=ui-builder /ui/dist ./static
COPY --from=api-builder /api/bin/SimpleDocker .
CMD ./SimpleDocker -port ${API_PORT}
