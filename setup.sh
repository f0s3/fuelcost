#!/bin/bash

echo "Prerequisites:"
echo "1. git (sudo yum -y install git)"
echo "2. 'eval \$(ssh-agent -s) && ssh-add ~/.ssh/file-name' in ~/.bash_profile"
echo "3. ssh-key (ssh-keygen -t ed25519 -c 'key-name' -f ~/.ssh/file-name && eval \$(ssh-agent -s) && ssh-add ~/.ssh/file-name)"
echo "4. cloned git repo (git clone git@github.com:f0s3/fuelcost.git && cd fuelcost)"
echo "5. installed nvm with node 16 (lts at the moment of writing)"

npm ci &&
npm i pm2 -g &&
pm2 start index.js --name f0s3-fuelcost &&
pm2 save &&
echo -e "\n" &&
pm2 startup

