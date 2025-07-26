// 全新的玫瑰花生日网页主控制脚本
class RoseBirthdayApp {
    constructor() {
        this.isLoaded = false;
        this.isMusicPlaying = false;
        this.currentMessageIndex = 0;
        this.roseTextGenerator = null;
        this.messages = [
            "亲爱的，今天是你的生日 🎂",
            "726朵玫瑰花为你绽放 🌹",
            "每一朵都代表我对你的爱 💝",
            "生日快乐，我的挚爱 ✨",
            "愿你的笑容永远如花般绽放 😊",
            "你是我生命中最美的礼物 💖",
            "愿所有的美好都属于你 🌟",
            "我爱你，永远爱你 🌈"
        ];

        this.init();
    }
    
    init() {
        this.setupElements();
        this.setupEventListeners();
        this.createFallingPetals();
        this.createParticleEffects();
        this.startMessageAnimation();
        this.initRoseTextGenerator();
        this.startLoadingSequence();
    }
    
    setupElements() {
        this.musicBtn = document.getElementById('music-toggle');
        this.surpriseBtn = document.getElementById('surprise-btn');
        this.loveBtn = document.getElementById('love-btn');
        this.messageText = document.getElementById('message-text');
        this.backgroundMusic = document.getElementById('background-music');
        this.roseScene = document.querySelector('.rose-text-container');
        this.effectsLayer = document.querySelector('.effects-layer');
    }
    
    setupEventListeners() {
        // 音乐控制
        this.musicBtn?.addEventListener('click', () => this.toggleMusic());
        
        // 惊喜效果
        this.surpriseBtn?.addEventListener('click', () => this.triggerSurprise());
        
        // 爱心效果
        this.loveBtn?.addEventListener('click', () => this.showLove());
        
        // 玫瑰花场景点击
        this.roseScene?.addEventListener('click', (e) => {
            if (e.target === this.roseScene) {
                this.roseBloom();
            }
        });
        
        // 键盘快捷键
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        // 页面可见性变化
        document.addEventListener('visibilitychange', () => this.handleVisibilityChange());
    }
    
    // 初始化玫瑰花文字生成器
    initRoseTextGenerator() {
        // 等待DOM完全加载后再初始化
        setTimeout(() => {
            if (window.AdvancedRoseGenerator) {
                this.roseTextGenerator = new AdvancedRoseGenerator();
                this.roseTextGenerator.init('rose-text-container').then(success => {
                    if (success) {
                        console.log('🌹 高级玫瑰花生成器初始化成功！');
                    } else {
                        console.error('🌹 高级玫瑰花生成器初始化失败！');
                    }
                });
            } else {
                // 如果类还没加载，稍后重试
                setTimeout(() => this.initRoseTextGenerator(), 500);
            }
        }, 1500);
    }

    // 开始加载序列
    startLoadingSequence() {
        setTimeout(() => {
            document.body.classList.remove('not-loaded');
            this.isLoaded = true;
        }, 1000);
    }
    
    // 创建飘落花瓣
    createFallingPetals() {
        const container = document.querySelector('.falling-petals-bg');
        if (!container) return;
        
        const createPetal = () => {
            const petal = document.createElement('div');
            petal.className = 'falling-petal';
            
            // 随机样式
            const colors = ['#ff1744', '#ff6b9d', '#ffc1cc', '#ffd700'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = 8 + Math.random() * 12;
            const duration = 8 + Math.random() * 10;
            const delay = Math.random() * 5;
            
            petal.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: 50% 0 50% 0;
                left: ${Math.random() * 100}%;
                top: -20px;
                opacity: ${0.6 + Math.random() * 0.4};
                animation: petalFall ${duration}s linear ${delay}s infinite;
                transform: rotate(${Math.random() * 360}deg);
            `;
            
            container.appendChild(petal);
            
            // 清理
            setTimeout(() => {
                if (petal.parentNode) {
                    petal.parentNode.removeChild(petal);
                }
            }, (duration + delay) * 1000);
        };
        
        // 定期创建花瓣
        setInterval(createPetal, 800);
        
        // 初始创建一些花瓣
        for (let i = 0; i < 10; i++) {
            setTimeout(createPetal, i * 200);
        }
    }
    
    // 创建粒子效果
    createParticleEffects() {
        this.createHeartParticles();
        this.createLightParticles();
    }
    
    createHeartParticles() {
        const container = document.querySelector('.heart-particles');
        if (!container) return;
        
        const createHeart = () => {
            const heart = document.createElement('div');
            heart.textContent = ['💖', '💕', '💝', '❤️'][Math.floor(Math.random() * 4)];
            heart.style.cssText = `
                position: absolute;
                font-size: ${16 + Math.random() * 8}px;
                left: ${Math.random() * 100}%;
                top: 100%;
                opacity: 0.8;
                animation: heartFloat ${6 + Math.random() * 4}s ease-out forwards;
                pointer-events: none;
            `;
            
            container.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 10000);
        };
        
        setInterval(createHeart, 3000);
    }
    
    createLightParticles() {
        const container = document.querySelector('.light-particles');
        if (!container) return;
        
        const createLight = () => {
            const light = document.createElement('div');
            light.style.cssText = `
                position: absolute;
                width: ${4 + Math.random() * 6}px;
                height: ${4 + Math.random() * 6}px;
                background: radial-gradient(circle, #ffd700, transparent);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: 0;
                animation: lightTwinkle ${2 + Math.random() * 3}s ease-in-out infinite;
                pointer-events: none;
            `;
            
            container.appendChild(light);
            
            setTimeout(() => {
                if (light.parentNode) {
                    light.parentNode.removeChild(light);
                }
            }, 5000);
        };
        
        setInterval(createLight, 1000);
    }
    
    // 消息动画
    startMessageAnimation() {
        if (!this.messageText) return;
        
        const typeMessage = (message) => {
            this.messageText.textContent = '';
            let index = 0;
            
            const typeInterval = setInterval(() => {
                if (index < message.length) {
                    this.messageText.textContent += message[index];
                    index++;
                } else {
                    clearInterval(typeInterval);
                }
            }, 100);
        };
        
        const nextMessage = () => {
            this.messageText.style.opacity = '0';
            setTimeout(() => {
                typeMessage(this.messages[this.currentMessageIndex]);
                this.messageText.style.opacity = '1';
                this.currentMessageIndex = (this.currentMessageIndex + 1) % this.messages.length;
            }, 500);
        };
        
        // 初始消息
        setTimeout(() => {
            typeMessage(this.messages[0]);
            this.currentMessageIndex = 1;
        }, 2000);
        
        // 定期切换消息
        setInterval(nextMessage, 6000);
    }
    
    // 音乐控制
    async toggleMusic() {
        if (!this.backgroundMusic) return;
        
        try {
            if (this.isMusicPlaying) {
                this.backgroundMusic.pause();
                this.isMusicPlaying = false;
                this.updateMusicButton('🎵', '音乐');
            } else {
                await this.backgroundMusic.play();
                this.isMusicPlaying = true;
                this.updateMusicButton('🔇', '暂停');
            }
            
            this.playClickSound();
        } catch (error) {
            console.log('音频播放失败:', error);
            this.showMessage('请点击页面后再尝试播放音乐 🎵');
        }
    }
    
    updateMusicButton(icon, text) {
        if (this.musicBtn) {
            this.musicBtn.querySelector('.btn-icon').textContent = icon;
            this.musicBtn.querySelector('.btn-label').textContent = text;
        }
    }
    
    // 惊喜效果
    triggerSurprise() {
        this.createFireworks();
        this.roseBloom();
        this.showMessage('🎉 惊喜！你是我心中永远的女王！ 👑');
        this.playClickSound();
        
        // 增强花瓣效果
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                this.createSpecialPetal();
            }, i * 100);
        }
    }
    
    // 爱心效果
    showLove() {
        this.createHeartExplosion();
        this.showMessage('💖 我爱你，永远爱你！ 💖');
        this.playClickSound();
    }
    
    // 玫瑰花绽放
    roseBloom() {
        if (!this.roseScene) return;
        
        this.roseScene.style.animation = 'roseBloom 2s ease-out';
        
        setTimeout(() => {
            this.roseScene.style.animation = '';
        }, 2000);
        
        this.playClickSound();
    }
    
    // 创建烟花
    createFireworks() {
        const container = document.querySelector('.fireworks');
        if (!container) return;
        
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const firework = document.createElement('div');
                firework.style.cssText = `
                    position: absolute;
                    left: ${20 + Math.random() * 60}%;
                    top: ${20 + Math.random() * 60}%;
                    width: 4px;
                    height: 4px;
                    background: #ffd700;
                    border-radius: 50%;
                    animation: fireworkExplode 2s ease-out forwards;
                    pointer-events: none;
                `;
                
                container.appendChild(firework);
                
                setTimeout(() => {
                    if (firework.parentNode) {
                        firework.parentNode.removeChild(firework);
                    }
                }, 2000);
            }, i * 300);
        }
    }
    
    // 创建爱心爆炸
    createHeartExplosion() {
        const container = this.effectsLayer;
        if (!container) return;
        
        for (let i = 0; i < 15; i++) {
            const heart = document.createElement('div');
            heart.textContent = '💖';
            heart.style.cssText = `
                position: absolute;
                left: 50%;
                top: 50%;
                font-size: 24px;
                animation: heartExplode 3s ease-out forwards;
                animation-delay: ${i * 0.1}s;
                pointer-events: none;
                transform: translate(-50%, -50%) rotate(${i * 24}deg);
            `;
            
            container.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 3000);
        }
    }
    
    // 创建特殊花瓣
    createSpecialPetal() {
        const container = document.querySelector('.falling-petals-bg');
        if (!container) return;
        
        const petal = document.createElement('div');
        petal.style.cssText = `
            position: absolute;
            width: 20px;
            height: 20px;
            background: linear-gradient(45deg, #ff1744, #ffd700);
            border-radius: 50% 0 50% 0;
            left: ${Math.random() * 100}%;
            top: -20px;
            opacity: 0.9;
            animation: specialPetalFall 6s ease-out forwards;
            box-shadow: 0 0 10px #ff1744;
        `;
        
        container.appendChild(petal);
        
        setTimeout(() => {
            if (petal.parentNode) {
                petal.parentNode.removeChild(petal);
            }
        }, 6000);
    }
    
    // 显示临时消息
    showMessage(message) {
        if (!this.messageText) return;
        
        const originalMessage = this.messageText.textContent;
        this.messageText.style.opacity = '0';
        
        setTimeout(() => {
            this.messageText.textContent = message;
            this.messageText.style.opacity = '1';
            
            setTimeout(() => {
                this.messageText.style.opacity = '0';
                setTimeout(() => {
                    this.messageText.textContent = originalMessage;
                    this.messageText.style.opacity = '1';
                }, 500);
            }, 3000);
        }, 500);
    }
    
    // 播放点击音效
    playClickSound() {
        // 使用Web Audio API创建简单音效
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (error) {
            // 忽略音效错误
        }
    }
    
    // 键盘事件处理
    handleKeyPress(e) {
        switch(e.key) {
            case ' ':
                e.preventDefault();
                this.toggleMusic();
                break;
            case 'Enter':
                e.preventDefault();
                this.triggerSurprise();
                break;
            case 'l':
            case 'L':
                this.showLove();
                break;
        }
    }
    
    // 页面可见性变化
    handleVisibilityChange() {
        if (document.hidden && this.isMusicPlaying) {
            this.backgroundMusic?.pause();
        } else if (!document.hidden && this.isMusicPlaying) {
            this.backgroundMusic?.play().catch(() => {});
        }
    }
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes petalFall {
        0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
    
    @keyframes heartFloat {
        0% {
            transform: translateY(0) scale(1);
            opacity: 0.8;
        }
        100% {
            transform: translateY(-100vh) scale(1.5);
            opacity: 0;
        }
    }
    
    @keyframes lightTwinkle {
        0%, 100% { opacity: 0; }
        50% { opacity: 1; }
    }
    
    @keyframes roseBloom {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1.1); }
    }
    
    @keyframes fireworkExplode {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(20);
            opacity: 0;
        }
    }
    
    @keyframes heartExplode {
        0% {
            transform: translate(-50%, -50%) rotate(var(--rotation, 0deg)) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) rotate(var(--rotation, 0deg)) translateY(-200px) scale(2);
            opacity: 0;
        }
    }
    
    @keyframes specialPetalFall {
        0% {
            transform: translateY(-20px) rotate(0deg) scale(1);
            opacity: 0.9;
        }
        50% {
            opacity: 1;
            transform: translateY(50vh) rotate(360deg) scale(1.2);
        }
        100% {
            transform: translateY(100vh) rotate(720deg) scale(0.8);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    window.roseBirthdayApp = new RoseBirthdayApp();
});

// 如果DOM已经加载完成
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.roseBirthdayApp = new RoseBirthdayApp();
    });
} else {
    window.roseBirthdayApp = new RoseBirthdayApp();
}
