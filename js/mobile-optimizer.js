// 移动端优化器
class MobileOptimizer {
    constructor() {
        this.isMobile = this.detectMobile();
        this.isTablet = this.detectTablet();
        this.touchDevice = this.detectTouch();
        this.performanceLevel = this.detectPerformanceLevel();
        this.init();
    }

    init() {
        this.setupViewport();
        this.optimizeForDevice();
        this.setupTouchEvents();
        this.optimizeAnimations();
        this.setupOrientationHandling();
        this.preventZoom();
    }

    // 检测移动设备
    detectMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
               window.innerWidth <= 768;
    }

    // 检测平板设备
    detectTablet() {
        return /iPad|Android/i.test(navigator.userAgent) && 
               window.innerWidth > 768 && window.innerWidth <= 1024;
    }

    // 检测触摸设备
    detectTouch() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    // 检测设备性能等级
    detectPerformanceLevel() {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        
        if (!gl) return 'low';
        
        const renderer = gl.getParameter(gl.RENDERER);
        const vendor = gl.getParameter(gl.VENDOR);
        
        // 简单的性能评估
        if (renderer.includes('Adreno') || renderer.includes('Mali') || renderer.includes('PowerVR')) {
            return navigator.hardwareConcurrency > 4 ? 'medium' : 'low';
        }
        
        return navigator.hardwareConcurrency > 6 ? 'high' : 'medium';
    }

    // 设置视口
    setupViewport() {
        let viewport = document.querySelector('meta[name="viewport"]');
        if (!viewport) {
            viewport = document.createElement('meta');
            viewport.name = 'viewport';
            document.head.appendChild(viewport);
        }
        
        if (this.isMobile) {
            viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover';
        } else {
            viewport.content = 'width=device-width, initial-scale=1.0';
        }
    }

    // 根据设备优化
    optimizeForDevice() {
        const body = document.body;
        
        if (this.isMobile) {
            body.classList.add('mobile-device');
        }
        
        if (this.isTablet) {
            body.classList.add('tablet-device');
        }
        
        if (this.touchDevice) {
            body.classList.add('touch-device');
        }
        
        body.classList.add(`performance-${this.performanceLevel}`);
    }

    // 设置触摸事件
    setupTouchEvents() {
        if (!this.touchDevice) return;
        
        // 防止双击缩放
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (e) => {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
        
        // 优化触摸滚动
        document.addEventListener('touchmove', (e) => {
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        }, { passive: false });
        
        // 添加触摸反馈
        this.addTouchFeedback();
    }

    // 添加触摸反馈
    addTouchFeedback() {
        const interactiveElements = document.querySelectorAll('button, .rose-container, .control-btn');
        
        interactiveElements.forEach(element => {
            element.addEventListener('touchstart', () => {
                element.classList.add('touch-active');
            });
            
            element.addEventListener('touchend', () => {
                setTimeout(() => {
                    element.classList.remove('touch-active');
                }, 150);
            });
            
            element.addEventListener('touchcancel', () => {
                element.classList.remove('touch-active');
            });
        });
    }

    // 优化动画
    optimizeAnimations() {
        const style = document.createElement('style');
        let css = '';
        
        if (this.performanceLevel === 'low') {
            // 低性能设备：减少动画复杂度
            css += `
                .performance-low .rose {
                    animation-duration: 30s !important;
                }
                .performance-low .petal {
                    animation-duration: 6s !important;
                }
                .performance-low .falling-petal {
                    animation-duration: 4s !important;
                }
                .performance-low #particles-js {
                    display: none;
                }
                .performance-low .decorative-particles {
                    display: none;
                }
            `;
        } else if (this.performanceLevel === 'medium') {
            // 中等性能设备：适度优化
            css += `
                .performance-medium .rose {
                    animation-duration: 25s !important;
                }
                .performance-medium #particles-js canvas {
                    opacity: 0.7;
                }
            `;
        }
        
        if (this.isMobile) {
            css += `
                .mobile-device .rose {
                    width: 120px !important;
                    height: 120px !important;
                }
                .mobile-device .petal {
                    width: 35px !important;
                    height: 50px !important;
                }
                .mobile-device .main-title {
                    font-size: 2rem !important;
                }
                .mobile-device .subtitle {
                    font-size: 1rem !important;
                }
                .mobile-device .message-text {
                    font-size: 1rem !important;
                }
            `;
        }
        
        // 触摸设备样式
        if (this.touchDevice) {
            css += `
                .touch-device .control-btn {
                    min-height: 44px;
                    min-width: 44px;
                    font-size: 1rem;
                }
                .touch-device .touch-active {
                    transform: scale(0.95);
                    opacity: 0.8;
                    transition: all 0.1s ease;
                }
                .touch-device .rose-container:hover {
                    transform: none;
                }
                .touch-device .rose-container.touch-active {
                    transform: scale(1.05);
                }
            `;
        }
        
        style.textContent = css;
        document.head.appendChild(style);
    }

    // 处理屏幕方向变化
    setupOrientationHandling() {
        const handleOrientationChange = () => {
            // 延迟处理，等待方向变化完成
            setTimeout(() => {
                this.adjustForOrientation();
                // 重新计算粒子系统
                if (window.pJSDom && window.pJSDom[0]) {
                    window.pJSDom[0].pJS.fn.canvasSize();
                }
            }, 100);
        };
        
        window.addEventListener('orientationchange', handleOrientationChange);
        window.addEventListener('resize', handleOrientationChange);
    }

    // 根据方向调整布局
    adjustForOrientation() {
        const isLandscape = window.innerWidth > window.innerHeight;
        const body = document.body;
        
        if (isLandscape && this.isMobile) {
            body.classList.add('landscape-mobile');
            body.classList.remove('portrait-mobile');
        } else if (this.isMobile) {
            body.classList.add('portrait-mobile');
            body.classList.remove('landscape-mobile');
        }
    }

    // 防止缩放
    preventZoom() {
        if (!this.isMobile) return;
        
        // 防止双指缩放
        document.addEventListener('gesturestart', (e) => {
            e.preventDefault();
        });
        
        document.addEventListener('gesturechange', (e) => {
            e.preventDefault();
        });
        
        document.addEventListener('gestureend', (e) => {
            e.preventDefault();
        });
    }

    // 优化资源加载
    optimizeResourceLoading() {
        // 预加载关键资源
        const preloadLinks = [
            'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Noto+Sans+SC:wght@300;400;700&display=swap',
            'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js'
        ];
        
        preloadLinks.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = href.includes('.css') ? 'style' : 'script';
            link.href = href;
            document.head.appendChild(link);
        });
        
        // 懒加载非关键资源
        if (this.performanceLevel === 'low') {
            this.lazyLoadParticles();
        }
    }

    // 懒加载粒子系统
    lazyLoadParticles() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (window.particleEffects) {
                        window.particleEffects.init();
                    }
                    observer.disconnect();
                }
            });
        });
        
        const target = document.querySelector('.rose-container');
        if (target) {
            observer.observe(target);
        }
    }

    // 获取设备信息
    getDeviceInfo() {
        return {
            isMobile: this.isMobile,
            isTablet: this.isTablet,
            touchDevice: this.touchDevice,
            performanceLevel: this.performanceLevel,
            screenSize: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            pixelRatio: window.devicePixelRatio || 1
        };
    }
}

// 导出移动端优化器
window.MobileOptimizer = MobileOptimizer;
