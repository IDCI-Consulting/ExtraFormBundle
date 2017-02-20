FROM node:6.9.5

RUN apt-get update
RUN apt-get install -y ruby ruby-dev
RUN gem install sass

RUN npm install --global bower gulp-cli && echo '{ "allow_root": true }' > /root/.bowerrc

WORKDIR /usr/src/app