class BirthdayTextRoses {
    constructor() {
        this.roseCount = 0;
        this.totalRoses = 726;
        this.rosePositions = [];
        this.isAnimating = false;
        this.init();
    }

    init() {
        this.generateTextPositions();
        this.bindEvents();
    }

    bindEvents() {
        const surpriseBtn = document.getElementById('center-surprise-btn');
        if (surpriseBtn) {
            surpriseBtn.addEventListener('click', () => {
                this.startBirthdayAnimation();
            });
        }
    }

    // 生成"生日快乐"文字的玫瑰花位置
    generateTextPositions() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 1600;
        canvas.height = 600;

        // 设置更大的字体
        ctx.font = 'bold 200px "Noto Sans SC", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // 绘制文字
        ctx.fillStyle = '#000';
        ctx.fillText('生日快乐', canvas.width / 2, canvas.height / 2);
        
        // 获取像素数据
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // 提取文字轮廓点
        const positions = [];
        const step = 2; // 更小的采样步长，让玫瑰花更密集
        
        for (let y = 0; y < canvas.height; y += step) {
            for (let x = 0; x < canvas.width; x += step) {
                const index = (y * canvas.width + x) * 4;
                const alpha = data[index + 3];
                
                if (alpha > 128) { // 如果像素不透明
                    positions.push({
                        x: x - canvas.width / 2,
                        y: y - canvas.height / 2
                    });
                }
            }
        }
        
        // 随机选择726个位置
        this.rosePositions = this.selectRandomPositions(positions, this.totalRoses);
    }

    selectRandomPositions(positions, count) {
        const shuffled = [...positions].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, count);
    }

    async startBirthdayAnimation() {
        if (this.isAnimating) return;
        this.isAnimating = true;

        // 隐藏惊喜按钮
        const surpriseBtn = document.getElementById('center-surprise-btn');
        if (surpriseBtn) {
            surpriseBtn.style.transform = 'translate(-50%, -50%) scale(0)';
            surpriseBtn.style.opacity = '0';
            setTimeout(() => {
                surpriseBtn.style.display = 'none';
            }, 500);
        }

        // 显示玫瑰花场景
        const roseScene = document.getElementById('rose-scene');
        if (roseScene) {
            roseScene.style.display = 'block';
            setTimeout(() => {
                roseScene.style.opacity = '1';
            }, 100);
        }

        // 开始生成玫瑰花
        await this.generateRoses();
    }

    async generateRoses() {
        const container = document.getElementById('rose-text-container');
        if (!container) return;

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        // 分批生成玫瑰花，创造动态效果
        const batchSize = 10;
        const batches = Math.ceil(this.totalRoses / batchSize);
        
        for (let batch = 0; batch < batches; batch++) {
            const startIndex = batch * batchSize;
            const endIndex = Math.min(startIndex + batchSize, this.totalRoses);
            
            // 并行生成一批玫瑰花
            const promises = [];
            for (let i = startIndex; i < endIndex; i++) {
                promises.push(this.createSingleRose(i, centerX, centerY));
            }
            
            await Promise.all(promises);
            
            // 短暂延迟，创造波浪效果
            await this.delay(50);
        }

        // 所有玫瑰花生成完成后的特效
        this.showCompletionEffect();
    }

    async createSingleRose(index, centerX, centerY) {
        const position = this.rosePositions[index];
        if (!position) return;

        const rose = document.createElement('div');
        rose.className = 'birthday-rose';
        
        // 计算最终位置
        const finalX = centerX + position.x * 1.8; // 调整缩放因子，让文字更适合屏幕
        const finalY = centerY + position.y * 1.8;
        
        // 随机起始位置（从屏幕边缘飞入）
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        
        rose.style.cssText = `
            position: fixed;
            left: ${startX}px;
            top: ${startY}px;
            width: 12px;
            height: 12px;
            background: radial-gradient(circle, #ff1744, #c2185b, #ff6b9d);
            border-radius: 50%;
            z-index: 100;
            transition: all 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            box-shadow:
                0 0 15px rgba(255, 23, 68, 0.9),
                0 0 25px rgba(255, 107, 157, 0.6);
            opacity: 0;
        `;

        document.body.appendChild(rose);

        // 触发动画
        setTimeout(() => {
            rose.style.left = finalX + 'px';
            rose.style.top = finalY + 'px';
            rose.style.opacity = '1';
            rose.style.transform = 'scale(2)';
        }, 50);

        // 更新计数器
        this.roseCount++;

        // 添加闪烁效果
        setTimeout(() => {
            rose.style.animation = 'roseSparkle 2s ease-in-out infinite';
        }, 2000);
    }



    showCompletionEffect() {
        // 创建完成特效
        const effect = document.createElement('div');
        effect.className = 'completion-effect';
        effect.innerHTML = '🎉 生日快乐！🎉';
        effect.style.cssText = `
            position: fixed;
            top: 20%;
            left: 50%;
            transform: translateX(-50%);
            font-size: 48px;
            font-weight: bold;
            color: #ff1744;
            text-shadow: 0 0 20px rgba(255, 23, 68, 0.8);
            z-index: 1000;
            animation: completionBounce 3s ease-in-out;
            pointer-events: none;
        `;
        
        document.body.appendChild(effect);
        
        // 3秒后移除特效
        setTimeout(() => {
            if (effect.parentNode) {
                effect.parentNode.removeChild(effect);
            }
        }, 3000);

        // 触发烟花效果
        this.triggerFireworks();
    }

    triggerFireworks() {
        // 创建多个烟花
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.createFirework();
            }, i * 500);
        }
    }

    createFirework() {
        const firework = document.createElement('div');
        firework.className = 'firework';
        
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * (window.innerHeight * 0.6) + window.innerHeight * 0.2;
        
        firework.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 4px;
            height: 4px;
            background: #fff;
            border-radius: 50%;
            z-index: 999;
            animation: fireworkExplode 1s ease-out forwards;
        `;
        
        document.body.appendChild(firework);
        
        setTimeout(() => {
            if (firework.parentNode) {
                firework.parentNode.removeChild(firework);
            }
        }, 1000);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    // 移除加载状态类，启用动画
    document.body.classList.remove('not-loaded');

    // 确保主要内容可见
    setTimeout(() => {
        const surpriseContainer = document.querySelector('.center-surprise-container');

        if (surpriseContainer) {
            surpriseContainer.style.opacity = '1';
        }
    }, 100);

    // 初始化生日玫瑰花文字
    new BirthdayTextRoses();
});
