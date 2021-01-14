rm ./package-lock.json
rm ./packages/app/package-lock.json
rm ./packages/api/package-lock.json
rm -rf ./node_modules
rm -rf ./packages/app/node_modules
rm -rf ./packages/api/node_modules
npm run install-packages
