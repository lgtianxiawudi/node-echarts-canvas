FROM ubuntu:18.04
LABEL maintainer="jessezhang007007 <jessezhang007007@gmail.com>"

ADD sources.list /etc/apt/ 
RUN apt-get update
RUN apt-get install -y libcairo2-dev libjpeg8-dev libpango1.0-dev libgif-dev build-essential g++  ttf-wqy-microhei ttf-wqy-zenhei xfonts-wqy xfonts-intl-chinese fonts-arphic-uming fonts-noto
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs
RUN npm install -g pm2
RUN npm install cnpm -g --registry=https://registry.npm.taobao.org
RUN apt-get install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
RUN apt-get install -y libgbm1
RUN useradd -d /home/echarts -m -s /bin/bash echarts
USER echarts
WORKDIR /echarts/
ADD server.js /echarts/
ADD package.json /echarts/
ADD word-cloud.js /echarts/
ADD echarts.js /echarts/
ADD index.js /echarts/
RUN cnpm install

EXPOSE 8081

CMD ["npm", "run", "start"]