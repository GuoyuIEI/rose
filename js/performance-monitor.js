// 性能监控器
class PerformanceMonitor {
    constructor() {
        this.metrics = {
            fps: 0,
            frameTime: 0,
            memoryUsage: 0,
            loadTime: 0
        };
        this.frameCount = 0;
        this.lastTime = performance.now();
        this.isMonitoring = false;
        this.optimizationLevel = 0; // 0: 无优化, 1: 轻度优化, 2: 重度优化
        this.init();
    }

    init() {
        this.measureLoadTime();
        this.startFPSMonitoring();
        this.setupPerformanceObserver();
    }

    // 测量页面加载时间
    measureLoadTime() {
        if (performance.timing) {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            this.metrics.loadTime = loadTime;
        }
        
        // 使用 Performance API 测量资源加载
        if (performance.getEntriesByType) {
            const resources = performance.getEntriesByType('resource');
            const totalResourceTime = resources.reduce((total, resource) => {
                return total + (resource.responseEnd - resource.startTime);
            }, 0);
            
            console.log(`总资源加载时间: ${totalResourceTime.toFixed(2)}ms`);
        }
    }

    // 开始FPS监控
    startFPSMonitoring() {
        this.isMonitoring = true;
        this.monitorFrame();
    }

    // 监控帧率
    monitorFrame() {
        if (!this.isMonitoring) return;
        
        const currentTime = performance.now();
        const deltaTime = currentTime - this.lastTime;
        
        this.frameCount++;
        this.metrics.frameTime = deltaTime;
        
        // 每秒计算一次FPS
        if (this.frameCount >= 60) {
            this.metrics.fps = Math.round(1000 / (deltaTime / this.frameCount));
            this.frameCount = 0;
            this.checkPerformance();
        }
        
        this.lastTime = currentTime;
        requestAnimationFrame(() => this.monitorFrame());
    }

    // 设置性能观察器
    setupPerformanceObserver() {
        if ('PerformanceObserver' in window) {
            // 监控长任务
            try {
                const longTaskObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    entries.forEach(entry => {
                        if (entry.duration > 50) {
                            console.warn(`检测到长任务: ${entry.duration.toFixed(2)}ms`);
                            this.handleLongTask(entry.duration);
                        }
                    });
                });
                longTaskObserver.observe({ entryTypes: ['longtask'] });
            } catch (e) {
                console.log('长任务监控不支持');
            }
            
            // 监控布局偏移
            try {
                const layoutShiftObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    entries.forEach(entry => {
                        if (entry.value > 0.1) {
                            console.warn(`检测到布局偏移: ${entry.value.toFixed(4)}`);
                        }
                    });
                });
                layoutShiftObserver.observe({ entryTypes: ['layout-shift'] });
            } catch (e) {
                console.log('布局偏移监控不支持');
            }
        }
    }

    // 检查性能并自动优化
    checkPerformance() {
        const fps = this.metrics.fps;
        
        if (fps < 30 && this.optimizationLevel < 2) {
            this.applyOptimization(2); // 重度优化
        } else if (fps < 45 && this.optimizationLevel < 1) {
            this.applyOptimization(1); // 轻度优化
        } else if (fps > 55 && this.optimizationLevel > 0) {
            this.reduceOptimization(); // 减少优化
        }
    }

    // 应用性能优化
    applyOptimization(level) {
        this.optimizationLevel = level;
        
        switch (level) {
            case 1: // 轻度优化
                this.reducePetals();
                this.simplifyAnimations();
                break;
            case 2: // 重度优化
                this.disableParticles();
                this.reduceAnimationComplexity();
                this.limitFallingPetals();
                break;
        }
        
        console.log(`应用性能优化等级: ${level}`);
    }

    // 减少优化
    reduceOptimization() {
        if (this.optimizationLevel > 0) {
            this.optimizationLevel--;
            this.restoreFeatures();
        }
    }

    // 处理长任务
    handleLongTask(duration) {
        if (duration > 100) {
            // 如果任务执行时间过长，临时降低动画复杂度
            this.temporaryOptimization();
        }
    }

    // 减少花瓣数量
    reducePetals() {
        const style = document.createElement('style');
        style.id = 'perf-opt-petals';
        style.textContent = `
            .falling-petal:nth-child(n+10) {
                display: none;
            }
        `;
        document.head.appendChild(style);
    }

    // 简化动画
    simplifyAnimations() {
        const style = document.createElement('style');
        style.id = 'perf-opt-animations';
        style.textContent = `
            .rose {
                animation-duration: 40s !important;
            }
            .petal {
                animation-duration: 8s !important;
            }
        `;
        document.head.appendChild(style);
    }

    // 禁用粒子系统
    disableParticles() {
        const particlesContainer = document.getElementById('particles-js');
        if (particlesContainer) {
            particlesContainer.style.display = 'none';
        }
        
        const decorativeParticles = document.querySelector('.decorative-particles');
        if (decorativeParticles) {
            decorativeParticles.style.display = 'none';
        }
    }

    // 降低动画复杂度
    reduceAnimationComplexity() {
        const style = document.createElement('style');
        style.id = 'perf-opt-complex';
        style.textContent = `
            .petals-layer {
                animation: none !important;
            }
            .rose-center {
                animation-duration: 4s !important;
            }
            .leaf {
                animation: none !important;
            }
        `;
        document.head.appendChild(style);
    }

    // 限制飘落花瓣
    limitFallingPetals() {
        const style = document.createElement('style');
        style.id = 'perf-opt-falling';
        style.textContent = `
            .falling-petal:nth-child(n+5) {
                display: none;
            }
        `;
        document.head.appendChild(style);
    }

    // 临时优化
    temporaryOptimization() {
        document.body.classList.add('temp-optimization');
        
        setTimeout(() => {
            document.body.classList.remove('temp-optimization');
        }, 2000);
    }

    // 恢复功能
    restoreFeatures() {
        const optimizationStyles = document.querySelectorAll('style[id^="perf-opt-"]');
        optimizationStyles.forEach(style => style.remove());
        
        // 恢复粒子系统
        const particlesContainer = document.getElementById('particles-js');
        if (particlesContainer) {
            particlesContainer.style.display = '';
        }
        
        const decorativeParticles = document.querySelector('.decorative-particles');
        if (decorativeParticles) {
            decorativeParticles.style.display = '';
        }
    }

    // 获取内存使用情况
    getMemoryUsage() {
        if (performance.memory) {
            return {
                used: Math.round(performance.memory.usedJSHeapSize / 1048576), // MB
                total: Math.round(performance.memory.totalJSHeapSize / 1048576), // MB
                limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576) // MB
            };
        }
        return null;
    }

    // 获取性能报告
    getPerformanceReport() {
        return {
            ...this.metrics,
            optimizationLevel: this.optimizationLevel,
            memoryUsage: this.getMemoryUsage(),
            timestamp: Date.now()
        };
    }

    // 停止监控
    stopMonitoring() {
        this.isMonitoring = false;
    }

    // 重启监控
    restartMonitoring() {
        this.frameCount = 0;
        this.lastTime = performance.now();
        this.startFPSMonitoring();
    }
}

// 添加临时优化的CSS
const tempOptStyle = document.createElement('style');
tempOptStyle.textContent = `
    .temp-optimization * {
        animation-duration: 2s !important;
        transition-duration: 0.1s !important;
    }
    .temp-optimization .falling-petal:nth-child(n+3) {
        display: none;
    }
`;
document.head.appendChild(tempOptStyle);

// 导出性能监控器
window.PerformanceMonitor = PerformanceMonitor;
