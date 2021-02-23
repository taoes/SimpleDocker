FROM ubuntu
MAINTAINER zhoutao zhoutao825638@vip.qq.com
WORKDIR /app
COPY ./ui/dist /app/static
COPY ./App /app/SimpleDocker
COPY ./App.tar.gz /root/.local/simpleDocker/App.tar.gz
CMD /app/SimpleDocker -port=4050
