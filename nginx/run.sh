#!/bin/bash
nginx -g daemon off
certbot --nginx -m barbarosoft@gmail.com -d keypax.sytes.net