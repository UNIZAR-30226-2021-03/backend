FROM nginx:alpine

RUN apk add certbot certbot-nginx
COPY ./nginx/nginx.conf /etc/nginx/
COPY ./nginx/run.sh .
EXPOSE 443 80

#CMD ["/bin/bash","run.sh"]