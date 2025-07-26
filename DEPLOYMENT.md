# 🚀 GitHub Pages 部署指南

本指南将详细介绍如何将玫瑰花特效网页部署到GitHub Pages，让全世界都能访问你的浪漫礼物。

## 📋 部署前准备

### 1. 准备工作
- [ ] 拥有GitHub账户
- [ ] 准备背景音乐文件（MP3格式，建议小于5MB）
- [ ] 确认所有文件都已准备就绪

### 2. 音频文件准备
1. 将背景音乐文件重命名为 `birthday-music.mp3`
2. 放置在 `audio/` 文件夹中
3. 确保文件大小不超过GitHub的限制（建议5MB以内）

## 🎯 方法一：Fork 现有仓库（推荐）

### 步骤1：Fork仓库
1. 访问原始仓库页面
2. 点击右上角的 "Fork" 按钮
3. 选择你的GitHub账户作为目标

### 步骤2：重命名仓库（可选）
1. 进入你Fork的仓库
2. 点击 "Settings" 标签
3. 在 "Repository name" 中输入新名称，如 `my-birthday-gift`
4. 点击 "Rename" 确认

### 步骤3：启用GitHub Pages
1. 在仓库页面点击 "Settings" 标签
2. 滚动到 "Pages" 部分
3. 在 "Source" 下拉菜单中选择 "Deploy from a branch"
4. 选择 "main" 分支
5. 文件夹选择 "/ (root)"
6. 点击 "Save"

### 步骤4：等待部署
- GitHub会自动构建和部署你的网站
- 通常需要几分钟时间
- 部署完成后会显示网站URL

## 🔧 方法二：创建新仓库

### 步骤1：创建新仓库
1. 登录GitHub
2. 点击右上角的 "+" 按钮
3. 选择 "New repository"
4. 输入仓库名称（如：`birthday-rose-gift`）
5. 确保仓库是 "Public"（GitHub Pages免费版需要）
6. 勾选 "Add a README file"
7. 点击 "Create repository"

### 步骤2：上传文件
1. 在新创建的仓库页面点击 "uploading an existing file"
2. 将所有项目文件拖拽到上传区域
3. 或者点击 "choose your files" 选择文件
4. 添加提交信息：`Initial commit: Birthday rose website`
5. 点击 "Commit changes"

### 步骤3：启用GitHub Pages
按照方法一的步骤3进行设置。

## 🌐 方法三：使用Git命令行

### 前提条件
- 安装Git
- 配置GitHub SSH密钥或使用HTTPS

### 步骤1：克隆或初始化仓库
```bash
# 如果是新仓库
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

# 或者在现有文件夹中初始化
git init
git remote add origin https://github.com/your-username/your-repo-name.git
```

### 步骤2：添加文件并提交
```bash
# 添加所有文件
git add .

# 提交更改
git commit -m "Initial commit: Birthday rose website"

# 推送到GitHub
git push -u origin main
```

### 步骤3：启用GitHub Pages
按照方法一的步骤3进行设置。

## 🎵 音频文件处理

### 如果音频文件过大
1. **压缩音频**：
   - 使用在线工具如 [Audio Compressor](https://www.audiocompressor.com/)
   - 或使用软件如 Audacity

2. **使用外部托管**：
   ```javascript
   // 在 index.html 中修改音频源
   <audio id="background-music" loop>
       <source src="https://your-audio-hosting-service.com/birthday-music.mp3" type="audio/mpeg">
   </audio>
   ```

3. **使用Git LFS**（大文件存储）：
   ```bash
   git lfs track "*.mp3"
   git add .gitattributes
   git add audio/birthday-music.mp3
   git commit -m "Add audio file with LFS"
   git push
   ```

## 🔗 自定义域名设置

### 步骤1：购买域名
- 从域名注册商购买域名（如：GoDaddy、Namecheap等）

### 步骤2：配置DNS
在你的域名管理面板中添加以下记录：

**对于顶级域名（example.com）：**
```
Type: A
Name: @
Value: 185.199.108.153
```
```
Type: A
Name: @
Value: 185.199.109.153
```
```
Type: A
Name: @
Value: 185.199.110.153
```
```
Type: A
Name: @
Value: 185.199.111.153
```

**对于子域名（www.example.com）：**
```
Type: CNAME
Name: www
Value: your-username.github.io
```

### 步骤3：在GitHub中配置自定义域名
1. 进入仓库的 "Settings" 页面
2. 滚动到 "Pages" 部分
3. 在 "Custom domain" 输入框中输入你的域名
4. 点击 "Save"
5. 等待DNS验证完成（可能需要24-48小时）

### 步骤4：启用HTTPS（推荐）
1. DNS验证完成后
2. 勾选 "Enforce HTTPS" 选项

## 🔍 故障排除

### 常见问题

**1. 网站无法访问**
- 检查GitHub Pages是否已启用
- 确认分支选择正确（通常是main）
- 等待几分钟让部署完成

**2. 音频无法播放**
- 检查音频文件路径是否正确
- 确认文件格式为MP3
- 检查文件大小是否超限

**3. 移动端显示异常**
- 清除浏览器缓存
- 检查网络连接
- 尝试刷新页面

**4. 自定义域名不工作**
- 检查DNS设置是否正确
- 等待DNS传播完成（最多48小时）
- 确认域名拼写正确

### 调试技巧

**1. 查看构建状态**
- 在仓库页面查看 "Actions" 标签
- 检查是否有构建错误

**2. 使用浏览器开发者工具**
- 按F12打开开发者工具
- 查看Console标签中的错误信息
- 检查Network标签中的资源加载情况

**3. 检查文件路径**
- 确保所有文件路径使用相对路径
- 检查大小写是否正确（Linux系统区分大小写）

## 📊 性能优化建议

### 1. 图片优化
- 使用WebP格式（如果有图片）
- 压缩图片大小
- 使用适当的图片尺寸

### 2. 代码优化
- 启用Gzip压缩
- 最小化CSS和JavaScript文件
- 使用CDN加载外部资源

### 3. 缓存策略
- 设置适当的缓存头
- 使用版本号管理静态资源

## 🎉 部署完成后

### 测试清单
- [ ] 网站可以正常访问
- [ ] 玫瑰花动画正常显示
- [ ] 粒子效果工作正常
- [ ] 音频可以播放（需要用户交互）
- [ ] 移动端显示正常
- [ ] 所有按钮功能正常

### 分享你的作品
1. 复制GitHub Pages URL
2. 分享给你的爱人
3. 在社交媒体上展示（如果愿意的话）

## 📞 获取帮助

如果遇到问题：
1. 查看GitHub Pages官方文档
2. 搜索相关的GitHub Issues
3. 在项目仓库中创建Issue
4. 联系GitHub支持

---

🎊 **恭喜！你的浪漫礼物现在已经在线上了！** 🎊

记住：最好的礼物不是代码，而是你投入的爱和心意。💖
