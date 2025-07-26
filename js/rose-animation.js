// 玫瑰花动画控制
class RoseAnimation {
    constructor() {
        this.rose = document.querySelector('.rose');
        this.roseContainer = document.querySelector('.rose-container');
        this.petals = document.querySelectorAll('.petal');
        this.center = document.querySelector('.rose-center');
        this.isAnimating = false;
        this.init();
    }

    init() {
        this.setupClickHandler();
        this.setupHoverEffects();
        this.startIdleAnimation();
    }

    // 设置点击处理
    setupClickHandler() {
        if (this.roseContainer) {
            this.roseContainer.addEventListener('click', (e) => {
                e.preventDefault();
                this.triggerBloomAnimation();
                // 播放绽放音效
                if (window.birthdayApp && window.birthdayApp.audioManager) {
                    window.birthdayApp.audioManager.playSound('bloom');
                }
            });
        }
    }

    // 设置悬停效果
    setupHoverEffects() {
        if (this.roseContainer) {
            this.roseContainer.addEventListener('mouseenter', () => {
                this.addSparkleEffect();
                // 播放闪烁音效
                if (window.birthdayApp && window.birthdayApp.audioManager) {
                    window.birthdayApp.audioManager.playSound('sparkle');
                }
            });

            this.roseContainer.addEventListener('mouseleave', () => {
                this.removeSparkleEffect();
            });
        }
    }

    // 绽放动画
    triggerBloomAnimation() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        
        // 添加绽放效果
        this.rose.classList.add('rose-bloom');
        
        // 花瓣特效
        this.petals.forEach((petal, index) => {
            setTimeout(() => {
                petal.style.transform += ' scale(1.2)';
                petal.style.filter = 'brightness(1.3) saturate(1.2)';
            }, index * 100);
        });

        // 创建花瓣飘落效果
        this.createFallingPetals();
        
        // 重置动画
        setTimeout(() => {
            this.rose.classList.remove('rose-bloom');
            this.petals.forEach(petal => {
                petal.style.transform = petal.style.transform.replace(' scale(1.2)', '');
                petal.style.filter = '';
            });
            this.isAnimating = false;
        }, 2000);
    }

    // 添加闪烁效果
    addSparkleEffect() {
        this.rose.classList.add('rose-sparkle');
    }

    // 移除闪烁效果
    removeSparkleEffect() {
        this.rose.classList.remove('rose-sparkle');
    }

    // 创建飘落花瓣
    createFallingPetals() {
        const container = document.querySelector('.falling-petals');
        if (!container) return;

        const petalCount = 20;
        const roseRect = this.roseContainer.getBoundingClientRect();
        const centerX = roseRect.left + roseRect.width / 2;
        const centerY = roseRect.top + roseRect.height / 2;

        for (let i = 0; i < petalCount; i++) {
            setTimeout(() => {
                this.createSingleFallingPetal(centerX, centerY);
            }, i * 100);
        }
    }

    // 创建单个飘落花瓣
    createSingleFallingPetal(startX, startY) {
        const petal = document.createElement('div');
        petal.className = 'falling-petal';
        
        // 随机颜色
        const colors = [
            'linear-gradient(45deg, #ff6b6b, #ff8e8e)',
            'linear-gradient(45deg, #ff1744, #ff6b6b)',
            'linear-gradient(45deg, #feca57, #ff9ff3)',
            'linear-gradient(45deg, #48dbfb, #ff6b6b)'
        ];
        petal.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        // 设置初始位置
        petal.style.left = startX + (Math.random() - 0.5) * 100 + 'px';
        petal.style.top = startY + 'px';
        
        // 随机大小
        const size = 15 + Math.random() * 10;
        petal.style.width = size + 'px';
        petal.style.height = size + 'px';
        
        // 随机动画时长
        const duration = 3 + Math.random() * 4;
        petal.style.animationDuration = duration + 's';
        
        // 随机水平漂移
        const drift = (Math.random() - 0.5) * 200;
        petal.style.setProperty('--drift', drift + 'px');
        
        document.querySelector('.falling-petals').appendChild(petal);
        
        // 移除花瓣
        setTimeout(() => {
            if (petal.parentNode) {
                petal.parentNode.removeChild(petal);
            }
        }, duration * 1000);
    }

    // 空闲动画
    startIdleAnimation() {
        setInterval(() => {
            if (!this.isAnimating) {
                this.addSubtleGlow();
            }
        }, 5000);
    }

    // 添加微妙光晕
    addSubtleGlow() {
        if (this.center) {
            this.center.style.boxShadow = '0 0 30px rgba(142, 36, 170, 0.8), inset 0 0 15px rgba(255, 255, 255, 0.4)';
            
            setTimeout(() => {
                this.center.style.boxShadow = '0 0 20px rgba(142, 36, 170, 0.6), inset 0 0 10px rgba(255, 255, 255, 0.3)';
            }, 1000);
        }
    }

    // 特殊惊喜动画
    triggerSurpriseAnimation() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        
        // 强烈的绽放效果
        this.rose.style.animation = 'roseBloom 1s ease-out, roseSparkle 2s ease-out';
        
        // 所有花瓣同时特效
        this.petals.forEach(petal => {
            petal.style.animation = 'petalFloat1 1s ease-out, roseSparkle 2s ease-out';
        });
        
        // 创建大量花瓣
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const roseRect = this.roseContainer.getBoundingClientRect();
                const centerX = roseRect.left + roseRect.width / 2;
                const centerY = roseRect.top + roseRect.height / 2;
                this.createSingleFallingPetal(centerX, centerY);
            }, i * 50);
        }
        
        // 重置
        setTimeout(() => {
            this.rose.style.animation = '';
            this.petals.forEach(petal => {
                petal.style.animation = '';
            });
            this.isAnimating = false;
        }, 3000);
    }

    // 响应式调整
    handleResize() {
        // 根据屏幕大小调整动画参数
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // 移动端优化
            this.petals.forEach(petal => {
                petal.style.animationDuration = '6s'; // 稍慢的动画
            });
        } else {
            // 桌面端恢复正常
            this.petals.forEach(petal => {
                petal.style.animationDuration = '4s';
            });
        }
    }
}

// 更新飘落花瓣的CSS动画
const style = document.createElement('style');
style.textContent = `
    .falling-petal {
        animation: fallWithDrift linear forwards;
    }
    
    @keyframes fallWithDrift {
        0% {
            transform: translateY(0) rotate(0deg) translateX(0);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg) translateX(var(--drift, 0px));
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// 导出玫瑰花动画类
window.RoseAnimation = RoseAnimation;
