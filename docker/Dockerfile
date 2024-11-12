# 使用官方的 Nginx 镜像作为基础镜像
FROM nginx

# 删除默认的 Nginx 配置文件
RUN rm /etc/nginx/conf.d/default.conf

# 将自定义的 Nginx 配置文件复制到容器中
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY bunny-web.site.csr /etc/nginx/bunny-web.site.csr
COPY bunny-web.site.key /etc/nginx/bunny-web.site.key
COPY bunny-web.site_bundle.crt /etc/nginx/bunny-web.site_bundle.crt
COPY bunny-web.site_bundle.pem /etc/nginx/bunny-web.site_bundle.pem

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
EXPOSE 443

# 自动启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
