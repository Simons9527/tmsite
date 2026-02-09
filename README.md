# 太铭科技官网 - 静态网站

## 网站简介

太铭科技企业官网 - 精密时频与射频模组提供商，服务国防科技、通信导航与高端工业。

## 技术特点

- **纯静态网站**：仅使用 HTML + CSS + JavaScript，无需后端服务器
- **本地可运行**：双击 `index.html` 即可在浏览器中浏览
- **相对路径**：所有资源引用使用相对路径，便于部署到任意位置
- **响应式设计**：完美适配桌面端和移动端
- **多页面结构**：传统多页面网站，便于SEO优化

## 文件结构

```
timingtech-static/
├── index.html              # 首页
├── about.html              # 关于我们
├── products.html           # 产品中心
├── solutions.html          # 解决方案
├── cases.html              # 成功案例
├── contact.html            # 联系我们
├── downloads.html          # 规格书下载
├── css/
│   └── style.css           # 全局样式文件
├── js/
│   └── main.js             # 主要JavaScript文件
├── images/                 # 图片文件夹
│   ├── hero-bg.jpg
│   ├── about-product.jpg
│   ├── solution-1.jpg
│   ├── solution-2.jpg
│   ├── solution-3.jpg
│   ├── product-tm22.png
│   ├── product-tm45.png
│   ├── product-tmm33b.png
│   ├── product-tmm4733.png
│   ├── product-tmm4330.png
│   ├── product-tmm7046.png
│   ├── product-tm2000.png
│   └── product-tm3000.png
├── pdf/                    # 规格书PDF文件夹
│   ├── TM22_datasheet.pdf
│   ├── TM45_datasheet.pdf
│   ├── TMMM33B_datasheet.pdf
│   ├── TMM4733_datasheet.pdf
│   ├── TMM4330_datasheet.pdf
│   ├── TMM7046_datasheet.pdf
│   ├── TM2000_datasheet.pdf
│   └── TM3000_datasheet.pdf
└── products/               # 产品详情页面
    ├── tm22.html
    ├── tm45.html
    ├── tmmm33b.html
    ├── tmm4733.html
    ├── tmm4330.html
    ├── tmm7046.html
    ├── tm2000.html
    └── tm3000.html
```

## 如何添加新产品

### 方法一：在产品列表页面添加（推荐）

1. 打开 `products.html` 文件
2. 找到 `<!-- 产品添加区域开始 -->` 注释
3. 复制一个现有的产品卡片代码块
4. 修改以下内容：
   - `data-category`：产品分类
   - `src`：产品图片路径
   - `alt`：产品名称
   - `href`：产品详情页链接
   - 产品名称、描述、规格标签
5. 保存文件

### 方法二：创建新产品详情页

1. 在 `products/` 文件夹中复制一个现有的产品详情页（如 `tm22.html`）
2. 重命名为新产品ID（如 `newproduct.html`）
3. 修改页面中的：
   - 产品名称
   - 产品描述
   - 技术规格表格
   - 产品图片
   - 相关产品链接
4. 保存文件

### 添加产品模板

```html
<!-- 产品卡片模板 -->
<div class="product-card" data-category="产品分类">
    <div class="product-image" onclick="location.href='./products/产品ID.html'">
        <img src="./images/产品图片.png" alt="产品名称">
    </div>
    <div class="product-info">
        <p class="product-category">产品分类</p>
        <h3 class="product-name" onclick="location.href='./products/产品ID.html'">产品名称</h3>
        <p class="product-desc">产品描述</p>
        <div class="product-specs-preview">
            <span class="product-spec-tag">规格1</span>
            <span class="product-spec-tag">规格2</span>
        </div>
        <div class="product-actions">
            <a href="./products/产品ID.html" class="btn btn-outline btn-small">查看详情</a>
            <a href="./pdf/产品ID_datasheet.pdf" class="btn btn-primary btn-small" download>
                <i class="ri-download-line"></i>
            </a>
        </div>
    </div>
</div>
```

## 如何添加规格书PDF

1. 将PDF文件放入 `pdf/` 文件夹
2. 在 `downloads.html` 页面添加下载链接
3. 在对应产品页面添加下载按钮

## 部署说明

### 本地浏览

直接双击 `index.html` 文件即可在浏览器中打开网站。

### 部署到阿里云 ECS/OSS

1. 将整个 `timingtech-static` 文件夹上传到服务器
2. 确保所有文件和文件夹的权限正确
3. 配置Web服务器（如Nginx）指向该文件夹
4. 访问网站根目录即可

### Nginx配置示例

```nginx
server {
    listen 80;
    server_name www.timingtech.com;
    root /var/www/timingtech-static;
    index index.html;
    
    location / {
        try_files $uri $uri/ =404;
    }
    
    # 缓存静态资源
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|pdf)$ {
        expires 1M;
        add_header Cache-Control "public, immutable";
    }
}
```

## 浏览器兼容性

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 联系方式

- 电话：180 3811 8432
- 邮箱：sales@timingtech.com
- 地址：深圳市南山区科技园

---

© 2024 太铭科技. All rights reserved.
