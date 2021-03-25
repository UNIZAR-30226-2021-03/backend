#!/bin/sh
#nginx -g 'daemon off;'

#YA NO SE USAAAAAAAAAAAAAAAAAAAAAAAAA

certbot --nginx -n --agree-tos -m barbarosoft@gmail.com -d keypax-api.hopto.org
trap : TERM INT
tail -f /dev/null & wait
