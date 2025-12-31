/* ================================
   Live2D Widget Configuration
   Dark Future Theme
================================ */

// Live2D Widget Configuration
const live2d_settings = {
    // Model CDN
    cdnPath: "https://fastly.jsdelivr.net/gh/fghrsh/live2d_api/",
    
    // Screen
    waifuSize: 280,
    waifuTipsSize: 250,
    waifuFontSize: 12,
    waifuToolFont: 14,
    waifuToolLine: 20,
    waifuToolTop: 0,
    waifuMinWidth: "768px",
    waifuEdgeSide: "left:30",
    
    // Messages
    waifuDraggable: "unlimited",
    waifuDraggableRevert: false,
    
    // Model
    modelId: 1,
    modelTexturesId: 53,
    
    // Tool
    showToolMenu: true,
    canCloseLive2d: true,
    canSwitchModel: true,
    canSwitchTextures: true,
    canSwitchHitokoto: true,
    canTakeScreenshot: true,
    canTurnToHomePage: false,
    canTurnToAboutPage: true,
    
    // Homepage
    homePageUrl: "https://fader2077.github.io",
    aboutPageUrl: "https://github.com/fader2077",
    
    // Tips
    showHitokoto: true,
    showF12Status: true,
    showF12Message: "你想看看我的程式碼嗎？",
    showF12OpenMsg: "開發者模式啟動！",
    showCopyMessage: "你複製了什麼呢？記得標註來源喔~",
    showWelcomeMessage: true,
    
    // Welcome Messages
    welcomeMessage: [
        "歡迎來到我的網站！",
        "嗨！很高興見到你~",
        "一起探索 AI 的奧秘吧！",
        "今天也要元氣滿滿哦~"
    ],
    
    // 24hr Messages
    hour_tips: {
        "t5-7": "早安！一日之計在於晨~",
        "t7-11": "上午好！今天也要加油哦！",
        "t11-13": "中午了，該吃飯休息一下了~",
        "t13-17": "下午好！專注研究的時間到了！",
        "t17-19": "傍晚了，該放鬆一下了~",
        "t19-21": "晚上好！研究時間~",
        "t21-23": "夜深了，注意休息哦~",
        "t23-5": "這麼晚還不睡嗎？早點休息吧！"
    },
    
    // Click Messages
    click_tips: [
        "不要戳我啦！會壞掉的！",
        "幹嘛戳我？",
        "想知道更多關於 AI 研究的事嗎？",
        "點擊左邊的選單探索更多內容吧~",
        "Deep Learning is fun!",
        "Transformer is all you need!"
    ]
};

// Live2D Widget CSS Override for Dark Theme
const live2dStyle = document.createElement('style');
live2dStyle.textContent = `
    #waifu {
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 998;
        font-size: 0;
        transition: all 0.3s ease-in-out;
        transform: translateY(3px);
    }
    
    #waifu:hover {
        transform: translateY(0);
    }
    
    /* 對話氣泡框設定 */
    #waifu-tips {
        position: absolute;
        top: -70px; /* 修改：往上移，原本是 -40px */
        left: 50%;
        transform: translateX(-50%);
        width: 250px;
        min-height: 50px; /* 修改：稍微縮小高度 */
        padding: 10px 15px;
        background: rgba(15, 23, 42, 0.85) !important; /* 修改：稍微透明一點 */
        backdrop-filter: blur(8px);
        border: 1px solid rgba(99, 102, 241, 0.4) !important;
        border-radius: 12px !important;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        font-size: 13px;
        line-height: 1.5;
        color: #e2e8f0 !important;
        word-break: break-all;
        text-overflow: ellipsis;
        animation: shake 50s ease-in-out 5s infinite;
        z-index: 999;
        pointer-events: none; /* 修改：讓滑鼠可以穿透對話框點擊後面 */
        opacity: 0; /* 預設隱藏 */
        transition: opacity 0.2s;
    }
    
    #waifu-tips.waifu-tips-active {
        opacity: 1;
        pointer-events: auto;
    }
    
    /* 對話框下方的小箭頭 */
    #waifu-tips::before {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-top: 8px solid rgba(15, 23, 42, 0.85); /* 配合背景色 */
    }
    
    #waifu canvas {
        pointer-events: auto;
    }
    
    /* 工具列設定 (側邊的小按鈕) */
    #waifu-tool {
        display: flex;
        flex-direction: column;
        position: absolute;
        right: -35px; /* 修改：改到右側顯示，原本是 left: -35px */
        top: 50%;
        transform: translateY(-50%);
        background: rgba(15, 23, 42, 0.8);
        backdrop-filter: blur(5px);
        border: 1px solid rgba(99, 102, 241, 0.3);
        border-radius: 0 8px 8px 0;
        padding: 8px 4px;
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: auto;
    }
    
    /* 滑鼠移上去才顯示工具列 */
    #waifu:hover #waifu-tool {
        opacity: 1;
    }
    
    #waifu-tool span {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        margin: 4px 0;
        cursor: pointer;
        color: #94a3b8;
        border-radius: 6px;
        transition: all 0.2s ease;
    }
    
    #waifu-tool span:hover {
        background: rgba(99, 102, 241, 0.3);
        color: #a5b4fc;
    }
    
    @keyframes shake {
        2% { transform: translateX(-50%) translate(0.5px, -1.5px) rotate(-0.5deg); }
        4% { transform: translateX(-50%) translate(0.5px, 1.5px) rotate(1.5deg); }
        6% { transform: translateX(-50%) translate(1.5px, 1.5px) rotate(1.5deg); }
        8% { transform: translateX(-50%) translate(2.5px, 1.5px) rotate(0.5deg); }
        10% { transform: translateX(-50%) translate(0.5px, 2.5px) rotate(0.5deg); }
        12% { transform: translateX(-50%) translate(1.5px, 1.5px) rotate(0.5deg); }
        14% { transform: translateX(-50%) translate(0.5px, 0.5px) rotate(0.5deg); }
        16% { transform: translateX(-50%) translate(-1.5px, -0.5px) rotate(1.5deg); }
        18% { transform: translateX(-50%) translate(0.5px, 0.5px) rotate(1.5deg); }
        20% { transform: translateX(-50%) translate(2.5px, 2.5px) rotate(1.5deg); }
        22% { transform: translateX(-50%) translate(0.5px, -1.5px) rotate(1.5deg); }
        24% { transform: translateX(-50%) translate(-1.5px, 1.5px) rotate(-0.5deg); }
        26% { transform: translateX(-50%) translate(1.5px, 0.5px) rotate(1.5deg); }
        28% { transform: translateX(-50%) translate(-0.5px, -0.5px) rotate(-0.5deg); }
        30% { transform: translateX(-50%) translate(1.5px, -0.5px) rotate(-0.5deg); }
        32% { transform: translateX(-50%) translate(2.5px, -1.5px) rotate(1.5deg); }
        34% { transform: translateX(-50%) translate(2.5px, 2.5px) rotate(-0.5deg); }
        36% { transform: translateX(-50%) translate(0.5px, -1.5px) rotate(0.5deg); }
        38% { transform: translateX(-50%) translate(2.5px, -0.5px) rotate(-0.5deg); }
        40% { transform: translateX(-50%) translate(-0.5px, 2.5px) rotate(0.5deg); }
        42% { transform: translateX(-50%) translate(-1.5px, 2.5px) rotate(0.5deg); }
        44% { transform: translateX(-50%) translate(-1.5px, 1.5px) rotate(0.5deg); }
        46% { transform: translateX(-50%) translate(1.5px, -0.5px) rotate(-0.5deg); }
        48% { transform: translateX(-50%) translate(2.5px, -0.5px) rotate(0.5deg); }
        50% { transform: translateX(-50%) translate(-1.5px, 1.5px) rotate(0.5deg); }
        52% { transform: translateX(-50%) translate(-0.5px, 1.5px) rotate(0.5deg); }
        54% { transform: translateX(-50%) translate(-1.5px, 1.5px) rotate(0.5deg); }
        56% { transform: translateX(-50%) translate(0.5px, 2.5px) rotate(1.5deg); }
        58% { transform: translateX(-50%) translate(2.5px, 2.5px) rotate(0.5deg); }
        60% { transform: translateX(-50%) translate(2.5px, -1.5px) rotate(1.5deg); }
        62% { transform: translateX(-50%) translate(-1.5px, 0.5px) rotate(1.5deg); }
        64% { transform: translateX(-50%) translate(-1.5px, 1.5px) rotate(1.5deg); }
        66% { transform: translateX(-50%) translate(0.5px, 2.5px) rotate(1.5deg); }
        68% { transform: translateX(-50%) translate(2.5px, -1.5px) rotate(1.5deg); }
        70% { transform: translateX(-50%) translate(2.5px, 2.5px) rotate(0.5deg); }
        72% { transform: translateX(-50%) translate(-0.5px, -1.5px) rotate(1.5deg); }
        74% { transform: translateX(-50%) translate(-1.5px, 2.5px) rotate(1.5deg); }
        76% { transform: translateX(-50%) translate(-1.5px, 2.5px) rotate(1.5deg); }
        78% { transform: translateX(-50%) translate(-1.5px, 2.5px) rotate(0.5deg); }
        80% { transform: translateX(-50%) translate(-1.5px, 0.5px) rotate(-0.5deg); }
        82% { transform: translateX(-50%) translate(-1.5px, 0.5px) rotate(-0.5deg); }
        84% { transform: translateX(-50%) translate(-0.5px, 0.5px) rotate(1.5deg); }
        86% { transform: translateX(-50%) translate(2.5px, 1.5px) rotate(0.5deg); }
        88% { transform: translateX(-50%) translate(-1.5px, 0.5px) rotate(1.5deg); }
        90% { transform: translateX(-50%) translate(-1.5px, -0.5px) rotate(-0.5deg); }
        92% { transform: translateX(-50%) translate(-1.5px, -1.5px) rotate(1.5deg); }
        94% { transform: translateX(-50%) translate(0.5px, 0.5px) rotate(-0.5deg); }
        96% { transform: translateX(-50%) translate(2.5px, -0.5px) rotate(-0.5deg); }
        98% { transform: translateX(-50%) translate(-1.5px, -1.5px) rotate(-0.5deg); }
        0%, 100% { transform: translateX(-50%) translate(0, 0) rotate(0deg); }
    }
`;

document.head.appendChild(live2dStyle);
