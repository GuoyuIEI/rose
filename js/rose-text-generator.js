// 726朵玫瑰花组成"生日快乐"文字生成器
class RoseTextGenerator {
    constructor() {
        this.container = null;
        this.roseCount = 0;
        this.targetRoseCount = 726;
        this.roseCounter = null;
        this.textPaths = this.generateTextPaths();
        this.roses = [];
    }
    
    init(containerId) {
        this.container = document.getElementById(containerId);
        this.roseCounter = document.getElementById('rose-count');

        if (!this.container) {
            console.error('容器未找到:', containerId);
            return;
        }

        console.log('玫瑰花文字生成器初始化成功');
        console.log('容器:', this.container);

        // 确保容器有足够的尺寸
        if (this.container.offsetWidth === 0) {
            this.container.style.width = '800px';
            this.container.style.height = '400px';
        }

        // 延迟一点时间确保DOM完全准备好
        setTimeout(() => {
            this.generateRoses();
        }, 100);
    }
    
    // 生成"生日快乐"四个字的路径点
    generateTextPaths() {
        const paths = {
            生: this.generateCharPath('生'),
            日: this.generateCharPath('日'),
            快: this.generateCharPath('快'),
            乐: this.generateCharPath('乐')
        };
        
        return paths;
    }
    
    // 生成单个字符的路径点
    generateCharPath(char) {
        const points = [];
        const charWidth = 120;
        const charHeight = 160;
        
        switch(char) {
            case '生':
                // "生"字的笔画路径
                points.push(...this.generateStroke(10, 20, 110, 20, 15)); // 横
                points.push(...this.generateStroke(60, 10, 60, 150, 20)); // 竖
                points.push(...this.generateStroke(10, 60, 110, 60, 15)); // 横
                points.push(...this.generateStroke(30, 80, 90, 80, 10)); // 横
                points.push(...this.generateStroke(20, 100, 100, 100, 12)); // 横
                points.push(...this.generateStroke(40, 120, 80, 120, 8)); // 横
                points.push(...this.generateStroke(30, 140, 90, 140, 10)); // 横
                break;
                
            case '日':
                // "日"字的笔画路径
                points.push(...this.generateStroke(30, 20, 90, 20, 12)); // 上横
                points.push(...this.generateStroke(30, 20, 30, 140, 18)); // 左竖
                points.push(...this.generateStroke(90, 20, 90, 140, 18)); // 右竖
                points.push(...this.generateStroke(30, 80, 90, 80, 12)); // 中横
                points.push(...this.generateStroke(30, 140, 90, 140, 12)); // 下横
                break;
                
            case '快':
                // "快"字的笔画路径
                points.push(...this.generateStroke(20, 30, 20, 130, 15)); // 左竖
                points.push(...this.generateStroke(15, 50, 50, 50, 8)); // 左横
                points.push(...this.generateStroke(15, 80, 50, 80, 8)); // 左横
                points.push(...this.generateStroke(15, 110, 50, 110, 8)); // 左横
                points.push(...this.generateStroke(70, 20, 70, 140, 18)); // 右竖
                points.push(...this.generateStroke(60, 40, 100, 40, 10)); // 右上横
                points.push(...this.generateStroke(60, 70, 100, 70, 10)); // 右中横
                points.push(...this.generateStroke(60, 100, 100, 100, 10)); // 右下横
                points.push(...this.generateStroke(85, 50, 85, 90, 8)); // 右中竖
                break;
                
            case '乐':
                // "乐"字的笔画路径
                points.push(...this.generateStroke(30, 30, 90, 30, 12)); // 上横
                points.push(...this.generateStroke(60, 20, 60, 50, 8)); // 上竖
                points.push(...this.generateStroke(40, 60, 80, 60, 10)); // 中横
                points.push(...this.generateStroke(30, 90, 90, 90, 12)); // 下横
                points.push(...this.generateStroke(25, 110, 95, 110, 14)); // 底横
                points.push(...this.generateStroke(45, 70, 45, 120, 10)); // 左下竖
                points.push(...this.generateStroke(75, 70, 75, 120, 10)); // 右下竖
                points.push(...this.generateStroke(60, 130, 60, 150, 8)); // 最下竖
                break;
        }
        
        return points;
    }
    
    // 生成笔画路径点
    generateStroke(x1, y1, x2, y2, pointCount) {
        const points = [];
        const dx = (x2 - x1) / (pointCount - 1);
        const dy = (y2 - y1) / (pointCount - 1);
        
        for (let i = 0; i < pointCount; i++) {
            points.push({
                x: x1 + dx * i + (Math.random() - 0.5) * 2, // 添加轻微随机偏移
                y: y1 + dy * i + (Math.random() - 0.5) * 2
            });
        }
        
        return points;
    }
    
    // 生成所有玫瑰花
    generateRoses() {
        const containerWidth = this.container.offsetWidth || 800;
        const containerHeight = this.container.offsetHeight || 400;

        console.log('容器尺寸:', containerWidth, 'x', containerHeight);

        // 计算每个字符的位置
        const charPositions = [
            { char: '生', x: containerWidth * 0.15, y: containerHeight * 0.3 },
            { char: '日', x: containerWidth * 0.35, y: containerHeight * 0.3 },
            { char: '快', x: containerWidth * 0.55, y: containerHeight * 0.3 },
            { char: '乐', x: containerWidth * 0.75, y: containerHeight * 0.3 }
        ];

        let totalRoses = 0;
        let animationDelay = 0;

        // 为每个字符生成玫瑰花
        charPositions.forEach((charPos, charIndex) => {
            const charPath = this.textPaths[charPos.char];
            console.log(`生成字符 "${charPos.char}" 的玫瑰花，共 ${charPath.length} 朵`);

            charPath.forEach((point, pointIndex) => {
                if (totalRoses >= this.targetRoseCount) return;

                const rose = this.createRose(
                    charPos.x + point.x,
                    charPos.y + point.y,
                    totalRoses,
                    charIndex
                );

                this.container.appendChild(rose);
                this.roses.push(rose);
                totalRoses++;

                // 动画延迟
                setTimeout(() => {
                    rose.style.opacity = '1';
                    this.updateRoseCounter(totalRoses);
                }, animationDelay);

                animationDelay += 30; // 每朵花间隔30ms
            });
        });

        // 如果还没达到726朵，补充一些装饰性玫瑰花
        while (totalRoses < this.targetRoseCount) {
            const rose = this.createDecorativeRose(containerWidth, containerHeight, totalRoses);
            this.container.appendChild(rose);
            this.roses.push(rose);
            totalRoses++;

            setTimeout(() => {
                rose.style.opacity = '1';
                this.updateRoseCounter(totalRoses);
            }, animationDelay);

            animationDelay += 20;
        }

        console.log(`总共生成了 ${totalRoses} 朵玫瑰花`);
    }
    
    // 创建单朵玫瑰花
    createRose(x, y, index, charIndex) {
        const rose = document.createElement('div');
        rose.className = 'mini-rose';
        rose.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 8px;
            height: 8px;
            opacity: 0;
            cursor: pointer;
            transition: all 0.3s ease;
            animation: roseAppear 0.5s ease-out forwards;
            animation-delay: ${index * 0.02}s;
        `;

        // 创建花朵
        const flower = document.createElement('div');
        flower.className = 'rose-flower';
        flower.style.cssText = `
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at 30% 30%, #ff6b9d, #ff1744, #d50000);
            border-radius: 50%;
            position: relative;
            box-shadow: 0 0 4px rgba(255, 23, 68, 0.6), inset 0 0 2px rgba(255, 255, 255, 0.3);
            animation: roseGlow 3s ease-in-out infinite alternate;
        `;

        // 创建花茎
        const stem = document.createElement('div');
        stem.className = 'rose-stem-mini';
        stem.style.cssText = `
            position: absolute;
            bottom: -2px;
            left: 50%;
            width: 1px;
            height: 4px;
            background: linear-gradient(to bottom, #4caf50, #2e7d32);
            transform: translateX(-50%);
        `;

        rose.appendChild(flower);
        rose.appendChild(stem);

        // 添加点击事件
        rose.addEventListener('click', () => this.onRoseClick(rose, index));

        // 添加鼠标悬停事件
        rose.addEventListener('mouseenter', () => this.onRoseHover(rose));
        rose.addEventListener('mouseleave', () => this.onRoseLeave(rose));

        // 特殊玫瑰花（每50朵一个特殊的）
        if (index % 50 === 0) {
            rose.classList.add('special-rose');
            flower.style.background = 'radial-gradient(circle at 30% 30%, #ffd700, #ff6b9d, #ff1744)';
            flower.style.boxShadow = '0 0 8px rgba(255, 215, 0, 0.8), 0 0 16px rgba(255, 23, 68, 0.6)';
        }

        return rose;
    }
    
    // 创建装饰性玫瑰花
    createDecorativeRose(containerWidth, containerHeight, index) {
        const x = Math.random() * containerWidth;
        const y = Math.random() * containerHeight;
        
        const rose = this.createRose(x, y, index, -1);
        rose.classList.add('decorative-rose');
        rose.style.opacity = '0.6';
        
        return rose;
    }
    
    // 玫瑰花点击事件
    onRoseClick(rose, index) {
        // 创建爱心特效
        this.createHeartEffect(rose);
        
        // 播放音效
        this.playClickSound();
        
        // 临时放大效果
        rose.style.transform = 'scale(3)';
        rose.style.zIndex = '1000';
        
        setTimeout(() => {
            rose.style.transform = '';
            rose.style.zIndex = '';
        }, 1000);
    }
    
    // 玫瑰花悬停事件
    onRoseHover(rose) {
        rose.style.transform = 'scale(1.5)';
        rose.style.zIndex = '100';
    }
    
    onRoseLeave(rose) {
        rose.style.transform = '';
        rose.style.zIndex = '';
    }
    
    // 创建爱心特效
    createHeartEffect(rose) {
        const heart = document.createElement('div');
        heart.textContent = '💖';
        heart.style.cssText = `
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            font-size: 16px;
            pointer-events: none;
            animation: heartFloat 2s ease-out forwards;
            z-index: 1001;
        `;
        
        rose.appendChild(heart);
        
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 2000);
    }
    
    // 更新玫瑰花计数器
    updateRoseCounter(count) {
        if (this.roseCounter) {
            this.roseCounter.textContent = count;
            
            // 达到726朵时的特殊效果
            if (count === this.targetRoseCount) {
                this.onAllRosesGenerated();
            }
        }
    }
    
    // 所有玫瑰花生成完成后的效果
    onAllRosesGenerated() {
        // 显示完成消息
        this.showCompletionMessage();
        
        // 播放庆祝音效
        this.playCelebrationSound();
        
        // 启动特殊动画
        this.startCelebrationAnimation();
    }
    
    // 显示完成消息
    showCompletionMessage() {
        const message = document.createElement('div');
        message.style.cssText = `
            position: absolute;
            top: -60px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(45deg, #ff1744, #ffd700);
            color: white;
            padding: 10px 20px;
            border-radius: 25px;
            font-weight: bold;
            font-size: 14px;
            box-shadow: 0 4px 15px rgba(255, 23, 68, 0.4);
            animation: messageAppear 2s ease-out forwards;
            z-index: 1000;
        `;
        message.textContent = '🌹 726朵玫瑰花为你绽放！ 🌹';
        
        this.container.appendChild(message);
        
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 5000);
    }
    
    // 启动庆祝动画
    startCelebrationAnimation() {
        // 让所有玫瑰花闪烁
        this.roses.forEach((rose, index) => {
            setTimeout(() => {
                rose.style.animation += ', roseFlash 0.5s ease-in-out';
            }, index * 5);
        });
    }
    
    // 播放点击音效
    playClickSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (error) {
            // 忽略音效错误
        }
    }
    
    // 播放庆祝音效
    playCelebrationSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // 播放一系列音符
            const notes = [523.25, 659.25, 783.99, 1046.50]; // C, E, G, C
            
            notes.forEach((freq, index) => {
                setTimeout(() => {
                    const oscillator = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    
                    oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
                    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                    
                    oscillator.start(audioContext.currentTime);
                    oscillator.stop(audioContext.currentTime + 0.3);
                }, index * 200);
            });
        } catch (error) {
            // 忽略音效错误
        }
    }
    
    // 获取玫瑰花总数
    getRoseCount() {
        return this.roses.length;
    }
    
    // 重新生成玫瑰花
    regenerateRoses() {
        // 清除现有玫瑰花
        this.roses.forEach(rose => {
            if (rose.parentNode) {
                rose.parentNode.removeChild(rose);
            }
        });
        
        this.roses = [];
        this.roseCount = 0;
        
        // 重新生成
        this.generateRoses();
    }
}

// 添加相关CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes roseAppear {
        0% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
        }
        100% {
            opacity: 1;
            transform: scale(1) rotate(360deg);
        }
    }
    
    @keyframes roseGlow {
        0%, 100% {
            box-shadow: 0 0 4px rgba(255, 23, 68, 0.6), inset 0 0 2px rgba(255, 255, 255, 0.3);
        }
        50% {
            box-shadow: 0 0 8px rgba(255, 23, 68, 0.9), inset 0 0 4px rgba(255, 255, 255, 0.5);
        }
    }
    
    @keyframes roseHalo {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 0.8; }
    }
    
    @keyframes specialRoseGlow {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.2);
        }
    }
    
    @keyframes roseFlash {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.3; }
    }
    
    @keyframes messageAppear {
        0% {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        100% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
`;
document.head.appendChild(style);

// 导出类
window.RoseTextGenerator = RoseTextGenerator;
