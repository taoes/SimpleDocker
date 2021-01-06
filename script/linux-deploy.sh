echo "正在准备安装 SimpleDocker...."

wget 'https://gitee.com/taoes_admin/SimpleDocker/attach_files/576037/download/SimpleDocker-linux.zip' -O '/tmp/simpleDocker.zip'
mkdir -p ~/.local/simpleDocker
unzip /tmp/simpleDocker.zip -d ~/.local/simpleDocker
echo "export PATH=\$PATH:~/.local/simpleDocker" >> ~/.bashrc
source ~/.bashrc
echo "安装完成,请使用命令 SimpleDocker 启动后，在浏览器中访问 40093 端口...."
