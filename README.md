# 聚美臻选 - 静态网页项目

一个现代化的静态网页项目，具有地理位置检测、微信浏览器检测、区域选择和地图导航等功能。

## 功能特性

### 🌍 地理位置检测
- 自动检测用户IP地理位置
- 非浙江地区用户自动跳转到指定页面
- 支持地理位置API错误处理

### 📱 微信浏览器检测
- 自动检测微信内置浏览器
- 显示友好的提示信息
- 引导用户在外部浏览器中打开

### 🎯 服务选择
- 三个服务等级：基础服务、标准服务、高级服务
- 现代化的卡片式设计
- 流畅的动画效果和触感反馈

### 🗺️ 区域选择与导航
- 动态区域选择界面
- 集成高德地图导航
- 支持杭州各区精确定位

### 💫 现代化UI设计
- 响应式设计，支持各种设备
- 渐变背景和毛玻璃效果
- 流畅的动画和过渡效果
- 触感反馈支持

## 技术栈

- **HTML5**: 语义化标签和现代特性
- **CSS3**: Flexbox、Grid、动画、渐变
- **JavaScript ES6+**: 异步处理、模块化
- **Font Awesome**: 图标库
- **Google Fonts**: 字体优化

## 项目结构

```
my-landing-page/
├── index.html          # 主页面
├── styles.css          # 样式文件
├── script.js           # JavaScript逻辑
└── README.md           # 项目说明
```

## 部署说明

### GitHub Pages 部署

1. 将项目推送到GitHub仓库
2. 在仓库设置中启用GitHub Pages
3. 选择部署分支（通常是main或master）
4. 访问生成的URL即可使用

### 其他静态托管

项目可以部署到任何静态文件托管服务：
- Netlify
- Vercel
- 阿里云OSS
- 腾讯云COS

## 功能说明

### IP地理位置检测
使用免费的 `ipapi.co` API进行地理位置检测，支持：
- 国家检测
- 省份检测
- 城市检测
- 错误处理

### 微信浏览器检测
通过User-Agent检测微信内置浏览器，显示提示遮罩。

### 区域导航
点击区域名称自动打开高德地图导航，支持：
- 精确坐标定位
- 多种导航模式
- 跨平台兼容

### 响应式设计
- 桌面端：三列布局
- 平板端：单列布局
- 手机端：优化触摸体验

## 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- 移动端浏览器

## 性能优化

- 图片懒加载
- CSS和JS压缩
- 字体优化
- 动画性能优化
- 触感反馈优化

## 安全考虑

- 内容安全策略（CSP）
- XSS防护
- 敏感信息脱敏处理
- 地理位置隐私保护

## 开发说明

### 本地开发
1. 克隆项目到本地
2. 使用本地服务器运行（如Live Server）
3. 在浏览器中访问

### 调试模式
在浏览器控制台中可以使用 `AppUtils` 对象进行调试：
```javascript
// 手动检查地理位置
AppUtils.checkLocation();

// 显示区域选择
AppUtils.showAreaModal('low');

// 显示服务详情
AppUtils.showServiceDetails('medium');
```

## 更新日志

### v1.0.0
- 初始版本发布
- 基础功能实现
- 响应式设计
- 现代化UI

## 许可证

MIT License

## 联系方式

如有问题或建议，请通过GitHub Issues联系。 