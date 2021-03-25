FROM nginx:alpine

RUN apk add certbot certbot-nginx
COPY ./nginx/nginx.conf /etc/nginx/
EXPOSE 443 80

RUN certbot --nginx -m barbarosoft@gmail.com -d keypax.sytes.net
CMD ["nginx", "-g", "daemon off;"]