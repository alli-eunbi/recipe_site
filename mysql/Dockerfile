FROM mysql:latest
ENV LC_ALL=C.UTF-8

COPY my.cnf /etc/mysql/conf.d/my.cnf

# .sql도 추가로 copy 해야한다.
COPY initialize.sql /docker-entrypoint-initdb.d/

COPY mysql-files /lib/mysql-files/