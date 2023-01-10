FROM ubuntu:18.04
LABEL maintainer="jessezhang007007 <jessezhang007007@gmail.com>"

ADD sources.list /etc/apt/ 
RUN apt-get update
RUN apt-get install -y libcairo2-dev libjpeg8-dev libpango1.0-dev libgif-dev build-essential g++  ttf-wqy-microhei ttf-wqy-zenhei xfonts-wqy xfonts-intl-chinese fonts-arphic-uming fonts-noto
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y nodejs
RUN npm install -g pm2
WORKDIR /root/
ADD server.js /root/
ADD package.json /root/
ADD word-cloud.js /root/
ADD echarts.js /root/
ADD index.js /root/
RUN npm install

EXPOSE 8081

CMD ["pm2-docker", "start", "server.js"]