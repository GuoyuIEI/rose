// 消息动画控制
class MessageAnimation {
    constructor() {
        this.messageElement = document.getElementById('message-text');
        this.messages = [
            "亲爱的，今天是你的生日 🎂",
            "愿这朵玫瑰花代表我对你的爱 🌹",
            "你是我生命中最美的礼物 💝",
            "每一天和你在一起都是最好的时光 ✨",
            "愿你的笑容永远如花般绽放 😊",
            "生日快乐，我的挚爱 💖",
            "愿所有的美好都属于你 🌟",
            "你让我的世界充满色彩 🌈"
        ];
        this.currentMessageIndex = 0;
        this.isTyping = false;
        this.init();
    }

    init() {
        this.startMessageCycle();
    }

    // 开始消息循环
    startMessageCycle() {
        // 初始延迟
        setTimeout(() => {
            this.typeMessage(this.messages[0]);
        }, 2000);
    }

    // 打字机效果
    typeMessage(message, callback) {
        if (this.isTyping) return;
        
        this.isTyping = true;
        this.messageElement.textContent = '';
        
        let index = 0;
        const typeInterval = setInterval(() => {
            if (index < message.length) {
                this.messageElement.textContent += message[index];
                index++;
            } else {
                clearInterval(typeInterval);
                this.isTyping = false;
                
                // 显示完成后的回调
                if (callback) {
                    setTimeout(callback, 1000);
                }
                
                // 自动切换到下一条消息
                setTimeout(() => {
                    this.nextMessage();
                }, 4000);
            }
        }, 100);
    }

    // 下一条消息
    nextMessage() {
        if (this.isTyping) return;
        
        // 淡出效果
        this.messageElement.style.opacity = '0';
        
        setTimeout(() => {
            this.currentMessageIndex = (this.currentMessageIndex + 1) % this.messages.length;
            this.typeMessage(this.messages[this.currentMessageIndex], () => {
                // 淡入效果
                this.messageElement.style.opacity = '1';
            });
        }, 500);
    }

    // 显示特定消息
    showMessage(message, temporary = false) {
        if (this.isTyping) return;
        
        const originalMessage = this.messageElement.textContent;
        
        this.messageElement.style.opacity = '0';
        setTimeout(() => {
            this.typeMessage(message, () => {
                this.messageElement.style.opacity = '1';
                
                // 如果是临时消息，恢复原消息
                if (temporary) {
                    setTimeout(() => {
                        this.messageElement.style.opacity = '0';
                        setTimeout(() => {
                            this.messageElement.textContent = originalMessage;
                            this.messageElement.style.opacity = '1';
                        }, 500);
                    }, 3000);
                }
            });
        }, 500);
    }

    // 惊喜消息
    showSurpriseMessage() {
        const surpriseMessages = [
            "🎉 惊喜！你是我心中永远的女王！ 👑",
            "✨ 愿这份爱意如星辰般永恒闪耀 ⭐",
            "🌹 每一朵玫瑰都诉说着我的爱意 💕",
            "🎂 生日快乐，我的宝贝！ 💖"
        ];
        
        const randomMessage = surpriseMessages[Math.floor(Math.random() * surpriseMessages.length)];
        this.showMessage(randomMessage, true);
        
        // 添加特殊效果
        this.addMessageSparkle();
    }

    // 添加消息闪烁效果
    addMessageSparkle() {
        const messageBox = document.querySelector('.message-box');
        if (messageBox) {
            messageBox.style.animation = 'messageSparkle 2s ease-out';
            
            setTimeout(() => {
                messageBox.style.animation = '';
            }, 2000);
        }
    }

    // 暂停消息循环
    pauseMessageCycle() {
        this.isTyping = true;
    }

    // 恢复消息循环
    resumeMessageCycle() {
        this.isTyping = false;
        setTimeout(() => {
            this.nextMessage();
        }, 1000);
    }

    // 设置自定义消息列表
    setMessages(newMessages) {
        this.messages = newMessages;
        this.currentMessageIndex = 0;
    }

    // 添加单条消息
    addMessage(message) {
        this.messages.push(message);
    }

    // 获取当前消息
    getCurrentMessage() {
        return this.messages[this.currentMessageIndex];
    }
}

// 添加消息特效的CSS
const messageStyle = document.createElement('style');
messageStyle.textContent = `
    @keyframes messageSparkle {
        0%, 100% {
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            transform: scale(1);
        }
        25% {
            box-shadow: 0 8px 32px rgba(255, 215, 0, 0.3);
            transform: scale(1.02);
        }
        50% {
            box-shadow: 0 8px 32px rgba(255, 105, 180, 0.3);
            transform: scale(1.05);
        }
        75% {
            box-shadow: 0 8px 32px rgba(72, 219, 251, 0.3);
            transform: scale(1.02);
        }
    }
    
    .message-text {
        transition: opacity 0.5s ease-in-out;
    }
    
    .message-box {
        transition: all 0.3s ease;
    }
    
    .message-box:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    }
    
    /* 打字光标效果 */
    .typing-cursor::after {
        content: '|';
        animation: blink 1s infinite;
        color: rgba(255, 255, 255, 0.8);
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
`;
document.head.appendChild(messageStyle);

// 导出消息动画类
window.MessageAnimation = MessageAnimation;
