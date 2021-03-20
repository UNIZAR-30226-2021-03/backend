FROM nginx

COPY ./nginx/nginx.conf /etc/nginx/

EXPOSE 443

RUN sudo apt install certbot
RUN sudo certbot --nginx -d ec2-3-121-209-114.eu-central-1.compute.amazonaws.com -d www.ec2-3-121-209-114.eu-central-1.compute.amazonaws.com

CMD ["nginx", "-g", "daemon off;"]