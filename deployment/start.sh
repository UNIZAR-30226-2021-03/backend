#!/bin/bash

sudo docker-compose stop
sleep 2
sudo docker rmi --force $(sudo docker images -q)
sleep 2
sudo docker-compose pull
sleep 2
sudo docker-compose up -d 
