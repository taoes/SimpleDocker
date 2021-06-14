echo  "编译后端....."
cp ./App ./build/App
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build App.go

echo  "编译前端....."
cd ui && yarn build
cd .. && cp -r ./ui/dist/ ./build/resource/dist