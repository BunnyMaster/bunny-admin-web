Github地址

- [前端地址](https://github.com/BunnyMaster/bunny-admin-web.git)
- [后端地址](https://github.com/BunnyMaster/bunny-admin-server)

Gitee地址

- [前端地址](https://gitee.com/BunnyBoss/bunny-admin-web)
- [后端地址](https://gitee.com/BunnyBoss/bunny-admin-server)

# 功能介绍

系统使用的是物理删除，但是引用了逻辑删除，使用mybatisPlus如果需要逻辑删除只需要将原先删除方法调用成mybatisplus自身的删除方法即可。

作为权限管理系统，校验功能已经路由功能都是由后端完成，后端使用SpringSecurity

系统权限功能使用RBAC模型

## 系统设置

### 系统菜单

当用户登录时会根据，当前角色获取自身的菜单路由，防止返回不该返回的页面，之后权限和角色关联，根据用户权限查询可以访问的菜单内容，如果权限中没有这个路径那么会告知`无权访问`。

管理员需要在配置时，配置菜单和角色之间的关系，用户也要和角色关联，角色会关联权限表，返回路由时只返回当前用户可以访问的菜单。

- 前端做递归，排序后端也做了
- 快捷排序，快捷禁用菜单
- 路由菜单图标需要再系统配置中添加菜单图标

![image-20241023090359575](images/image-20241023090359575.png)

为菜单分配角色

![image-20241023090640516](images/image-20241023090640516.png)

### 用户管理

强制下线就是将Redis中用户信息删除

用户禁用先改数据库之后将Redis中数据进行删除

![image-20241023091239212](images/image-20241023091239212.png)

#### 关于用户管理事务问题

如果用户禁用失败或者删除Redis失败需要回滚事务，在Spring中，有集成的事务，只需要简单的配置下即可，

### 角色管理

![image-20241023091310533](images/image-20241023091310533.png)

### 权限管理

权限管理可以设置父级内容，在前端文件中有`data.js`，可以自动生成权限相关内容。

![image-20241023091328271](images/image-20241023091328271.png)

**前端文件**

![image-20241023091503966](images/image-20241023091503966.png)

### 部门管理

![image-20241023092027273](images/image-20241023092027273.png)

## 系统配置

### 菜单图标

![image-20241023092123926](images/image-20241023092123926.png)

### 邮件用户配置

发送邮件时，如果没有选定用户会去找默认用户，如果默认用户也没有会报错。

![image-20241023092145274](images/image-20241023092145274.png)

### 邮件模板

邮箱验证码，

![image-20241023092250382](images/image-20241023092250382.png)

#### 模板类型说明

根据后端的枚举类进行返回

![image-20241023092355799](images/image-20241023092355799.png)

后端文件

![image-20241023092439168](images/image-20241023092439168.png)

## 系统监控

### 服务监控

服务监控来自springboot中actuator框架

![image-20241023092520931](images/image-20241023092520931.png)

IDEA中也有集成只要使用了actuator包即可看到服务内容、健康检查等

详细参考官网API，当然如果需要后台服监控页面，德国工程师帮我们写了一个页面。

![image-20241023092652996](images/image-20241023092652996.png)

也可以看到当前的请求API有哪些

![image-20241023093159928](images/image-20241023093159928.png)

#### 相关admin服务包

或许在有些服务中不需要这个页面，有服务监控的功能，配置也简单，我之前我使用在这个项目中，和部分业务功能有些冲突，与其这样不如自己写个简单的也可以

```xml

<dependency>
  <groupId>de.codecentric</groupId>
  <artifactId>spring-boot-admin-starter-server</artifactId>
  <version>3.3.4</version>
</dependency>
<dependency>
<groupId>de.codecentric</groupId>
<artifactId>spring-boot-admin-starter-client</artifactId>
<version>3.2.3</version>
</dependency>
```

### 后台文件管理

用户上传的文件和头像内容都在这里，文件存储位置在Minio中

![image-20241023093247261](images/image-20241023093247261.png)

### 用户登录日志

![image-20241023093317701](images/image-20241023093317701.png)

### 任务执行日志

当前设定的定时任务有关，目前有数据库备份，和简单的定时任务示例内容都在这，使用JS对象可视化，数据多时会有些卡顿

![image-20241023093407627](images/image-20241023093407627.png)

## 定时任务

### 调度任务

其实就是定时任务，集成框架quartz，持久化存储任务

![image-20241023093546293](images/image-20241023093546293.png)

### 任务调度分组

![image-20241023093602223](images/image-20241023093602223.png)

## 多语言管理

### 多语言

![image-20241023093639866](images/image-20241023093639866.png)

### 多语言类型

如果以后还需要其它语言可以在这个地方添加

![image-20241023093654135](images/image-20241023093654135.png)

## 其它功能

![image-20241023093729543](images/image-20241023093729543.png)

### 账户设置

![image-20241023093749870](images/image-20241023093749870.png)

![image-20241023093759347](images/image-20241023093759347.png)

![image-20241023093807425](images/image-20241023093807425.png)

### 数据库事务

数据库事务在Springboot中只需要一个注解，通常我们还需要redis事务，在Redis中配置开启即可。

![image-20241023094104297](images/image-20241023094104297.png)

### 去除字符串空格

在项目中，会统一进行空白字符串去除，配置项也在config文件夹下

![image-20241023094247311](images/image-20241023094247311.png)

> 更多配置看这里
>
> ![image-20241023094311326](images/image-20241023094311326.png)

# Docker配置详情

如果想更改端口号，前面的对外访问的端口号，后面是容器也就是服务本身端口号
![img.png](images/1.png)

项目本身端口号
![img.png](images/2.png)

部署命令

```bash
docker build -f Dockerfile -t bunny_auth_web:1.0.0 . && docker run -p 80:80 --name bunny_auth_web --restart always bunny_auth_web:1.0.0 
```

# 展望未来

1. 数据库备份时上传到Minio
2. 数据库备份后可恢复
3. 定时邮件发送参数可在前端配置，动态形式
4. 首页看板内容