FROM mysql:latest

COPY my.cnf /etc/mysql/conf.d/my.cnf

# .sql도 추가로 copy 해야한다.
COPY initialize.sql /docker-entrypoint-initdb.d/
