---
title: "Vue3+Fast API前后端分离配置"
date: "2026-05-16"
tags: []
csdnUrl: "https://blog.csdn.net/weixin_63110324/article/details/156561469"
source: csdn
---
### 一、部署方案选择（使用Docker）

Docker部署：一键部署，环境隔离，迁移方便

### 二、部署前准备

#### 1. 服务器准备

云服务器（我使用的是华为云）推荐配置：1核2G（入门足够）系统选择：Ubuntu 22.04（最友好）

![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/3096c0ba558541b0aa3788a7dab3e690.png)

#### 2. 本地代码检查

##### 后端代码（Python）：

没有部署数据库等服务，如果需要还需要补充.env文件

```
your-backend-project/
├── app/                  
├── requirements.txt        
├── Dockerfile          
└── .docker-compose.yml                

```

##### 前端代码（Vue）需要：

```
your-frontend-project/
├── dist/                  # 构建后的静态文件
├── Dockerfile             # Docker配置文件
└── nginx.conf            # Nginx配置

```

### 三、具体部署步骤

#### 第一步：服务器基础配置

```bash
# 1. 登录服务器（使用SSH）
ssh root@你的服务器IP

# 2. 更新系统
sudo apt update
sudo apt upgrade -y

# 3. 安装Docker和Docker Compose
sudo apt install docker.io -y
sudo apt install docker-compose -y

# 4. 启动Docker
sudo systemctl start docker
sudo systemctl enable docker

```

#### 第二步：准备后端Docker配置

##### 1. 在后端项目根目录创建 Dockerfile：

```dockerfile
FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8083"]

```

##### 3. 创建 docker-compose.yml：

```yaml
version: '3.8'

services:
  # 后端服务
  backend:
    build: ./backend
    container_name: backend
    restart: unless-stopped
    ports:
      - "8083:8083"
    networks:
      - ai-doc-network
    healthcheck:
      test: ["CMD", "python", "-c", "import urllib.request; urllib.request.urlopen('http://localhost:8083/api/health')"]
      interval: 30s
      timeout: 10s
      retries: 3

  # 前端服务
  frontend:
    build: ./frontend
    container_name: frontend
    restart: unless-stopped
    ports:
      - "5175:80"
    depends_on:
      backend:
        condition: service_healthy
    networks:
      - network

networks:
  ai-doc-network:
    driver: bridge

```

#### 第三步：准备前端部署

##### 1. 构建前端代码：

```bash
# 在你的Vue项目目录下
npm run build  # 或 yarn build
# 这会生成 dist/ 目录

```

##### 2. 创建前端Nginx配置文件：

```nginx
server {
    listen 80;
    server_name localhost;

    # 前端 SPA
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # API 代理
    location /api/ {
        proxy_pass http://backend:8083/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location /docs {
        proxy_pass http://backend:8083/docs;
    }

    location /openapi.json {
        proxy_pass http://backend:8083/openapi.json;
    }
}

```

#### 第四步：上传代码到服务器

```bash
# 方法1：使用SCP
# 在本地终端执行：
scp -r your-backend-project root@服务器IP:/home/
scp -r your-frontend-project/dist root@服务器IP:/home/frontend-dist

# 方法2：使用Git
# 在服务器上：
cd /home
git clone 你的代码仓库地址

#方法3：直接使用华为云的远程登录
在控制台找到远程登录，上传文件

```

#### 第五步：在服务器上启动服务

```bash
# 进入项目目录
cd /home/your-backend-project

# 使用Docker Compose启动所有服务
docker-compose up -d

# 查看运行状态
docker-compose ps

# 查看日志
docker-compose logs -f backend

```

### 四、前后端联调配置

#### 1. 解决跨域问题

##### 后端配置：

```python
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

```

#### 2. 配置前端API地址

##### 在Vue项目中创建配置文件：

```javascript
// src/config.js
const config = {
  // 开发环境
  development: {
    baseURL: 'http://localhost:8000/api'
  },
  // 生产环境
  production: {
    baseURL: '/api'  // 使用相对路径，由Nginx转发
  }
}

export default config[process.env.NODE_ENV]

```

### 五、生成接口文档

#### 自动生成API文档

##### FastAPI（内置Swagger文档）：

```python
from fastapi import FastAPI

app = FastAPI(title="我的API", version="1.0.0")

# 访问地址：
# http://你的域名/docs     # 交互式文档

```

### 六、常用命令和调试

```bash
# 查看所有容器
docker ps -a

# 进入容器内部
docker exec -it 容器名 bash

# 查看日志
docker logs 容器名
docker logs -f 容器名  # 实时查看

# 重启服务
docker-compose restart

# 停止服务
docker-compose down

# 更新代码后重新构建
docker-compose up -d --build

```

### 七、故障排查清单

端口无法访问：检查服务器安全组/防火墙设置数据库连接失败：检查数据库容器是否启动跨域问题：检查CORS配置和Nginx代理设置静态文件404：检查Nginx配置中的root路径内存不足：使用 docker stats 查看资源使用

                
                
                
        
                    
                        
                    
                    
### 一、部署方案选择（使用Docker）

Docker部署：一键部署，环境隔离，迁移方便

### 二、部署前准备

#### 1. 服务器准备

云服务器（我使用的是华为云）推荐配置：1核2G（入门足够）系统选择：Ubuntu 22.04（最友好）

![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/3096c0ba558541b0aa3788a7dab3e690.png)

#### 2. 本地代码检查

##### 后端代码（Python）：

没有部署数据库等服务，如果需要还需要补充.env文件

```
your-backend-project/
├── app/                  
├── requirements.txt        
├── Dockerfile          
└── .docker-compose.yml                

```

##### 前端代码（Vue）需要：

```
your-frontend-project/
├── dist/                  # 构建后的静态文件
├── Dockerfile             # Docker配置文件
└── nginx.conf            # Nginx配置

```

### 三、具体部署步骤

#### 第一步：服务器基础配置

```bash
# 1. 登录服务器（使用SSH）
ssh root@你的服务器IP

# 2. 更新系统
sudo apt update
sudo apt upgrade -y

# 3. 安装Docker和Docker Compose
sudo apt install docker.io -y
sudo apt install docker-compose -y

# 4. 启动Docker
sudo systemctl start docker
sudo systemctl enable docker

```

#### 第二步：准备后端Docker配置

##### 1. 在后端项目根目录创建 Dockerfile：

```dockerfile
FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8083"]

```

##### 3. 创建 docker-compose.yml：

```yaml
version: '3.8'

services:
  # 后端服务
  backend:
    build: ./backend
    container_name: backend
    restart: unless-stopped
    ports:
      - "8083:8083"
    networks:
      - ai-doc-network
    healthcheck:
      test: ["CMD", "python", "-c", "import urllib.request; urllib.request.urlopen('http://localhost:8083/api/health')"]
      interval: 30s
      timeout: 10s
      retries: 3

  # 前端服务
  frontend:
    build: ./frontend
    container_name: frontend
    restart: unless-stopped
    ports:
      - "5175:80"
    depends_on:
      backend:
        condition: service_healthy
    networks:
      - network

networks:
  ai-doc-network:
    driver: bridge

```

#### 第三步：准备前端部署

##### 1. 构建前端代码：

```bash
# 在你的Vue项目目录下
npm run build  # 或 yarn build
# 这会生成 dist/ 目录

```

##### 2. 创建前端Nginx配置文件：

```nginx
server {
    listen 80;
    server_name localhost;

    # 前端 SPA
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # API 代理
    location /api/ {
        proxy_pass http://backend:8083/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location /docs {
        proxy_pass http://backend:8083/docs;
    }

    location /openapi.json {
        proxy_pass http://backend:8083/openapi.json;
    }
}

```

#### 第四步：上传代码到服务器

```bash
# 方法1：使用SCP
# 在本地终端执行：
scp -r your-backend-project root@服务器IP:/home/
scp -r your-frontend-project/dist root@服务器IP:/home/frontend-dist

# 方法2：使用Git
# 在服务器上：
cd /home
git clone 你的代码仓库地址

#方法3：直接使用华为云的远程登录
在控制台找到远程登录，上传文件

```

#### 第五步：在服务器上启动服务

```bash
# 进入项目目录
cd /home/your-backend-project

# 使用Docker Compose启动所有服务
docker-compose up -d

# 查看运行状态
docker-compose ps

# 查看日志
docker-compose logs -f backend

```

### 四、前后端联调配置

#### 1. 解决跨域问题

##### 后端配置：

```python
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

```

#### 2. 配置前端API地址

##### 在Vue项目中创建配置文件：

```javascript
// src/config.js
const config = {
  // 开发环境
  development: {
    baseURL: 'http://localhost:8000/api'
  },
  // 生产环境
  production: {
    baseURL: '/api'  // 使用相对路径，由Nginx转发
  }
}

export default config[process.env.NODE_ENV]

```

### 五、生成接口文档

#### 自动生成API文档

##### FastAPI（内置Swagger文档）：

```python
from fastapi import FastAPI

app = FastAPI(title="我的API", version="1.0.0")

# 访问地址：
# http://你的域名/docs     # 交互式文档

```

### 六、常用命令和调试

```bash
# 查看所有容器
docker ps -a

# 进入容器内部
docker exec -it 容器名 bash

# 查看日志
docker logs 容器名
docker logs -f 容器名  # 实时查看

# 重启服务
docker-compose restart

# 停止服务
docker-compose down

# 更新代码后重新构建
docker-compose up -d --build

```

### 七、故障排查清单

端口无法访问：检查服务器安全组/防火墙设置数据库连接失败：检查数据库容器是否启动跨域问题：检查CORS配置和Nginx代理设置静态文件404：检查Nginx配置中的root路径内存不足：使用 docker stats 查看资源使用