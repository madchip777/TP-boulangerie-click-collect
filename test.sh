#!/bin/bash
echo "=== Should say installed >=20 :"
node -v
echo "=== Should is installed :"
git --version
echo "=== Package update"
npm install
echo "=== Running the TEST program"
sudo npm test