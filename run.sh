#!/bin/bash

APP_FILES_DIR=${1}

# General cleanup
docker stop fpm app
sudo rm -rf /home/paulius/dev/p/macernis.com/logs/*.log

# Network
docker network rm macernis.com

docker network create macernis.com

# PHP
docker rm fpm

docker build --tag fpm:latest --pull -f ./docker/fpm/Dockerfile . \
 && docker run --net macernis.com --name fpm -v "${APP_FILES_DIR}:/srv/www/macernis.com:rw" --restart on-failure:10 -d fpm:latest

# NGINX
docker rm app

docker build --tag app:latest --pull -f ./docker/nginx/Dockerfile . \
 && docker run --net macernis.com --name app -p 8087:80 -v "${APP_FILES_DIR}:/srv/www/macernis.com:rw" -v "${APP_FILES_DIR}/docker/nginx/nginx.conf:/etc/nginx/nginx.conf:ro" --restart on-failure:10 --workdir "/srv/www/macernis.com" --env "APP_NAME=macernis.com" -d app:latest
# -v "${APP_FILES_DIR}/logs:/srv/www/macernis.com/logs:rw"



# Some potentially helpful resources:
# NGINX in 100 seconds: https://www.youtube.com/watch?v=JKxlsvZXG7c
# https://www.tutorialworks.com/container-networking/
# https://gist.github.com/carlessanagustin/9509d0d31414804da03b
# https://maxchadwick.xyz/blog/getting-the-php-fpm-status-from-the-command-line
# https://www.youtube.com/watch?v=MP3Wm9dtHSQ

# docker exec -it fpm bach
# docker stop fpm app
# sudo rm -rf /home/paulius/dev/p/macernis.com/logs/*.log