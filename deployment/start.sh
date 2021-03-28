#!/bin/bash

sudo docker-compose down --rmi all
sleep 2
sudo docker-compose pull
sleep 2
sudo docker-compose up -d 
