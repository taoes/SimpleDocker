cd ./front-src
echo "编译前端.......START!"
yarn build:prod
echo "编译前端资源文件.......OK!"

# shellcheck disable=SC2103
cd ..
rm -rf ./backend-src/src/main/resources/static
mkdir -p ./backend-src/src/main/resources/static
cp -rf ./front-src/build/ ./backend-src/src/main/resources/static/
echo "拷贝静态资源文件........OK!"
