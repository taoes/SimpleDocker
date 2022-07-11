目前，SimpleDocker 重构版正在开发中，为了更好的进行开源合作，因此特记录此文件，以供二次开发和其他同学提交PR参考。

## 1、技术栈

本次开发的的模式为 B/S模型,分为服务端和浏览器端，其中服务端的主语言为 Java8, 浏览器端主语言为[TypeScript](https://www.typescriptlang.org/).  技术栈详情如下： 

#### 1.1 服务器端

+ 开发工具： JetBrains Idea
+ 编程语言： Java8
+ 业务框架： SpringBoot 2.6
+ 持久层:    MySQL 8.0 + MyBatisPlus
+ 安全框架: Spring Security
+ 工具库: [Hutool](https://hutool.cn/)

#### 1.2 浏览器端

+ 编程语言：  [TypeScript](https://www.typescriptlang.org/)、CSS
+ 前端框架: [React18](https://zh-hans.reactjs.org/)
+ 网络请求：[Axios](https://www.axios.com/)
+ UI 组件库：[Ant Design](https://ant.design/)
+ 工具库: [Lodash](https://lodash.com/)

## 2、如何本地启动

#### 2.1 服务端

服务端的启动需要安装 JDK8 以及MYSQL，其中MYSQL的数据库脚本为 `database/struct_data.sql` 在数据脚本执行完成后，修改`backend-src/src/main/resources/application-dev.yaml`文件内容的数据库URL，以及账号密码等信息，然后找到`backend-src/src/main/java/com/taoes/simpledocker/SimpleDockerApplication.java` 启动SpringBoot应用即可。



#### 2.2 前端

前端使用NodeJs构建编译，请安装稳定版本的NodeJS即可，无特殊版本要求。启动命令如下

+ npm

```shell
	npm install
	npm run start
```

+ yarn(推荐)

```shell
	yarn install
	yarn start
```

  启动成功后访问本地服务3000端口 [http://localhost:3000](http://localhost:3000) 

> 如遇端口冲突，react会启动在其他端口，一般为3001, 具体端口请参考启动日志


## 3. 如何参与开发

目前开发进度主要通过微信群的方式协助，如果您有时间想为此项贡献力量，欢迎添加微信`zhoutao825638` 或者邮件联系我`zhoutao825638@vip.qq.com`.

目前推荐的提交代码的方式如下：

+ fork仓库到自己的账号下，拉取仓库代码并切换分支到refact分支
+ 在refact分支上创建新的特性分支，然后再自己分支上提交代码并push到自己的fork仓库
+ 在源仓库上创建PR请求，审核成功后即可合并到refact，完成特性分支建设。

如果您不了解如何贡献代码，可以参考 [如何提交一个PR](https://juejin.cn/post/6854573213200941063)



## 4、目前进度如何

由于个人精力有限，重构的分支开发进展比较缓慢，目前基本功能已完成，为了同步协调，因此记录功能完成进度，以及未来的计划。

> 目前暂无好的需求管理软件，后面或尝试迁移

- [x] 镜像模块
  - [x] 基础镜像管理
  - [ ] 批量镜像管理
  - [ ] 镜像备份与导出
- [x] 容器模块
  - [x] 容器基础管理
  - [ ] 批量容器管理
  - [x] 容器状态管理
  - [ ] 容器备份与导出
  - [x] 容器在线终端
    - [x] 本地容器终端
    - [x] 远程容器终端

  - [ ] 容器在线文件管理
    - [ ] 本地文件管理
    - [ ] 远程文件管理
    - [ ] 文件导出与上传
    - [ ] 文件备份
- [x] 存储模块
  - [x] 存储卷基本管理
- [x] 网络模块
  - [x] 网络基础管理
  - [ ] 网络与容器关系
- [x] 多端模块
  - [x] 多Docker服务器链接
    - [x] 本地链接
    - [x] 远程链接
    - [ ] 远程SSL链接
  - [ ] Docker数据源配置 
- [x] 权限模块
  - [x] 基础用户管理
  - [ ] 权限管理
    - [ ] 对容器管理
    - [ ] 对镜像管理
    - [ ] 对网络管理

- [x] 监控模块
  - [x] 社交软件通知
    - [ ] 钉钉
    - [ ] 飞书
    - [ ] 企业微信
  - [x] 监控变更记录
  - [ ] 自定义WebHook
  - [ ] 容器资源监
    - [ ] CPU监控
    - [ ] 内存监控
    - [ ] 状态监控



