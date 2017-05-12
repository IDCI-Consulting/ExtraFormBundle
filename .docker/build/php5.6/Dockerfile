FROM php:5.6-fpm

RUN apt-get update
RUN apt-get install -y git wget vim
RUN apt-get install -y imagemagick

# extensions
RUN docker-php-ext-install mbstring
RUN apt-get install zlib1g-dev -y && docker-php-ext-install zip
RUN docker-php-ext-install mysql
RUN docker-php-ext-install pdo
RUN docker-php-ext-install pdo_mysql
RUN docker-php-ext-install opcache

RUN apt-get install -y \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libmcrypt-dev \
    libpng12-dev \
    && docker-php-ext-install -j$(nproc) iconv mcrypt \
    && docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ \
    && docker-php-ext-install -j$(nproc) gd

# xdebug
RUN pecl install xdebug && docker-php-ext-enable xdebug

# php.ini
COPY php.ini /usr/local/etc/php/

# www.conf
COPY www.conf /usr/local/etc/php-fpm.d/

# install composer
COPY install-composer.sh /tmp/install-composer.sh
RUN chmod +x /tmp/install-composer.sh
RUN bash /tmp/install-composer.sh
VOLUME /root/.composer
