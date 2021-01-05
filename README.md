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


目前支持一下特性:

1. 容器管理、拉取镜像、**运行镜像**
2. 容器管理、**容器启动，停止，运行**
3. 挂载卷管理以及创还能
4. 网络管理以及创建

## 安装使用

+ Linux 

```sh
$ npm install --global standard-readme-spec
```

+ Mac 
```sh
$ npm install --global standard-readme-spec
```

+ Windows 
```shell script
# 暂不支持
```


+ 手动安装
```shell script
    # 下载 XXX
    # 拷贝到指定目录
    # 配置环境变量
done
```


## 相关依赖

- [GoLang](https://golang.org/)
- [Docker API Engine](https://docs.docker.com/engine/api/sdk/)
- [VueJs 2.x](https://vuejs.org/)
- [Vuex](https://vuex.vuejs.org/) 
- [Ant Design Vue](https://www.antdv.com/docs/vue/introduce-cn/) 

## 预览

+ Docker 信息
![Docker 信息](./img/info.png)


+ Image 信息
![Image 信息](./img/image.png)

+ 运行新的容器
![Image 信息](./img/runContainer.png)


+ Container 信息
![Container 信息](./img/container.png)

+ 容器日志以及日志下载
![Image 信息](./img/containerLog.png)


+ Volume 信息
![Volume 信息](./img/volume.png)

+ Network 信息
![Network 信息](./img/network.png)



## 维护者
[@Taoes](https://github.com/taoes)

## 讨论

Feel free to dive in! [Open an issue](https://github.com/RichardLitt/standard-readme/issues/new) or submit PRs.

Standard Readme follows the [Contributor Covenant](http://contributor-covenant.org/version/1/3/0/) Code of Conduct.



## 开源方案

[MIT](LICENSE) © Richard Littauer
