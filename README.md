# SimpleDocker README

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

<div style="text-align:center">
    <img src="https://pic.zhoutao123.com/lib/simple-docker/logo.png" width="200" alt="""" >
</div>


一个简单的Docker控制面板，可以让你更方便的使用Docker



## 背景

Docker是目前一种非常主流的容器化方案，支持非常多的特性，给开发者带来便利，但是Docker 镜像以及容器管理复杂的参数让新手望而却步，基于此开发 SimpleDocker 控制面板，方便大家使用!!!


由于目前项目刚刚起步，欢迎大家踊跃提出需求!!!

> Tip: 您可以在Issues中提出需求和您发现的bug！[需求 & BUG 管理](https://github.com/taoes/SimpleDocker/issues)


目前支持以下特性:

1. 容器管理、拉取镜像、**运行镜像**
2. 容器管理、**容器启动，停止，运行**
3. 挂载卷管理以及创还能
4. 网络管理以及创建

## 安装使用

使用前，请先安装 unzip 命令用于解压压缩包 ubuntu系统下使用 `sudo apt-get install unzip`  centos 下使用 `yum install -y unzip`

+ Linux 

```sh
curl 'https://raw.githubusercontent.com/taoes/SimpleDocker/master/script/linux-deploy.sh' > /tmp/deploy-simple-docker.sh
chmod +x /tmp/deploy-simple-docker.sh
/tmp/deploy-simple-docker
```

+ Mac 
```sh
curl 'https://raw.githubusercontent.com/taoes/SimpleDocker/master/script/darwin-deploy.sh' > /tmp/deploy-simple-docker.sh
chmod +x /tmp/deploy-simple-docker.sh
/tmp/deploy-simple-docker
```

+ Windows 
```shell script
# 暂不支持window系统
```


+ 手动安装

1. 通过 [https://github.com/taoes/SimpleDocker/releases/](https://github.com/taoes/SimpleDocker/releases/) 下载最新发布的版本
2. 创建文件夹`~/.local/simpleDocker` 并解压文件上文的压缩包到 `~/.local/simpleDocker`
3. 将文件夹 `~/.local/simpleDocker` 配置到环境变量 PATH中
4. 刷新环境变量设置后，使用命令`SimpleDocker` 启动应用(后台运行可使用 nohup 命令)
5. 启动应用后，浏览器访问 `http://localhost:40093` 打开应用



## 相关依赖

- [GoLang](https://golang.org/)
- [Docker API Engine](https://docs.docker.com/engine/api/sdk/)
- [VueJs 2.x](https://vuejs.org/)
- [Vuex](https://vuex.vuejs.org/) 
- [Ant Design Vue](https://www.antdv.com/docs/vue/introduce-cn/) 

## 预览

您可以访问这里查看预览[预览图片](./PREVIEW.md)


## 维护者

+ [@Taoes](https://github.com/taoes)

## 讨论

Feel free to dive in! [Open an issue](https://github.com/taoes/SimpleDocker/issues/new) or submit PRs.

Standard Readme follows the [Contributor Covenant](http://contributor-covenant.org/version/1/3/0/) Code of Conduct.



## 开源方案

[GPL](./LICENSE)
