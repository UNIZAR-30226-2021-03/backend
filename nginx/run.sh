#!/bin/sh
#nginx -g 'daemon off;'
certbot --nginx -n --agree-tos -m barbarosoft@gmail.com -d keypax.sytes.net
/bin/sh
