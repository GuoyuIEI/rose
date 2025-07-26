# 💖 生日快乐玫瑰花特效网页 💖

一个专为生日庆祝制作的浪漫玫瑰花特效网页，包含3D玫瑰花动画、粒子特效、背景音乐和互动元素。

## ✨ 特性

- 🌹 **3D玫瑰花动画** - 逼真的3D玫瑰花，带有绽放和旋转效果
- ✨ **粒子特效系统** - 爱心、星星、光点等多种粒子效果
- 🎵 **背景音乐支持** - 支持背景音乐播放和控制
- 💫 **交互式动画** - 点击玫瑰花触发特殊动画效果
- 📱 **移动端优化** - 完美适配手机和平板设备
- 🚀 **性能优化** - 智能性能监控和自动优化
- 💝 **打字机效果** - 浪漫的祝福文字动画
- 🎆 **惊喜特效** - 烟花和特殊动画效果

## 🎯 在线演示

访问 [GitHub Pages 链接](https://your-username.github.io/repository-name) 查看在线演示。

## 🚀 快速开始

### 方法一：直接使用
1. 下载或克隆此仓库
2. 在 `audio/` 文件夹中添加背景音乐文件（命名为 `birthday-music.mp3`）
3. 用浏览器打开 `index.html` 即可

### 方法二：GitHub Pages 部署
1. Fork 此仓库到你的 GitHub 账户
2. 在仓库设置中启用 GitHub Pages
3. 选择 `main` 分支作为源
4. 访问 `https://your-username.github.io/repository-name`

## 📁 项目结构

```
├── index.html              # 主页面
├── css/                    # 样式文件
│   ├── style.css          # 主样式
│   ├── rose.css           # 玫瑰花样式
│   └── particles.css      # 粒子效果样式
├── js/                     # JavaScript 文件
│   ├── main.js            # 主控制脚本
│   ├── rose-animation.js  # 玫瑰花动画
│   ├── message-animation.js # 消息动画
│   ├── particles-config.js # 粒子配置
│   ├── audio-manager.js   # 音频管理
│   ├── mobile-optimizer.js # 移动端优化
│   └── performance-monitor.js # 性能监控
├── audio/                  # 音频文件
│   └── README.md          # 音频文件说明
├── _config.yml            # GitHub Pages 配置
└── README.md              # 项目说明
```

## 🎵 音频设置

1. 准备一个 MP3 格式的背景音乐文件
2. 将文件重命名为 `birthday-music.mp3`
3. 放置在 `audio/` 文件夹中
4. 确保文件大小不超过 5MB（GitHub 限制）

### 推荐音乐类型：
- 轻柔的钢琴曲
- 浪漫的器乐音乐
- 生日主题的轻音乐

### 免费音乐资源：
- [Pixabay Music](https://pixabay.com/music/)
- [Freesound](https://freesound.org/)
- [YouTube Audio Library](https://www.youtube.com/audiolibrary)

## 🎨 自定义

### 修改祝福文字
编辑 `js/message-animation.js` 文件中的 `messages` 数组：

```javascript
this.messages = [
    "你的自定义祝福文字 🎂",
    "更多祝福内容 🌹",
    // 添加更多...
];
```

### 修改颜色主题
编辑 `css/style.css` 文件中的颜色变量：

```css
:root {
    --primary-color: #ff6b6b;
    --secondary-color: #feca57;
    --accent-color: #48dbfb;
}
```

### 调整动画速度
在相应的 CSS 文件中修改 `animation-duration` 属性。

## 📱 移动端支持

- ✅ 响应式设计
- ✅ 触摸事件支持
- ✅ 性能自动优化
- ✅ 屏幕方向适配
- ✅ 防止意外缩放

## 🔧 浏览器兼容性

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ 移动端浏览器

## 📄 许可证

此项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 💝 致谢

感谢所有开源库的贡献者：
- [Particles.js](https://github.com/VincentGarreau/particles.js/)
- [Google Fonts](https://fonts.google.com/)

---

💖 **用爱制作，献给特别的人** 💖
