MAINTAINER EVatom "15603401903@163.com"  

# Pull base image 
FROM ubuntu

# update source  
RUN rm /etc/apt/sources.list
COPY sources.list /etc/apt

#for apt to be nointeractive
ENV DEBIAN_FRONTEND noninteractive
ENV DEBCONF_NONINTERACTIVE_SEEN true
RUN echo "tzdata tzdata/Areas select Europe" > /tmp/preseed.txt; \
    echo "tzdata tzdata/Zones/Europe select Berlin" >> /tmp/preseed.txt; \
    debconf-set-selections /tmp/preseed.txt

# update
RUN apt-get update
RUN apt-get install -y tzdata

#install APM

RUN apt-get install -y apache2
RUN apt-get install -y mysql-server
RUN apt-get install -y php7.2
RUN apt-get install -y php7.2-mysql libapache2-mod-php7.2 php-mbstring
RUN apt-get install -y phpmyadmin
RUN apt-get upgrade -y



COPY wordpress.sql /root/

RUN usermod -d /var/lib/mysql/ mysql \
    && ln -s /var/lib/mysql/mysql.sock /tmp/mysql.sock \
    && chown -R mysql:mysql /var/lib/mysql


RUN service mysql start \
    && mysql -e "grant all privileges on *.* to 'root'@'%' identified by 'a8gU_HaPqM';"\
    && mysql -e "grant all privileges on *.* to 'root'@'localhost' identified by 'a8gU_HaPqM';"\
    && mysql -u root -pa8gU_HaPqM -e "CREATE USER 'wordpress'@'localhost' IDENTIFIED BY 'a8gU_HaPqMf7_13_hS';" \
    && mysql -u root -pa8gU_HaPqM -e "GRANT ALL ON *.* TO 'wordpress'@'localhost'; " \
    && mysql -u root -pa8gU_HaPqM -e "show databases;" \
    && mysql -u root -pa8gU_HaPqM </root/wordpress.sql \
    && mysql -u root -pa8gU_HaPqM -e "show databases;"

COPY src /var/www/html 
RUN chown www-data:www-data /var/www/html -R
RUN service apache2 start
COPY httpd-foreground /usr/bin
EXPOSE 80
CMD ["dockered"]
