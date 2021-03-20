FROM staticfloat/nginx-certbot

COPY ./nginx/nginx.conf /etc/nginx/

EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]