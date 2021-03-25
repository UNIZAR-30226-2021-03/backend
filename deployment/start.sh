#!/bin/bash

sudo docker-compose stop
sleep 2
sudo docker rmi --force $(sudo docker images -q)
sudo docker-compose pull
sudo docker-compose up -d 
