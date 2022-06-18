#!/bin/bash

git pull
npm ci
pm2 restart f0s3-fuelcost

