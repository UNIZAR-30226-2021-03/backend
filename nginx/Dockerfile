FROM nginx

RUN apk add certbot certbot-nginx
COPY ./nginx/nginx.conf /etc/nginx/
COPY ./nginx/run.sh .
EXPOSE 443 80

CMD ["/bin/sh","run.sh"]