// 音频管理器
class AudioManager {
    constructor() {
        this.audioContext = null;
        this.backgroundMusic = null;
        this.soundEffects = {};
        this.isInitialized = false;
        this.volume = 0.6;
        this.isMuted = false;
        this.init();
    }

    async init() {
        try {
            // 创建音频上下文
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.setupAudioElements();
            this.createSoundEffects();
            this.isInitialized = true;
        } catch (error) {
            console.log('音频初始化失败:', error);
        }
    }

    setupAudioElements() {
        this.backgroundMusic = document.getElementById('background-music');
        if (this.backgroundMusic) {
            this.backgroundMusic.volume = this.volume;
            this.backgroundMusic.addEventListener('error', (e) => {
                console.log('背景音乐加载失败:', e);
            });
        }
    }

    // 创建音效
    createSoundEffects() {
        // 使用Web Audio API创建简单的音效
        this.soundEffects = {
            click: this.createClickSound(),
            bloom: this.createBloomSound(),
            sparkle: this.createSparkleSound(),
            surprise: this.createSurpriseSound()
        };
    }

    // 创建点击音效
    createClickSound() {
        return () => {
            if (!this.audioContext) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.1);
        };
    }

    // 创建绽放音效
    createBloomSound() {
        return () => {
            if (!this.audioContext) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(400, this.audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(800, this.audioContext.currentTime + 0.3);
            
            gainNode.gain.setValueAtTime(0.05, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.3);
        };
    }

    // 创建闪烁音效
    createSparkleSound() {
        return () => {
            if (!this.audioContext) return;
            
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    const oscillator = this.audioContext.createOscillator();
                    const gainNode = this.audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(this.audioContext.destination);
                    
                    oscillator.frequency.setValueAtTime(1200 + i * 200, this.audioContext.currentTime);
                    
                    gainNode.gain.setValueAtTime(0.03, this.audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
                    
                    oscillator.start(this.audioContext.currentTime);
                    oscillator.stop(this.audioContext.currentTime + 0.1);
                }, i * 50);
            }
        };
    }

    // 创建惊喜音效
    createSurpriseSound() {
        return () => {
            if (!this.audioContext) return;
            
            // 创建一个上升的音调序列
            const frequencies = [400, 500, 600, 800, 1000];
            frequencies.forEach((freq, index) => {
                setTimeout(() => {
                    const oscillator = this.audioContext.createOscillator();
                    const gainNode = this.audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(this.audioContext.destination);
                    
                    oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);
                    
                    gainNode.gain.setValueAtTime(0.08, this.audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
                    
                    oscillator.start(this.audioContext.currentTime);
                    oscillator.stop(this.audioContext.currentTime + 0.2);
                }, index * 100);
            });
        };
    }

    // 播放背景音乐
    async playBackgroundMusic() {
        if (!this.backgroundMusic) return false;
        
        try {
            // 确保音频上下文已启动
            if (this.audioContext && this.audioContext.state === 'suspended') {
                await this.audioContext.resume();
            }
            
            await this.backgroundMusic.play();
            return true;
        } catch (error) {
            console.log('播放背景音乐失败:', error);
            return false;
        }
    }

    // 暂停背景音乐
    pauseBackgroundMusic() {
        if (this.backgroundMusic) {
            this.backgroundMusic.pause();
        }
    }

    // 播放音效
    playSound(soundName) {
        if (!this.isMuted && this.soundEffects[soundName]) {
            try {
                this.soundEffects[soundName]();
            } catch (error) {
                console.log('播放音效失败:', error);
            }
        }
    }

    // 设置音量
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        if (this.backgroundMusic) {
            this.backgroundMusic.volume = this.volume;
        }
    }

    // 静音/取消静音
    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.backgroundMusic) {
            this.backgroundMusic.muted = this.isMuted;
        }
        return this.isMuted;
    }

    // 检查音频是否可用
    isAudioAvailable() {
        return this.isInitialized && this.backgroundMusic;
    }

    // 获取音频状态
    getAudioState() {
        return {
            isInitialized: this.isInitialized,
            isPlaying: this.backgroundMusic ? !this.backgroundMusic.paused : false,
            volume: this.volume,
            isMuted: this.isMuted,
            hasAudioFile: this.backgroundMusic ? this.backgroundMusic.src !== '' : false
        };
    }

    // 创建音频可视化（可选功能）
    createAudioVisualizer() {
        if (!this.audioContext || !this.backgroundMusic) return null;
        
        try {
            const analyser = this.audioContext.createAnalyser();
            const source = this.audioContext.createMediaElementSource(this.backgroundMusic);
            
            source.connect(analyser);
            analyser.connect(this.audioContext.destination);
            
            analyser.fftSize = 256;
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            
            return {
                analyser,
                dataArray,
                bufferLength
            };
        } catch (error) {
            console.log('创建音频可视化失败:', error);
            return null;
        }
    }

    // 销毁音频管理器
    destroy() {
        if (this.backgroundMusic) {
            this.backgroundMusic.pause();
            this.backgroundMusic.src = '';
        }
        
        if (this.audioContext) {
            this.audioContext.close();
        }
        
        this.soundEffects = {};
        this.isInitialized = false;
    }
}

// 导出音频管理器
window.AudioManager = AudioManager;
