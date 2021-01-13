# SimpleDocker README

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

<div style="text-align:center">
    <img src="https://pic.zhoutao123.com/lib/simple-docker/logo-tm.png" width="200" alt="""" >
</div>


一个简单的Docker控制面板，可以让你更方便的使用Docker



## 背景

Docker是目前一种非常主流的容器化方案，支持非常多的特性，给开发者带来便利，但是Docker 镜像以及容器管理复杂的参数让新手望而却步，基于此开发 SimpleDocker 控制面板，方便大家使用!!!


> 本项目是基于学习的目的的，目前的版本安全性以及功能性暂不全面，和同类型软件有功能上的重叠，本项目致力于提供一个 界面清晰、免费的、简单的、专注于Docker服务管理的控制面板，注意本项目是以学习为目的(当然也会持续开发下去~)，请勿和专业软件做类比，只想做一个适合自己的管理软件！！！

> Tip: 您可以在Issues中提出需求和您发现的bug！[需求 & BUG 管理](https://github.com/taoes/SimpleDocker/issues)


**✅ 目前支持以下特性:**
1. 容器管理、拉取镜像、运行镜像
2. 容器管理、容器启动/停止/运行
3. 挂载卷管理以及创建
4. 网络管理以及创建
5. 镜像导入功能
6. 安全登录功能
7. 容器导出功能


**✏️ 正在开发的任务**

1. 优化导出&导入&拉取等阻塞性任务的操作体验
2. 容器命令行操作
3. 容器文件管理、文件上传以及文件下载

**🛠 计划支持的特性:**

1. 容器网络管理与连接(V2)
2. 私有仓库的镜像拉取(V2)
3. DockerCompose 镜像编排管理(V3)
4. DockerSwarm 集群管理(V4)


## 应用安装

使用前，请先安装 unzip 命令用于解压压缩包 

> + ubuntu系统下使用 `sudo apt-get install unzip`  
> + centos 下使用 `yum install -y unzip`

+ Linux 

```sh
curl 'https://gitee.com/taoes_admin/SimpleDocker/raw/master/script/linux-deploy.sh' > /tmp/deploy-simple-docker.sh
chmod +x /tmp/deploy-simple-docker.sh
/tmp/deploy-simple-docker.sh
```

+ MacOS 
```sh
curl 'https://gitee.com/taoes_admin/SimpleDocker/raw/master/script/darwin-deploy.sh' > /tmp/deploy-simple-docker.sh
chmod +x /tmp/deploy-simple-docker.sh
/tmp/deploy-simple-docker.sh
```

+ Windows 
```shell script
# 暂不支持window系统
```

+ Docker 安装
```sh
docker run  -d -p 8080:4050 -v /var/run/docker.sock:/var/run/docker.sock --name SimpleDocker  registry.cn-shanghai.aliyuncs.com/seven-tao/simple-docker:0.0.2
// 浏览器访问 http://localhost:8080  
```

+ 手动安装

1. 通过 [https://github.com/taoes/SimpleDocker/releases/](https://github.com/taoes/SimpleDocker/releases/) 下载最新发布的版本
2. 创建文件夹`~/.local/simpleDocker` 并解压文件上文的压缩包到 `~/.local/simpleDocker`
3. 将文件夹 `~/.local/simpleDocker` 配置到环境变量 PATH中


## 应用启动
1. 刷新环境变量设置后，使用命令`SimpleDocker` 启动应用(后台运行可使用 `nohup SimpleDocker &` 命令启动)
2. 启动应用后，浏览器访问 `http://localhost:4050` 打开应用
3. 账户名：admin 密码: SimpleDocker2020 您可以在登录后修改密码



## Q & A
1. 修改启动端口
> 如果您需要修改启动端口,可以使用 `SimpleDocker -p xxx` 的方式启动即可在指定端口启动


2. 保持后台运行以及关闭后台运行
> 您可以使用 `nohup SimpleDocker &` 命令后台启动 SimpleDocker ，如果关闭应用可以使用 `ps -ef | grep 'SimpleDocker'`  查找到PID，然后通过  `kill -9 pid` 关闭应用

3. 忘记密码
> 忘记密码时候，你可以切换到`~/.local/simpleDocker` 目录，修改auth.json 文件，将password值修改为`B923E7672631F71B510FEDB20A77EA8A` 即可恢复默认密码 `SimpleDocker2020` 



## 相关依赖

- [GoLang](https://golang.org/)
- [Docker API Engine](https://docs.docker.com/engine/api/sdk/)
- [VueJs 2.x](https://vuejs.org/)
- [Vuex](https://vuex.vuejs.org/) 
- [Ant Design Vue](https://www.antdv.com/docs/vue/introduce-cn/) 

## 预览

您可以访问这里查看预览[预览图片](./PREVIEW.md)



## 预览

+ Docker 信息
![Docker 信息](./img/info.png)

+ Image 信息
![Image 信息](./img/image.png)

+ 运行新的容器
![Image 信息](./img/runContainer.png)

+ Container 信息
![Container 信息](./img/container.png)
  
+ 容器终端在线管理
![终端管理](./img/terminal.png)

+ 容器日志以及日志下载
![Image 信息](./img/containerLog.png)

+ Volume 信息
![Volume 信息](./img/volume.png)

+ Network 信息
![Network 信息](./img/network.png)

## 维护者

+ [@Taoes](https://github.com/taoes)

## 讨论

Feel free to dive in! [Open an issue](https://github.com/taoes/SimpleDocker/issues/new) or submit PRs.

Standard Readme follows the [Contributor Covenant](http://contributor-covenant.org/version/1/3/0/) Code of Conduct.



## 开源方案

[GPL](./LICENSE)
