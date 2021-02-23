dir=`pwd`

function buildForLinux() {
cd $dir
echo "[2/3] build for linux...."
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build App.go
if [ $? -ne 0 ]; then
  echo "Linux 项目编译失败!"
  exit -1
fi
}


function buildForDrawin() {
echo "[3/3] build for drawin...."
go build App.go
if [ $? -ne 0 ]; then
  echo "Drawin 项目编译失败!"
  exit -1
fi
}

function buildFe() {
echo "[1/3] build for ui...."
cd ui && yarn build
if [ $? -ne 0 ]; then
  echo "前端项目编译失败!"
  exit -1
fi
}

rm ./App  ./SimpleDocker
buildFe
buildForLinux
#buildForDrawin
