cd ./ui
echo '切换到前端项目界面.....'
yarn install
yarn build

echo '切换到后端界面.......'
cd ..
rm -rf ./static
mkdir ./static
cp -rf ./ui/dist/* ./static
