FROM ubuntu:latest
WORKDIR /app
COPY ./resource/dist/ /app/static/
COPY ./App /app/SimpleDocker
COPY ./resource/App.tar.gz /root/.local/simpleDocker/App.tar.gz
CMD /app/SimpleDocker -port=4050