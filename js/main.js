// 主控制脚本
class BirthdayApp {
    constructor() {
        this.roseAnimation = null;
        this.messageAnimation = null;
        this.audioManager = null;
        this.mobileOptimizer = null;
        this.performanceMonitor = null;
        this.musicToggle = null;
        this.surpriseBtn = null;
        this.isMusicPlaying = false;
        this.init();
    }

    init() {
        // 等待DOM加载完成
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupApp();
            });
        } else {
            this.setupApp();
        }
    }

    setupApp() {
        // 初始化各个组件
        this.initializeComponents();
        this.setupEventListeners();
        this.setupResponsiveHandlers();
        this.startApp();
    }

    initializeComponents() {
        // 初始化性能监控器（最先初始化）
        if (window.PerformanceMonitor) {
            this.performanceMonitor = new window.PerformanceMonitor();
        }

        // 初始化移动端优化器
        if (window.MobileOptimizer) {
            this.mobileOptimizer = new window.MobileOptimizer();
        }

        // 初始化音频管理器
        if (window.AudioManager) {
            this.audioManager = new window.AudioManager();
        }

        // 根据设备性能决定是否初始化粒子系统
        const deviceInfo = this.mobileOptimizer ? this.mobileOptimizer.getDeviceInfo() : { performanceLevel: 'high' };
        if (window.particleEffects && deviceInfo.performanceLevel !== 'low') {
            window.particleEffects.init();
            window.particleEffects.createDecorative();
        }

        // 初始化玫瑰花动画
        if (window.RoseAnimation) {
            this.roseAnimation = new window.RoseAnimation();
        }

        // 初始化消息动画
        if (window.MessageAnimation) {
            this.messageAnimation = new window.MessageAnimation();
        }

        // 获取DOM元素
        this.musicToggle = document.getElementById('music-toggle');
        this.surpriseBtn = document.getElementById('surprise-btn');
    }

    setupEventListeners() {
        // 音乐控制按钮
        if (this.musicToggle) {
            this.musicToggle.addEventListener('click', () => {
                this.toggleMusic();
            });
        }

        // 惊喜按钮
        if (this.surpriseBtn) {
            this.surpriseBtn.addEventListener('click', () => {
                this.triggerSurprise();
            });
        }

        // 键盘快捷键
        document.addEventListener('keydown', (e) => {
            this.handleKeyPress(e);
        });

        // 页面可见性变化
        document.addEventListener('visibilitychange', () => {
            this.handleVisibilityChange();
        });

        // 点击页面任意位置创建烟花
        document.addEventListener('click', (e) => {
            if (e.target.tagName !== 'BUTTON' && !e.target.closest('.rose-container')) {
                this.createClickFirework(e.clientX, e.clientY);
            }
        });
    }

    setupResponsiveHandlers() {
        // 窗口大小变化
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // 设备方向变化
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.handleResize();
            }, 100);
        });
    }

    startApp() {
        // 显示欢迎动画
        this.showWelcomeAnimation();
        
        // 预加载音频
        this.preloadAudio();
    }

    // 音乐控制
    async toggleMusic() {
        if (!this.audioManager) return;

        if (this.isMusicPlaying) {
            this.audioManager.pauseBackgroundMusic();
            this.isMusicPlaying = false;
            this.updateMusicButton('🎵', '播放音乐');
            this.audioManager.playSound('click');
        } else {
            // 尝试播放音乐
            const success = await this.audioManager.playBackgroundMusic();
            if (success) {
                this.isMusicPlaying = true;
                this.updateMusicButton('🔇', '暂停音乐');
                this.audioManager.playSound('click');
            } else {
                this.showMusicError();
            }
        }
    }

    updateMusicButton(icon, text) {
        const iconElement = this.musicToggle.querySelector('.music-icon');
        const textElement = this.musicToggle.querySelector('.btn-text');
        
        if (iconElement) iconElement.textContent = icon;
        if (textElement) textElement.textContent = text;
    }

    showMusicError() {
        if (this.messageAnimation) {
            this.messageAnimation.showMessage('请点击页面后再尝试播放音乐 🎵', true);
        }
    }

    // 惊喜效果
    triggerSurprise() {
        // 播放惊喜音效
        if (this.audioManager) {
            this.audioManager.playSound('surprise');
        }

        // 玫瑰花特殊动画
        if (this.roseAnimation) {
            this.roseAnimation.triggerSurpriseAnimation();
        }

        // 粒子特效
        if (window.particleEffects) {
            window.particleEffects.activateSurprise();
        }

        // 特殊消息
        if (this.messageAnimation) {
            this.messageAnimation.showSurpriseMessage();
        }

        // 按钮动画
        this.animateSurpriseButton();
    }

    animateSurpriseButton() {
        this.surpriseBtn.style.animation = 'surpriseButtonPulse 1s ease-out';
        setTimeout(() => {
            this.surpriseBtn.style.animation = '';
        }, 1000);
    }

    // 键盘事件处理
    handleKeyPress(e) {
        switch(e.key) {
            case ' ': // 空格键
                e.preventDefault();
                this.toggleMusic();
                break;
            case 'Enter': // 回车键
                e.preventDefault();
                this.triggerSurprise();
                break;
            case 'Escape': // ESC键
                if (this.isMusicPlaying) {
                    this.toggleMusic();
                }
                break;
        }
    }

    // 页面可见性变化处理
    handleVisibilityChange() {
        if (document.hidden) {
            // 页面隐藏时暂停音乐
            if (this.isMusicPlaying && this.backgroundMusic) {
                this.backgroundMusic.pause();
            }
        } else {
            // 页面显示时恢复音乐
            if (this.isMusicPlaying && this.backgroundMusic) {
                this.backgroundMusic.play().catch(() => {
                    // 忽略播放错误
                });
            }
        }
    }

    // 响应式处理
    handleResize() {
        if (this.roseAnimation) {
            this.roseAnimation.handleResize();
        }
        
        // 重新初始化粒子系统以适应新尺寸
        if (window.pJSDom && window.pJSDom[0]) {
            window.pJSDom[0].pJS.fn.canvasSize();
        }
    }

    // 点击烟花效果
    createClickFirework(x, y) {
        if (window.particleEffects) {
            window.particleEffects.createFirework(x, y);
        }
    }

    // 欢迎动画
    showWelcomeAnimation() {
        const titleSection = document.querySelector('.title-section');
        if (titleSection) {
            titleSection.style.animation = 'welcomeGlow 3s ease-out';
        }
    }

    // 预加载音频
    preloadAudio() {
        if (this.backgroundMusic) {
            this.backgroundMusic.preload = 'auto';
            this.backgroundMusic.volume = 0.6; // 设置音量
        }
    }

    // 获取应用状态
    getAppState() {
        return {
            musicPlaying: this.isMusicPlaying,
            currentMessage: this.messageAnimation ? this.messageAnimation.getCurrentMessage() : null,
            isAnimating: this.roseAnimation ? this.roseAnimation.isAnimating : false
        };
    }
}

// 添加额外的CSS动画
const appStyle = document.createElement('style');
appStyle.textContent = `
    @keyframes surpriseButtonPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); box-shadow: 0 0 20px rgba(255, 107, 107, 0.6); }
        100% { transform: scale(1); }
    }
    
    @keyframes welcomeGlow {
        0% { filter: brightness(1); }
        50% { filter: brightness(1.3) drop-shadow(0 0 20px rgba(255, 255, 255, 0.5)); }
        100% { filter: brightness(1); }
    }
    
    /* 移动端优化 */
    @media (max-width: 768px) {
        .control-btn {
            font-size: 1rem;
            padding: 12px 25px;
        }
        
        .main-title {
            font-size: 2.5rem;
        }
        
        .rose {
            width: 150px;
            height: 150px;
        }
    }
    
    /* 触摸设备优化 */
    @media (hover: none) {
        .control-btn:hover {
            transform: none;
        }
        
        .control-btn:active {
            transform: scale(0.95);
        }
    }
`;
document.head.appendChild(appStyle);

// 初始化应用
let birthdayApp;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        birthdayApp = new BirthdayApp();
    });
} else {
    birthdayApp = new BirthdayApp();
}

// 导出应用实例供调试使用
window.birthdayApp = birthdayApp;
