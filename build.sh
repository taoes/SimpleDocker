echo "编译前端.......START!"
cd front-src
yarn build
echo "编译前端.......OK!"


rm -rf ../backend-src/src/main/resources/static
mkdir -p  ../backend-src/src/main/resources/static
cp -rf ./build/ ../backend-src/src/main/resources/static/

cd ..
cd backend-src
echo "打包后端.......START!"
mvn clean package
echo "打包后端.......OK!"

cd target
scp ./*.jar ubuntu@www.zhoutao123.com:/home/ubuntu/sdocker/app2.jar