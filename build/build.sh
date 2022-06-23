function print_info() {
    echo $0
}

cd ./admin
print_info "编译前端.......START!"
npm install yarn  && yarn install && yarn build:prod
print_info "编译前端资源文件.......OK!"

# shellcheck disable=SC2103
cd ./backend-src
rm -rf ./backend-src/src/main/resources/static
mkdir -p ./backend-src/src/main/resources/static
cp -rf ./front-src/build/ ./backend-src/src/main/resources/static/
echo "拷贝静态资源文件........OK!"
