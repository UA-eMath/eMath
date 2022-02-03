#!/bin/bash
mkdir -p deployMe

cp -r ../frontend/* deployMe
cp -r ../backend/* deployMe

cp views.py deployMe/eMath
cp urls.py deployMe/eMath
cp settings.py deployMe/eMath

cd deployMe
rm -rf build
rm -rf node_modules
yarn install
yarn build

echo "Predeploy process complete!"
echo "You can find deployMe folder in $(pwd)"