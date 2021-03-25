#!/bin/bash

sudo docker-compose stop
sudo docker rmi $(sudo docker images -q)
sudo docker-compose pull
sudo docker-compose up -d 
