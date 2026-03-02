FROM postgres:15-alpine

COPY init.sql /docker-entrypoint-initdb.d/
COPY seeds/ /docker-entrypoint-initdb.d/seeds/

EXPOSE 5432
