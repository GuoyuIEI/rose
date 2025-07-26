// 粒子系统配置
const particlesConfig = {
    "particles": {
        "number": {
            "value": 80,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": ["#ff6b6b", "#feca57", "#48dbfb", "#ff9ff3", "#ffffff"]
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            }
        },
        "opacity": {
            "value": 0.6,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 2,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.2,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 2,
            "direction": "none",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": true,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "grab"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 140,
                "line_linked": {
                    "opacity": 0.5
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
};

// 初始化粒子系统
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', particlesConfig);
    }
}

// 创建装饰性粒子
function createDecorativeParticles() {
    const container = document.createElement('div');
    container.className = 'decorative-particles';
    document.body.appendChild(container);

    // 创建爱心粒子
    function createHeartParticle() {
        const heart = document.createElement('div');
        heart.className = 'heart-particle';
        heart.innerHTML = ['💖', '💕', '💝', '❤️'][Math.floor(Math.random() * 4)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 8 + 's';
        container.appendChild(heart);

        // 移除粒子
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 8000);
    }

    // 创建星星粒子
    function createStarParticle() {
        const star = document.createElement('div');
        star.className = 'star-particle';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        container.appendChild(star);

        // 移除粒子
        setTimeout(() => {
            if (star.parentNode) {
                star.parentNode.removeChild(star);
            }
        }, 3000);
    }

    // 创建光点粒子
    function createLightParticle() {
        const light = document.createElement('div');
        light.className = 'light-particle';
        light.style.left = Math.random() * 100 + '%';
        light.style.top = Math.random() * 100 + '%';
        light.style.animationDelay = Math.random() * 6 + 's';
        container.appendChild(light);

        // 移除粒子
        setTimeout(() => {
            if (light.parentNode) {
                light.parentNode.removeChild(light);
            }
        }, 6000);
    }

    // 创建魔法粒子
    function createMagicParticle() {
        const magic = document.createElement('div');
        magic.className = 'magic-particle';
        magic.style.left = Math.random() * 100 + '%';
        magic.style.top = Math.random() * 100 + '%';
        magic.style.animationDelay = Math.random() * 4 + 's';
        container.appendChild(magic);

        // 移除粒子
        setTimeout(() => {
            if (magic.parentNode) {
                magic.parentNode.removeChild(magic);
            }
        }, 4000);
    }

    // 定期创建粒子
    setInterval(createHeartParticle, 2000);
    setInterval(createStarParticle, 1000);
    setInterval(createLightParticle, 1500);
    setInterval(createMagicParticle, 3000);
}

// 创建烟花效果
function createFirework(x, y) {
    const colors = ['firework-red', 'firework-gold', 'firework-blue', 'firework-pink'];
    const particleCount = 12;

    for (let i = 0; i < particleCount; i++) {
        const firework = document.createElement('div');
        firework.className = `firework ${colors[Math.floor(Math.random() * colors.length)]}`;
        
        const angle = (i / particleCount) * 2 * Math.PI;
        const distance = 50 + Math.random() * 100;
        const finalX = x + Math.cos(angle) * distance;
        const finalY = y + Math.sin(angle) * distance;
        
        firework.style.left = x + 'px';
        firework.style.top = y + 'px';
        
        document.body.appendChild(firework);
        
        // 动画到最终位置
        setTimeout(() => {
            firework.style.transform = `translate(${finalX - x}px, ${finalY - y}px)`;
        }, 10);
        
        // 移除烟花
        setTimeout(() => {
            if (firework.parentNode) {
                firework.parentNode.removeChild(firework);
            }
        }, 2000);
    }
}

// 惊喜模式
function activateSurpriseMode() {
    const container = document.querySelector('.decorative-particles');
    if (container) {
        container.classList.add('surprise-mode');
        
        // 创建多个烟花
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                createFirework(x, y);
            }, i * 300);
        }
        
        // 5秒后退出惊喜模式
        setTimeout(() => {
            container.classList.remove('surprise-mode');
        }, 5000);
    }
}

// 导出函数供其他脚本使用
window.particleEffects = {
    init: initParticles,
    createDecorative: createDecorativeParticles,
    createFirework: createFirework,
    activateSurprise: activateSurpriseMode
};
