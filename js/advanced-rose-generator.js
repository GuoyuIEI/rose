// 高级726朵玫瑰花"生日快乐"文字生成器
class AdvancedRoseGenerator {
    constructor() {
        this.container = null;
        this.scene3D = null;
        this.particleContainer = null;
        this.audioContext = null;
        this.roseCount = 0;
        this.targetRoseCount = 726;
        this.roses = [];
        this.particleSystem = {
            hearts: [],
            sparkles: [],
            petals: [],
            lights: []
        };
        this.isGenerating = false;
        this.completionEffects = [];
        
        // 高级配置
        this.config = {
            roseSize: { min: 6, max: 12 },
            animationSpeed: { min: 0.5, max: 2.0 },
            glowIntensity: { min: 0.3, max: 1.0 },
            particleDensity: 0.8,
            soundEnabled: true,
            dEffects: true,
            interactiveMode: true
        };
        
        this.textPaths = this.generateAdvancedTextPaths();
    }
    
    async init(containerId) {
        this.container = document.getElementById(containerId);
        this.roseCounter = document.getElementById('rose-count');
        
        if (!this.container) {
            console.error('🌹 容器未找到:', containerId);
            return false;
        }
        
        console.log('🌹 初始化高级玫瑰花生成器...');
        
        // 设置3D场景
        await this.setup3DScene();
        
        // 初始化音频系统
        await this.initAdvancedAudioSystem();
        
        // 创建粒子系统
        this.initAdvancedParticleSystem();
        
        // 设置交互系统
        this.setupInteractionSystem();

        // 开始生成玫瑰花
        setTimeout(() => {
            this.startRoseGeneration();
        }, 1000);
        
        return true;
    }
    
    async setup3DScene() {
        // 设置容器
        this.container.style.cssText += `
            position: relative;
            width: 100%;
            min-height: 600px;
            perspective: 2000px;
            transform-style: preserve-3d;
            overflow: visible;
            background: radial-gradient(ellipse at center, rgba(25, 25, 112, 0.3) 0%, transparent 70%);
        `;
        
        // 创建3D场景
        this.scene3D = document.createElement('div');
        this.scene3D.className = 'advanced-3d-scene';
        this.scene3D.style.cssText = `
            position: absolute;
            width: 100%;
            height: 100%;
            transform-style: preserve-3d;
            animation: scene3DFloat 20s ease-in-out infinite;
        `;
        this.container.appendChild(this.scene3D);
        
        // 创建多层光照效果
        this.createAdvancedLighting();
        
        // 创建环境效果
        this.createEnvironmentEffects();
    }
    
    createAdvancedLighting() {
        // 主聚光灯
        const spotlight = document.createElement('div');
        spotlight.className = 'spotlight';
        spotlight.style.cssText = `
            position: absolute;
            top: -150px;
            left: 50%;
            width: 300px;
            height: 300px;
            background: conic-gradient(from 0deg, 
                rgba(255, 255, 255, 0.4) 0deg,
                rgba(255, 182, 193, 0.3) 90deg,
                rgba(255, 105, 180, 0.2) 180deg,
                rgba(255, 20, 147, 0.3) 270deg,
                rgba(255, 255, 255, 0.4) 360deg);
            border-radius: 50%;
            transform: translateX(-50%);
            animation: spotlightRotate 15s linear infinite, spotlightPulse 4s ease-in-out infinite;
            filter: blur(2px);
        `;
        this.scene3D.appendChild(spotlight);
        
        // 彩色环境光
        const colorLights = [
            { color: 'rgba(255, 20, 147, 0.2)', position: '20% 30%' },
            { color: 'rgba(255, 105, 180, 0.2)', position: '80% 30%' },
            { color: 'rgba(255, 182, 193, 0.2)', position: '50% 70%' },
            { color: 'rgba(255, 215, 0, 0.1)', position: '30% 60%' },
            { color: 'rgba(138, 43, 226, 0.1)', position: '70% 60%' }
        ];
        
        colorLights.forEach((light, index) => {
            const lightElement = document.createElement('div');
            lightElement.className = `color-light-${index}`;
            lightElement.style.cssText = `
                position: absolute;
                width: 200px;
                height: 200px;
                background: radial-gradient(circle, ${light.color} 0%, transparent 70%);
                border-radius: 50%;
                left: ${light.position.split(' ')[0]};
                top: ${light.position.split(' ')[1]};
                transform: translate(-50%, -50%);
                animation: colorLightFloat ${8 + index * 2}s ease-in-out infinite alternate;
                filter: blur(1px);
            `;
            this.scene3D.appendChild(lightElement);
        });
    }
    
    createEnvironmentEffects() {
        // 创建星尘效果
        for (let i = 0; i < 50; i++) {
            const stardust = document.createElement('div');
            stardust.className = 'stardust';
            stardust.style.cssText = `
                position: absolute;
                width: ${2 + Math.random() * 4}px;
                height: ${2 + Math.random() * 4}px;
                background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, transparent 70%);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: stardustTwinkle ${2 + Math.random() * 4}s ease-in-out infinite,
                          stardustFloat ${10 + Math.random() * 10}s linear infinite;
                pointer-events: none;
            `;
            this.scene3D.appendChild(stardust);
        }
        
        // 创建魔法圆环
        const magicCircle = document.createElement('div');
        magicCircle.className = 'magic-circle';
        magicCircle.style.cssText = `
            position: absolute;
            bottom: -50px;
            left: 50%;
            width: 400px;
            height: 400px;
            border: 2px solid rgba(255, 215, 0, 0.3);
            border-radius: 50%;
            transform: translateX(-50%);
            animation: magicCircleRotate 30s linear infinite;
        `;
        
        // 添加魔法符文
        for (let i = 0; i < 8; i++) {
            const rune = document.createElement('div');
            rune.textContent = ['✦', '✧', '✩', '✪', '✫', '✬', '✭', '✮'][i];
            rune.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                font-size: 16px;
                color: rgba(255, 215, 0, 0.6);
                transform: translate(-50%, -50%) rotate(${i * 45}deg) translateY(-200px);
                animation: runeGlow 3s ease-in-out infinite alternate;
            `;
            magicCircle.appendChild(rune);
        }
        
        this.scene3D.appendChild(magicCircle);
    }
    
    async initAdvancedAudioSystem() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // 创建音频节点
            this.masterGain = this.audioContext.createGain();
            this.masterGain.connect(this.audioContext.destination);
            this.masterGain.gain.setValueAtTime(0.3, this.audioContext.currentTime);
            
            // 预加载音效
            this.soundBank = {
                roseBloom: this.createRoseBloomSound.bind(this),
                heartbeat: this.createHeartbeatSound.bind(this),
                sparkle: this.createSparkleSound.bind(this),
                completion: this.createCompletionSound.bind(this),
                ambient: this.createAmbientSound.bind(this)
            };
            
            console.log('🎵 高级音频系统初始化完成');
        } catch (error) {
            console.log('🔇 音频系统初始化失败，使用静默模式');
            this.config.soundEnabled = false;
        }
    }
    
    initAdvancedParticleSystem() {
        // 创建粒子容器
        this.particleContainer = document.createElement('div');
        this.particleContainer.className = 'advanced-particle-container';
        this.particleContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1000;
            overflow: visible;
        `;
        this.container.appendChild(this.particleContainer);
        
        // 启动高级粒子系统
        this.startAdvancedParticleSystem();
    }
    
    startAdvancedParticleSystem() {
        // 爱心粒子
        setInterval(() => {
            if (this.particleSystem.hearts.length < 20) {
                this.createHeartParticle();
            }
        }, 2000);
        
        // 闪光粒子
        setInterval(() => {
            if (this.particleSystem.sparkles.length < 30) {
                this.createSparkleParticle();
            }
        }, 1000);
        
        // 花瓣粒子
        setInterval(() => {
            if (this.particleSystem.petals.length < 15) {
                this.createPetalParticle();
            }
        }, 1500);
        
        // 光点粒子
        setInterval(() => {
            if (this.particleSystem.lights.length < 25) {
                this.createLightParticle();
            }
        }, 800);
    }
    
    createHeartParticle() {
        const heart = document.createElement('div');
        const hearts = ['💖', '💕', '💝', '❤️', '💗', '💓', '💘'];
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        
        heart.style.cssText = `
            position: absolute;
            font-size: ${16 + Math.random() * 12}px;
            left: ${Math.random() * 100}%;
            top: 100%;
            opacity: 0.8;
            animation: advancedHeartFloat ${8 + Math.random() * 4}s ease-out forwards;
            pointer-events: none;
            z-index: 1001;
            filter: drop-shadow(0 0 5px rgba(255, 20, 147, 0.5));
        `;
        
        this.particleContainer.appendChild(heart);
        this.particleSystem.hearts.push(heart);
        
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
                this.particleSystem.hearts = this.particleSystem.hearts.filter(h => h !== heart);
            }
        }, 12000);
    }
    
    createSparkleParticle() {
        const sparkle = document.createElement('div');
        sparkle.textContent = '✨';
        
        sparkle.style.cssText = `
            position: absolute;
            font-size: ${12 + Math.random() * 8}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: 0;
            animation: sparkleAnimation ${3 + Math.random() * 2}s ease-in-out forwards;
            pointer-events: none;
            z-index: 1002;
            filter: drop-shadow(0 0 3px rgba(255, 215, 0, 0.8));
        `;
        
        this.particleContainer.appendChild(sparkle);
        this.particleSystem.sparkles.push(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
                this.particleSystem.sparkles = this.particleSystem.sparkles.filter(s => s !== sparkle);
            }
        }, 5000);
    }
    
    createPetalParticle() {
        const petal = document.createElement('div');
        petal.style.cssText = `
            position: absolute;
            width: ${8 + Math.random() * 6}px;
            height: ${12 + Math.random() * 8}px;
            background: linear-gradient(45deg, 
                rgba(255, 20, 147, 0.8) 0%, 
                rgba(255, 105, 180, 0.6) 50%, 
                rgba(255, 182, 193, 0.4) 100%);
            border-radius: 50% 0 50% 0;
            left: ${Math.random() * 100}%;
            top: -20px;
            opacity: 0.7;
            animation: advancedPetalFall ${12 + Math.random() * 8}s linear forwards;
            pointer-events: none;
            z-index: 999;
            box-shadow: 0 0 5px rgba(255, 20, 147, 0.3);
        `;
        
        this.particleContainer.appendChild(petal);
        this.particleSystem.petals.push(petal);
        
        setTimeout(() => {
            if (petal.parentNode) {
                petal.parentNode.removeChild(petal);
                this.particleSystem.petals = this.particleSystem.petals.filter(p => p !== petal);
            }
        }, 20000);
    }
    
    createLightParticle() {
        const light = document.createElement('div');
        light.style.cssText = `
            position: absolute;
            width: ${4 + Math.random() * 6}px;
            height: ${4 + Math.random() * 6}px;
            background: radial-gradient(circle, 
                rgba(255, 215, 0, 0.9) 0%, 
                rgba(255, 255, 255, 0.5) 50%, 
                transparent 100%);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: 0;
            animation: lightParticleAnimation ${4 + Math.random() * 3}s ease-in-out infinite;
            pointer-events: none;
            z-index: 1000;
        `;
        
        this.particleContainer.appendChild(light);
        this.particleSystem.lights.push(light);
        
        setTimeout(() => {
            if (light.parentNode) {
                light.parentNode.removeChild(light);
                this.particleSystem.lights = this.particleSystem.lights.filter(l => l !== light);
            }
        }, 7000);
    }
    
    setupInteractionSystem() {
        // 鼠标跟踪
        this.container.addEventListener('mousemove', (e) => {
            this.onMouseMove(e);
        });
        
        // 触摸支持
        this.container.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            this.onMouseMove(touch);
        });
        
        // 键盘快捷键
        document.addEventListener('keydown', (e) => {
            this.handleAdvancedKeyPress(e);
        });
        
        // 窗口大小变化
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }
    
    onMouseMove(e) {
        const rect = this.container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // 创建鼠标跟踪粒子
        if (Math.random() < 0.3) {
            this.createMouseTrailParticle(x, y);
        }
        
        // 影响附近的玫瑰花
        this.roses.forEach(rose => {
            const roseRect = rose.getBoundingClientRect();
            const roseX = roseRect.left + roseRect.width / 2 - rect.left;
            const roseY = roseRect.top + roseRect.height / 2 - rect.top;
            const distance = Math.sqrt((x - roseX) ** 2 + (y - roseY) ** 2);
            
            if (distance < 100) {
                const intensity = 1 - distance / 100;
                rose.style.transform = `scale(${1 + intensity * 0.5}) rotate(${intensity * 10}deg)`;
                rose.style.filter = `brightness(${1 + intensity * 0.3}) saturate(${1 + intensity * 0.2})`;
            } else {
                rose.style.transform = '';
                rose.style.filter = '';
            }
        });
    }
    
    createMouseTrailParticle(x, y) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 6px;
            height: 6px;
            background: radial-gradient(circle, rgba(255, 215, 0, 0.8) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            animation: mouseTrailFade 1s ease-out forwards;
            z-index: 1003;
        `;
        
        this.particleContainer.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1000);
    }

    generateAdvancedTextPaths() {
        // 生成高精度的汉字路径
        const paths = {
            生: this.generateHighResCharPath('生'),
            日: this.generateHighResCharPath('日'),
            快: this.generateHighResCharPath('快'),
            乐: this.generateHighResCharPath('乐')
        };

        return paths;
    }

    generateHighResCharPath(char) {
        const points = [];
        const charWidth = 150;
        const charHeight = 200;

        switch(char) {
            case '生':
                // "生"字的高精度路径 - 更多细节点
                points.push(...this.generateAdvancedStroke(15, 25, 135, 25, 25)); // 上横
                points.push(...this.generateAdvancedStroke(75, 15, 75, 185, 35)); // 主竖
                points.push(...this.generateAdvancedStroke(15, 70, 135, 70, 25)); // 中横
                points.push(...this.generateAdvancedStroke(35, 90, 115, 90, 18)); // 横
                points.push(...this.generateAdvancedStroke(25, 115, 125, 115, 22)); // 横
                points.push(...this.generateAdvancedStroke(45, 140, 105, 140, 15)); // 横
                points.push(...this.generateAdvancedStroke(35, 165, 115, 165, 18)); // 下横
                break;

            case '日':
                // "日"字的高精度路径
                points.push(...this.generateAdvancedStroke(35, 25, 115, 25, 20)); // 上横
                points.push(...this.generateAdvancedStroke(35, 25, 35, 175, 30)); // 左竖
                points.push(...this.generateAdvancedStroke(115, 25, 115, 175, 30)); // 右竖
                points.push(...this.generateAdvancedStroke(35, 100, 115, 100, 20)); // 中横
                points.push(...this.generateAdvancedStroke(35, 175, 115, 175, 20)); // 下横
                break;

            case '快':
                // "快"字的高精度路径
                points.push(...this.generateAdvancedStroke(25, 35, 25, 165, 25)); // 左竖
                points.push(...this.generateAdvancedStroke(20, 60, 60, 60, 12)); // 左横
                points.push(...this.generateAdvancedStroke(20, 90, 60, 90, 12)); // 左横
                points.push(...this.generateAdvancedStroke(20, 120, 60, 120, 12)); // 左横
                points.push(...this.generateAdvancedStroke(20, 150, 60, 150, 12)); // 左横
                points.push(...this.generateAdvancedStroke(85, 25, 85, 175, 30)); // 右竖
                points.push(...this.generateAdvancedStroke(70, 50, 125, 50, 15)); // 右上横
                points.push(...this.generateAdvancedStroke(70, 85, 125, 85, 15)); // 右中横
                points.push(...this.generateAdvancedStroke(70, 120, 125, 120, 15)); // 右下横
                points.push(...this.generateAdvancedStroke(105, 60, 105, 110, 12)); // 右中竖
                break;

            case '乐':
                // "乐"字的高精度路径
                points.push(...this.generateAdvancedStroke(35, 35, 115, 35, 20)); // 上横
                points.push(...this.generateAdvancedStroke(75, 25, 75, 60, 12)); // 上竖
                points.push(...this.generateAdvancedStroke(50, 75, 100, 75, 15)); // 中横
                points.push(...this.generateAdvancedStroke(35, 110, 115, 110, 20)); // 下横
                points.push(...this.generateAdvancedStroke(30, 140, 120, 140, 25)); // 底横
                points.push(...this.generateAdvancedStroke(55, 85, 55, 150, 18)); // 左下竖
                points.push(...this.generateAdvancedStroke(95, 85, 95, 150, 18)); // 右下竖
                points.push(...this.generateAdvancedStroke(75, 160, 75, 185, 12)); // 最下竖
                break;
        }

        return points;
    }

    generateAdvancedStroke(x1, y1, x2, y2, pointCount) {
        const points = [];
        const dx = (x2 - x1) / (pointCount - 1);
        const dy = (y2 - y1) / (pointCount - 1);

        for (let i = 0; i < pointCount; i++) {
            const progress = i / (pointCount - 1);
            // 添加自然的笔画变化
            const variation = Math.sin(progress * Math.PI) * 2;

            points.push({
                x: x1 + dx * i + (Math.random() - 0.5) * 3 + variation,
                y: y1 + dy * i + (Math.random() - 0.5) * 3,
                intensity: Math.sin(progress * Math.PI) * 0.5 + 0.5, // 笔画粗细变化
                delay: i * 50 // 每个点的延迟
            });
        }

        return points;
    }

    async startRoseGeneration() {
        if (this.isGenerating) return;

        this.isGenerating = true;
        console.log('🌹 开始生成726朵玫瑰花...');

        // 播放开始音效
        if (this.config.soundEnabled) {
            this.playSound('ambient');
        }

        const containerWidth = this.container.offsetWidth || 1000;
        const containerHeight = this.container.offsetHeight || 600;

        // 计算每个字符的3D位置
        const charPositions = [
            {
                char: '生',
                x: containerWidth * 0.15,
                y: containerHeight * 0.4,
                z: Math.random() * 100 - 50,
                rotation: Math.random() * 20 - 10
            },
            {
                char: '日',
                x: containerWidth * 0.35,
                y: containerHeight * 0.4,
                z: Math.random() * 100 - 50,
                rotation: Math.random() * 20 - 10
            },
            {
                char: '快',
                x: containerWidth * 0.55,
                y: containerHeight * 0.4,
                z: Math.random() * 100 - 50,
                rotation: Math.random() * 20 - 10
            },
            {
                char: '乐',
                x: containerWidth * 0.75,
                y: containerHeight * 0.4,
                z: Math.random() * 100 - 50,
                rotation: Math.random() * 20 - 10
            }
        ];

        let totalRoses = 0;
        let animationDelay = 0;

        // 为每个字符生成高级玫瑰花
        for (const charPos of charPositions) {
            const charPath = this.textPaths[charPos.char];
            console.log(`🌹 生成字符 "${charPos.char}" 的玫瑰花，共 ${charPath.length} 朵`);

            for (const point of charPath) {
                if (totalRoses >= this.targetRoseCount) break;

                const rose = await this.createAdvancedRose(
                    charPos.x + point.x,
                    charPos.y + point.y,
                    charPos.z + Math.random() * 20 - 10,
                    totalRoses,
                    point.intensity,
                    charPos.rotation
                );

                this.scene3D.appendChild(rose);
                this.roses.push(rose);
                totalRoses++;

                // 渐进式显示
                setTimeout(() => {
                    rose.style.opacity = '1';
                    this.updateAdvancedRoseCounter(totalRoses);

                    // 播放绽放音效
                    if (this.config.soundEnabled && Math.random() < 0.1) {
                        this.playSound('roseBloom');
                    }

                    // 创建绽放特效
                    this.createRoseBloomEffect(rose);

                }, animationDelay);

                animationDelay += 40; // 每朵花间隔40ms

                // 每50朵花暂停一下，创建波浪效果
                if (totalRoses % 50 === 0) {
                    animationDelay += 500;
                }
            }
        }

        // 补充装饰性玫瑰花达到726朵
        while (totalRoses < this.targetRoseCount) {
            const rose = await this.createDecorativeAdvancedRose(
                containerWidth,
                containerHeight,
                totalRoses
            );

            this.scene3D.appendChild(rose);
            this.roses.push(rose);
            totalRoses++;

            setTimeout(() => {
                rose.style.opacity = '1';
                this.updateAdvancedRoseCounter(totalRoses);
            }, animationDelay);

            animationDelay += 25;
        }

        console.log(`🌹 总共生成了 ${totalRoses} 朵高级玫瑰花`);
        this.isGenerating = false;
    }

    async createAdvancedRose(x, y, z, index, intensity, rotation) {
        const rose = document.createElement('div');
        rose.className = 'advanced-mini-rose';

        // 根据强度调整大小
        const size = this.config.roseSize.min + (this.config.roseSize.max - this.config.roseSize.min) * intensity;
        const glowIntensity = this.config.glowIntensity.min + (this.config.glowIntensity.max - this.config.glowIntensity.min) * intensity;

        rose.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            opacity: 0;
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            transform: translateZ(${z}px) rotateZ(${rotation}deg);
            animation: advancedRoseAppear 1s ease-out forwards;
            animation-delay: ${index * 0.01}s;
            z-index: ${100 + Math.floor(z)};
        `;

        // 创建多层花瓣结构
        const petalLayers = this.createAdvancedPetalLayers(size, glowIntensity, intensity);
        petalLayers.forEach(layer => rose.appendChild(layer));

        // 创建花心
        const center = this.createAdvancedRoseCenter(size, intensity);
        rose.appendChild(center);

        // 创建花茎
        const stem = this.createAdvancedStem(size);
        rose.appendChild(stem);

        // 创建光晕效果
        const aura = this.createRoseAura(size, glowIntensity);
        rose.appendChild(aura);

        // 添加高级交互事件
        this.addAdvancedRoseInteractions(rose, index, intensity);

        // 特殊玫瑰花效果
        if (index % 50 === 0) {
            rose.classList.add('golden-rose');
            this.applyGoldenRoseEffect(rose);
        } else if (index % 100 === 0) {
            rose.classList.add('diamond-rose');
            this.applyDiamondRoseEffect(rose);
        }

        return rose;
    }

    createAdvancedPetalLayers(size, glowIntensity, intensity) {
        const layers = [];
        const layerCount = 3;

        for (let i = 0; i < layerCount; i++) {
            const layer = document.createElement('div');
            layer.className = `petal-layer-${i}`;

            const layerSize = size * (1 - i * 0.2);
            const petalCount = 8 - i * 2;

            layer.style.cssText = `
                position: absolute;
                width: ${layerSize}px;
                height: ${layerSize}px;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%) rotateZ(${i * 22.5}deg);
                animation: petalLayerRotate ${20 + i * 5}s linear infinite;
            `;

            // 创建花瓣
            for (let j = 0; j < petalCount; j++) {
                const petal = document.createElement('div');
                petal.className = 'advanced-petal';

                const angle = (360 / petalCount) * j;
                const petalSize = layerSize * 0.4;

                petal.style.cssText = `
                    position: absolute;
                    width: ${petalSize}px;
                    height: ${petalSize * 1.5}px;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%) rotate(${angle}deg) translateY(-${layerSize * 0.3}px);
                    background: linear-gradient(45deg,
                        rgba(255, 20, 147, ${0.9 - i * 0.2}) 0%,
                        rgba(255, 105, 180, ${0.8 - i * 0.15}) 30%,
                        rgba(255, 182, 193, ${0.7 - i * 0.1}) 60%,
                        rgba(255, 240, 245, ${0.6 - i * 0.1}) 100%);
                    border-radius: 50% 50% 50% 0;
                    box-shadow:
                        inset 0 0 ${petalSize * 0.3}px rgba(255, 255, 255, 0.4),
                        0 0 ${petalSize * 0.5}px rgba(255, 20, 147, ${glowIntensity * 0.6});
                    animation: petalGlow ${3 + Math.random() * 2}s ease-in-out infinite alternate;
                    filter: blur(${0.2 - i * 0.05}px);
                `;

                layer.appendChild(petal);
            }

            layers.push(layer);
        }

        return layers;
    }

    createAdvancedRoseCenter(size, intensity) {
        const center = document.createElement('div');
        center.className = 'advanced-rose-center';

        const centerSize = size * 0.3;

        center.style.cssText = `
            position: absolute;
            left: 50%;
            top: 50%;
            width: ${centerSize}px;
            height: ${centerSize}px;
            transform: translate(-50%, -50%);
            background: radial-gradient(circle at 30% 30%,
                rgba(255, 215, 0, 0.9) 0%,
                rgba(255, 140, 0, 0.8) 40%,
                rgba(255, 69, 0, 0.7) 70%,
                rgba(139, 69, 19, 0.6) 100%);
            border-radius: 50%;
            box-shadow:
                inset 0 0 ${centerSize * 0.4}px rgba(255, 255, 255, 0.6),
                0 0 ${centerSize * 0.8}px rgba(255, 215, 0, ${intensity}),
                0 0 ${centerSize * 1.2}px rgba(255, 140, 0, ${intensity * 0.6});
            animation: centerPulse ${2 + Math.random()}s ease-in-out infinite;
        `;

        // 添加花蕊细节
        for (let i = 0; i < 6; i++) {
            const stamen = document.createElement('div');
            stamen.style.cssText = `
                position: absolute;
                width: 1px;
                height: ${centerSize * 0.4}px;
                background: rgba(139, 69, 19, 0.8);
                left: 50%;
                top: 50%;
                transform: translate(-50%, -100%) rotate(${i * 60}deg);
                transform-origin: bottom center;
            `;
            center.appendChild(stamen);
        }

        return center;
    }

    createAdvancedStem(size) {
        const stem = document.createElement('div');
        stem.className = 'advanced-stem';

        stem.style.cssText = `
            position: absolute;
            left: 50%;
            bottom: -${size * 0.8}px;
            width: ${Math.max(2, size * 0.15)}px;
            height: ${size * 0.8}px;
            background: linear-gradient(to bottom,
                rgba(34, 139, 34, 0.9) 0%,
                rgba(0, 100, 0, 0.8) 50%,
                rgba(0, 50, 0, 0.7) 100%);
            transform: translateX(-50%);
            border-radius: ${size * 0.075}px;
            box-shadow:
                inset 1px 0 2px rgba(255, 255, 255, 0.3),
                inset -1px 0 2px rgba(0, 0, 0, 0.3);
        `;

        // 添加叶子
        if (Math.random() < 0.3) {
            const leaf = document.createElement('div');
            leaf.style.cssText = `
                position: absolute;
                width: ${size * 0.4}px;
                height: ${size * 0.25}px;
                background: linear-gradient(45deg,
                    rgba(34, 139, 34, 0.8) 0%,
                    rgba(0, 128, 0, 0.7) 100%);
                border-radius: 0 100% 0 100%;
                left: ${Math.random() < 0.5 ? '-' : ''}${size * 0.3}px;
                top: ${size * 0.2}px;
                transform: rotate(${(Math.random() - 0.5) * 60}deg);
            `;
            stem.appendChild(leaf);
        }

        return stem;
    }

    createRoseAura(size, glowIntensity) {
        const aura = document.createElement('div');
        aura.className = 'rose-aura';

        aura.style.cssText = `
            position: absolute;
            left: 50%;
            top: 50%;
            width: ${size * 3}px;
            height: ${size * 3}px;
            transform: translate(-50%, -50%);
            background: radial-gradient(circle,
                rgba(255, 20, 147, ${glowIntensity * 0.3}) 0%,
                rgba(255, 105, 180, ${glowIntensity * 0.2}) 30%,
                rgba(255, 182, 193, ${glowIntensity * 0.1}) 60%,
                transparent 100%);
            border-radius: 50%;
            animation: auraGlow ${4 + Math.random() * 2}s ease-in-out infinite;
            pointer-events: none;
            z-index: -1;
        `;

        return aura;
    }

    addAdvancedRoseInteractions(rose, index, intensity) {
        // 点击事件
        rose.addEventListener('click', (e) => {
            e.stopPropagation();
            this.onAdvancedRoseClick(rose, index, intensity);
        });

        // 鼠标悬停
        rose.addEventListener('mouseenter', () => {
            this.onAdvancedRoseHover(rose, intensity);
        });

        rose.addEventListener('mouseleave', () => {
            this.onAdvancedRoseLeave(rose);
        });

        // 触摸支持
        rose.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.onAdvancedRoseClick(rose, index, intensity);
        });
    }

    onAdvancedRoseClick(rose, index, intensity) {
        // 播放音效
        if (this.config.soundEnabled) {
            this.playSound('roseBloom');
        }

        // 创建爆炸特效
        this.createRoseExplosionEffect(rose, intensity);

        // 临时放大和旋转
        rose.style.transform += ` scale(${2 + intensity}) rotateZ(${360 * intensity}deg)`;
        rose.style.zIndex = '2000';
        rose.style.filter = `brightness(${1.5 + intensity}) saturate(${1.5 + intensity}) hue-rotate(${Math.random() * 360}deg)`;

        // 创建文字提示
        this.showRoseMessage(rose, index);

        setTimeout(() => {
            rose.style.transform = rose.style.transform.replace(/scale\([^)]*\)/, '').replace(/rotateZ\([^)]*\)/, '');
            rose.style.zIndex = '';
            rose.style.filter = '';
        }, 2000);
    }

    onAdvancedRoseHover(rose, intensity) {
        rose.style.transform += ` scale(${1.5 + intensity * 0.5})`;
        rose.style.filter = `brightness(${1.2 + intensity * 0.3}) saturate(${1.3 + intensity * 0.2})`;
        rose.style.zIndex = '1500';

        // 创建悬停光环
        this.createHoverAura(rose, intensity);
    }

    onAdvancedRoseLeave(rose) {
        rose.style.transform = rose.style.transform.replace(/scale\([^)]*\)/, '');
        rose.style.filter = '';
        rose.style.zIndex = '';
    }

    createRoseExplosionEffect(rose, intensity) {
        const explosionContainer = document.createElement('div');
        explosionContainer.style.cssText = `
            position: absolute;
            left: 50%;
            top: 50%;
            width: 0;
            height: 0;
            pointer-events: none;
            z-index: 2001;
        `;

        rose.appendChild(explosionContainer);

        // 创建爆炸粒子
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            const angle = (360 / 12) * i;
            const distance = 50 + intensity * 30;

            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: radial-gradient(circle, rgba(255, 215, 0, 0.9) 0%, transparent 70%);
                border-radius: 50%;
                left: 0;
                top: 0;
                animation: explosionParticle 1.5s ease-out forwards;
                transform: rotate(${angle}deg) translateX(${distance}px);
            `;

            explosionContainer.appendChild(particle);
        }

        // 创建爱心爆炸
        for (let i = 0; i < 6; i++) {
            const heart = document.createElement('div');
            heart.textContent = '💖';
            heart.style.cssText = `
                position: absolute;
                font-size: 16px;
                left: 0;
                top: 0;
                animation: heartExplosion 2s ease-out forwards;
                animation-delay: ${i * 0.1}s;
                transform: rotate(${i * 60}deg) translateX(${30 + intensity * 20}px);
            `;

            explosionContainer.appendChild(heart);
        }

        setTimeout(() => {
            if (explosionContainer.parentNode) {
                explosionContainer.parentNode.removeChild(explosionContainer);
            }
        }, 2500);
    }

    showRoseMessage(rose, index) {
        const messages = [
            '💖 我爱你！',
            '🌹 为你绽放',
            '✨ 生日快乐',
            '💝 你是最美的',
            '🎂 甜蜜时光',
            '💕 永远爱你',
            '🌟 闪耀如星',
            '🎉 庆祝你的生日'
        ];

        const message = document.createElement('div');
        message.textContent = messages[index % messages.length];
        message.style.cssText = `
            position: absolute;
            left: 50%;
            top: -30px;
            transform: translateX(-50%);
            background: linear-gradient(45deg, rgba(255, 20, 147, 0.9), rgba(255, 215, 0, 0.9));
            color: white;
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 12px;
            font-weight: bold;
            white-space: nowrap;
            animation: messageFloat 3s ease-out forwards;
            z-index: 2002;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        `;

        rose.appendChild(message);

        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 3000);
    }

    createHoverAura(rose, intensity) {
        const existingAura = rose.querySelector('.hover-aura');
        if (existingAura) return;

        const hoverAura = document.createElement('div');
        hoverAura.className = 'hover-aura';
        hoverAura.style.cssText = `
            position: absolute;
            left: 50%;
            top: 50%;
            width: ${60 + intensity * 20}px;
            height: ${60 + intensity * 20}px;
            transform: translate(-50%, -50%);
            background: radial-gradient(circle,
                rgba(255, 215, 0, ${0.4 + intensity * 0.2}) 0%,
                rgba(255, 20, 147, ${0.3 + intensity * 0.1}) 50%,
                transparent 100%);
            border-radius: 50%;
            animation: hoverAuraGlow 1s ease-in-out infinite;
            pointer-events: none;
            z-index: -1;
        `;

        rose.appendChild(hoverAura);

        setTimeout(() => {
            if (hoverAura.parentNode) {
                hoverAura.parentNode.removeChild(hoverAura);
            }
        }, 500);
    }

    // 音效系统
    playSound(soundType) {
        if (!this.config.soundEnabled || !this.audioContext) return;

        try {
            if (this.soundBank[soundType]) {
                this.soundBank[soundType]();
            }
        } catch (error) {
            console.log('音效播放失败:', error);
        }
    }

    createRoseBloomSound() {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();

        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.masterGain);

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1200, this.audioContext.currentTime + 0.1);
        oscillator.frequency.exponentialRampToValueAtTime(600, this.audioContext.currentTime + 0.3);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2000, this.audioContext.currentTime);

        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.3);
    }

    createHeartbeatSound() {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.masterGain);

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(60, this.audioContext.currentTime);

        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.2, this.audioContext.currentTime + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.5);
    }

    createSparkleSound() {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.masterGain);

        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(1500, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(3000, this.audioContext.currentTime + 0.1);

        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.05, this.audioContext.currentTime + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }

    createCompletionSound() {
        // 播放一段美妙的旋律
        const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C, E, G, C, E

        notes.forEach((freq, index) => {
            setTimeout(() => {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();

                oscillator.connect(gainNode);
                gainNode.connect(this.masterGain);

                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);

                gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
                gainNode.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 0.1);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);

                oscillator.start(this.audioContext.currentTime);
                oscillator.stop(this.audioContext.currentTime + 0.5);
            }, index * 200);
        });
    }

    updateAdvancedRoseCounter(count) {
        if (this.roseCounter) {
            this.roseCounter.textContent = count;

            // 计数器动画
            this.roseCounter.style.transform = 'scale(1.2)';
            this.roseCounter.style.color = '#ff1744';

            setTimeout(() => {
                this.roseCounter.style.transform = '';
                this.roseCounter.style.color = '';
            }, 200);

            // 达到726朵时的特殊效果
            if (count === this.targetRoseCount) {
                this.onAllAdvancedRosesGenerated();
            }
        }
    }

    onAllAdvancedRosesGenerated() {
        console.log('🎉 726朵玫瑰花全部绽放完成！');

        // 播放完成音效
        if (this.config.soundEnabled) {
            this.playSound('completion');
        }

        // 显示完成消息
        this.showGrandCompletionMessage();

        // 启动最终庆祝动画
        this.startGrandCelebration();

        // 创建烟花效果
        this.createGrandFireworks();
    }

    showGrandCompletionMessage() {
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #ff1744, #ffd700, #ff6b9d, #ff1744);
            background-size: 400% 400%;
            color: white;
            padding: 30px 50px;
            border-radius: 50px;
            font-size: 24px;
            font-weight: bold;
            text-align: center;
            box-shadow:
                0 10px 30px rgba(255, 23, 68, 0.5),
                inset 0 1px 0 rgba(255, 255, 255, 0.3);
            animation: grandMessageAppear 3s ease-out forwards, gradientFlow 4s ease-in-out infinite;
            z-index: 10000;
            border: 3px solid rgba(255, 255, 255, 0.3);
        `;
        message.innerHTML = `
            <div>🌹 726朵玫瑰花为你绽放！ 🌹</div>
            <div style="font-size: 18px; margin-top: 10px; opacity: 0.9;">
                每一朵都代表我对你的爱 💖
            </div>
        `;

        document.body.appendChild(message);

        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 8000);
    }

    startGrandCelebration() {
        // 让所有玫瑰花进行庆祝动画
        this.roses.forEach((rose, index) => {
            setTimeout(() => {
                rose.style.animation += ', grandCelebrationDance 2s ease-in-out';
            }, index * 10);
        });

        // 增强粒子效果
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                this.createCelebrationParticle();
            }, i * 100);
        }
    }

    createCelebrationParticle() {
        const particle = document.createElement('div');
        const emojis = ['🎉', '🎊', '✨', '💖', '🌟', '💫', '🎈', '🎁'];
        particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];

        particle.style.cssText = `
            position: fixed;
            font-size: ${20 + Math.random() * 15}px;
            left: ${Math.random() * 100}%;
            top: 100%;
            animation: celebrationParticleFloat ${4 + Math.random() * 3}s ease-out forwards;
            pointer-events: none;
            z-index: 9999;
        `;

        document.body.appendChild(particle);

        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 7000);
    }

    createGrandFireworks() {
        const fireworksContainer = document.createElement('div');
        fireworksContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9998;
        `;

        document.body.appendChild(fireworksContainer);

        // 创建多个烟花
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                this.createSingleFirework(fireworksContainer);
            }, i * 500);
        }

        setTimeout(() => {
            if (fireworksContainer.parentNode) {
                fireworksContainer.parentNode.removeChild(fireworksContainer);
            }
        }, 10000);
    }

    createSingleFirework(container) {
        const firework = document.createElement('div');
        firework.style.cssText = `
            position: absolute;
            left: ${20 + Math.random() * 60}%;
            top: ${20 + Math.random() * 40}%;
            width: 4px;
            height: 4px;
        `;

        container.appendChild(firework);

        // 创建烟花爆炸
        for (let i = 0; i < 20; i++) {
            const spark = document.createElement('div');
            const angle = (360 / 20) * i;
            const distance = 50 + Math.random() * 100;
            const color = ['#ff1744', '#ffd700', '#ff6b9d', '#00ff00', '#00bfff'][Math.floor(Math.random() * 5)];

            spark.style.cssText = `
                position: absolute;
                width: 3px;
                height: 3px;
                background: ${color};
                border-radius: 50%;
                left: 0;
                top: 0;
                animation: fireworkSpark 2s ease-out forwards;
                transform: rotate(${angle}deg) translateX(${distance}px);
                box-shadow: 0 0 6px ${color};
            `;

            firework.appendChild(spark);
        }

        setTimeout(() => {
            if (firework.parentNode) {
                firework.parentNode.removeChild(firework);
            }
        }, 2000);
    }
}

// 导出到全局
window.AdvancedRoseGenerator = AdvancedRoseGenerator;
