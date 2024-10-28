Github地址

- [前端地址](https://github.com/BunnyMaster/bunny-admin-web.git)
- [后端地址](https://github.com/BunnyMaster/bunny-admin-server)

Gitee地址

- [前端地址](https://gitee.com/BunnyBoss/bunny-admin-web)
- [后端地址](https://gitee.com/BunnyBoss/bunny-admin-server)

# 项目特点

前端项目基于[pure-admin](https://github.com/pure-admin/pure-admin-thin)
开源项目进行了改进和优化，RBAC（基于角色的访问控制）。在我项目中，后端负责验证请求地址的访问权限。

整个项目都采用响应式设计，可以兼容移动设备，除了表格显示在移动端可能不够友好外，其他方面表现良好。由于表格本身具有一定的复杂性，手机上查看效果可能不理想，目前无法对其进行修改。

![image-20241026032407486](https://auth-1303941925.cos.ap-nanjing.myqcloud.com/undefinedimage-20241026032407486.png)

## 登录内容

登录可以选择用户名和密码登录或者是邮箱方式登录

![image-20241028090631003](https://auth-1303941925.cos.ap-nanjing.myqcloud.com/undefinedimage-20241028090631003.png)

![image-20241028090646664](https://auth-1303941925.cos.ap-nanjing.myqcloud.com/undefinedimage-20241028090646664.png)

## 1. 首页定制

提供了自定义首页的功能，可以根据个人喜好替换首页内容。我将首页设计成类似Git提交的内容，以便更直观地查看信息。

## 2. 系统设置

系统设置包含基本的权限管理配置。

### 系统菜单管理

系统菜单管理功能允许您快速调整菜单内容的排序、显示和隐藏。删除功能采用逻辑删除，菜单名称通常与路由名称相同。如果菜单名称重复，系统会跳转至最后一个具有相同名称的路径，因此请确保菜单名称的唯一性。

系统菜单图标支持动态图标。

![image-20241026025901761](https://auth-1303941925.cos.ap-nanjing.myqcloud.com/undefinedimage-20241026025901761.png)

在添加外链时，路由名称即为外链地址。

![image-20241026025825052](https://auth-1303941925.cos.ap-nanjing.myqcloud.com/undefinedimage-20241026025825052.png)

### 用户管理

筛选条件和部门筛选可以同时进行选择。

其中系统中有一个默认用户是不会在前台用户进行展示的`Administrator`这个用户是系统预留，以防出错或维护使用

![image-20241026030000099](https://auth-1303941925.cos.ap-nanjing.myqcloud.com/undefinedimage-20241026030000099.png)

### 角色权限管理

权限管理中的权限添加支持树型结构。

![image-20241026030034998](https://auth-1303941925.cos.ap-nanjing.myqcloud.com/undefinedimage-20241026030034998.png)

![image-20241026030057212](https://auth-1303941925.cos.ap-nanjing.myqcloud.com/undefinedimage-20241026030057212.png)

在新增权限时，请求地址可以是正则表达式或者Java中的antpath，两者皆可兼容。

![image-20241026030247782](https://auth-1303941925.cos.ap-nanjing.myqcloud.com/undefinedimage-20241026030247782.png)

部门管理同样采用树型结构。

![image-20241026030105402](https://auth-1303941925.cos.ap-nanjing.myqcloud.com/undefinedimage-20241026030105402.png)

## 3. 系统配置

### 菜单图标

![image-20241026030355125](https://auth-1303941925.cos.ap-nanjing.myqcloud.com/undefinedimage-20241026030355125.png)

### 邮件用户配置

发送验证码时，若未配置用户默认值，则会使用默认地址发送。若默认地址也未配置，则会提示未设置默认邮箱用户。

默认选项最终只有一个。

其中默认选项无论有多少用户最终默认的只会有一个

![image-20241026030534421](https://auth-1303941925.cos.ap-nanjing.myqcloud.com/undefinedimage-20241026030534421.png)

### 邮件模板

第一个是发送验证码邮件模板

![image-20241026030557224](https://auth-1303941925.cos.ap-nanjing.myqcloud.com/undefinedimage-20241026030557224.png)

### 前端页面配置

因为这个模板作者将配置选项放在了前端文件中的`public`文件夹下， 配置选项现已变为动态，交给后端管理

![image-20241026030621707](https://auth-1303941925.cos.ap-nanjing.myqcloud.com/undefinedimage-20241026030621707.png)

## 4. 系统监控

### 服务监控

查看当前服务的CPU占用情况，使用SpringBoot中的`actuator`端点。图表每2秒请求一次，页面兼容移动设备。

![image-20241026031050902](https://auth-1303941925.cos.ap-nanjing.myqcloud.com/undefinedimage-20241026031050902.png)

### 后台文件管理

![image-20241026031117116](https://auth-1303941925.cos.ap-nanjing.myqcloud.com/undefinedimage-20241026031117116.png)

### 用户登录日志

![image-20241026031206836](https://auth-1303941925.cos.ap-nanjing.myqcloud.com/undefinedimage-20241026031206836.png)

### 任务执行日志

使用任务调度时执行状态都会记录在这个里面

![image-20241026031240109](https://auth-1303941925.cos.ap-nanjing.myqcloud.com/undefinedimage-20241026031240109.png)

### 系统缓存

项目中使用了SpringCache，如果请求的内容可以缓存在SpringCache中

![image-20241026031252429](https://auth-1303941925.cos.ap-nanjing.myqcloud.com/undefinedimage-20241026031252429.png)

## 5. 定时任务

![image-20241026031339987](https://auth-1303941925.cos.ap-nanjing.myqcloud.com/undefinedimage-20241026031339987.png)

![image-20241026031346612](https://auth-1303941925.cos.ap-nanjing.myqcloud.com/undefinedimage-20241026031346612.png)

## 6. 多语言

![image-20241026031403524](https://auth-1303941925.cos.ap-nanjing.myqcloud.com/undefinedimage-20241026031403524.png)

![image-20241026031411689](https://auth-1303941925.cos.ap-nanjing.myqcloud.com/undefinedimage-20241026031411689.png)

## 外部页面

![image-20241026031448707](https://auth-1303941925.cos.ap-nanjing.myqcloud.com/undefinedimage-20241026031448707.png)

# 环境部署

使用Docker进行部署，后端接口地址以`/admin`开头，但前端默认请求前缀为`/api`，因此在请求时需要进行替换。详细内容请参考以下【项目部署】说明。

## 配置相关

### docker文件

```dockerfile
# 使用官方的 Nginx 镜像作为基础镜像
FROM nginx

# 删除默认的 Nginx 配置文件
RUN rm /etc/nginx/conf.d/default.conf

# 将自定义的 Nginx 配置文件复制到容器中
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 设置时区，构建镜像时执行的命令
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN echo "Asia/Shanghai" > /etc/timezone

# 创建一个目录来存放前端项目文件
WORKDIR /usr/share/nginx/html

# 将前端项目打包文件复制到 Nginx 的默认静态文件目录
COPY dist/ /usr/share/nginx/html
# 复制到nginx目录下
COPY dist/ /etc/nginx/html

# 暴露 Nginx 的默认端口
EXPOSE 80

# 自动启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
```

### NGINX文件

在请求中会使用代理所以会拿不到用户真实的IP地址，素以在要NGINX侠做下面的配置，这样用户在访问时就可以拿到真实的IP了

```nginx
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
```

NGINX的文件

```nginx
map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}

server {
    listen       80;
    listen       [::]:80;
    server_name  localhost;

    location / {
        root   /etc/nginx/html;
        index  index.html index.htm;
        try_files $uri /index.html;
    }

    # 后端跨域请求
    location ~/admin/ {
        proxy_pass http://172.17.0.1:8000;
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    error_page  404              404.html;

    location = /50x.html {
        root   html;
    }
}
```

## 项目部署

使用WebStorm进行项目部署，项目上线时默认端口为80。因此，Docker默认暴露的IP端口也应为80，NGINX中默认暴露的端口也是80，三者应一一对应。

若无法下载，请先使用pnpm下载。若不需使用pnpm，请删除或修改相应内容。

![image-20241026025057129](https://auth-1303941925.cos.ap-nanjing.myqcloud.com/undefinedimage-20241026025057129.png)

### docker配置

![image-20241026024116090](https://auth-1303941925.cos.ap-nanjing.myqcloud.com/undefinedimage-20241026024116090.png)

### 配置环境

设置启动端口号和项目地址机器后端请求地址

![image-20241026024813858](https://auth-1303941925.cos.ap-nanjing.myqcloud.com/undefinedimage-20241026024813858.png)

#### 配置线上环境

设置项目启动端口号，线上环境默认请求路径为`/admin`，需在NGINX中将访问请求前缀更改为`/admin`。

![image-20241026024940747](https://auth-1303941925.cos.ap-nanjing.myqcloud.com/undefinedimage-20241026024940747.png)

![image-20241026024243785](https://auth-1303941925.cos.ap-nanjing.myqcloud.com/undefinedimage-20241026024243785.png)

#### 配置开发环境

开发环境默认IP为7000，若与本地项目端口冲突，请修改。后端请求地址为7070。

前端设置的请求前缀为`/api`，但后端接受的前缀为`/admin`，因此需在服务中修改此内容。

![image-20241026024318644](https://auth-1303941925.cos.ap-nanjing.myqcloud.com/undefinedimage-20241026024318644.png)

**修改请求路径**

![image-20241026031651591](https://auth-1303941925.cos.ap-nanjing.myqcloud.com/undefinedimage-20241026031651591.png)

### 部署命令

```bash
docker build -f Dockerfile -t bunny_auth_web:1.0.0 . && docker run -p 80:80 --name bunny_auth_web --restart always bunny_auth_web:1.0.0
```

# 展望未来

1. 计划将文件上传服务改为本地的OSS，Minio可能会被移除。
1. 消息服务，管理员相关的消息公告内容
