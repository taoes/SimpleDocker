echo "正在准备安装 SimpleDocker...."

wget 'https://github.com/taoes/SimpleDocker/releases/download/V0.0.1-Beta/SimpleDocker-darwin.zip' -O '/tmp/simpleDocker.zip'
mkdir -p ~/.local/simpleDocker
unzip /tmp/simpleDocker.zip -d ~/.local/simpleDocker
echo "export PATH=\$PATH:~/.local/simpleDocker" >> ~/.bashrc
source ~/.bashrc
echo "安装完成,请使用命令 SimpleDocker 启动后，在浏览器中访问 40093 端口...."
