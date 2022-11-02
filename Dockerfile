FROM php:7.4-apache
WORKDIR /var/www/html/
EXPOSE 80

RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y unzip wget nano mc libaio1 libxslt-dev libpng-dev libjpeg-dev libfreetype6-dev libzip-dev

# Installing oracle instant client
RUN mkdir /oracle \
    && cd /oracle \
    && wget https://download.oracle.com/otn_software/linux/instantclient/211000/instantclient-basic-linux.x64-21.1.0.0.0.zip \
    && unzip ./instantclient-basic-linux.x64-21.1.0.0.0.zip -d ./ \
    && wget https://download.oracle.com/otn_software/linux/instantclient/211000/instantclient-sdk-linux.x64-21.1.0.0.0.zip \
    && unzip ./instantclient-sdk-linux.x64-21.1.0.0.0.zip -d ./ \
    && rm -rf ./instantclient-basic-linux.x64-21.1.0.0.0.zip \
    && rm -rf ./instantclient-sdk-linux.x64-21.1.0.0.0.zip

ENV ORACLE_HOME /oracle/instantclient_21_1
ENV LD_LIBRARY_PATH /oracle/instantclient_21_1:${LD_LIBRARY_PATH}
ENV NLS_DATE_LANGUAGE="AMERICAN"
ENV NLS_LANG="AMERICAN_AMERICA.CL8MSWIN1251"
ENV ORACLE_TERM="xterm"

# OCI8 installation
RUN export ORACLE_HOME=/oracle/instantclient_21_1 \
    && export LD_LIBRARY_PATH=/oracle/instantclient_21_1:${LD_LIBRARY_PATH} \
    && echo 'instantclient,/oracle/instantclient_21_1/' | pecl install oci8-2.2.0 \
    && docker-php-ext-enable oci8 \
    && docker-php-ext-configure pdo_oci --with-pdo-oci=instantclient,/oracle/instantclient_21_1,21.1 \
    && docker-php-ext-install pdo_oci \
    && docker-php-ext-enable pdo_oci

# Apache additional modules
RUN a2enmod rewrite && \
    a2enmod headers

# PHP modules installtion
RUN docker-php-ext-configure gd --with-jpeg=/usr --with-freetype=/usr
RUN docker-php-ext-install mysqli pdo pdo_mysql opcache xsl gd zip

# Xdebug installation
RUN pecl install xdebug && docker-php-ext-enable xdebug

# Composer installation
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Node Js installation
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash - \
    && apt -y install nodejs

# Angular CLI installation
RUN npm install -g @angular/cli

# Xdebug configuration
#xdebug.mode=develop,debug
#xdebug.start_with_request=yes
#xdebug.client_host=10.54.10.10
#xdebug.client_port=9003
#xdebug.idekey=docker
#xdebug.log=/dev/stdout
#xdebug.log_level=0
