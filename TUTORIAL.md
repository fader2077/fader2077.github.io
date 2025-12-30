# 📚 GitHub Pages 網站修改與發佈教學

> 一步步學會如何修改個人網站、新增內容、插入圖片、並推送到 GitHub Pages

---

## 目錄
1. [前置準備](#前置準備)
2. [在本機 (localhost) 執行網站](#在本機-localhost-執行網站)
3. [網站結構說明](#網站結構說明)
4. [修改網頁檔案](#修改網頁檔案)
5. [新增與插入圖片](#新增與插入圖片)
6. [使用 Git 推送更新](#使用-git-推送更新)
7. [常見問題](#常見問題)
8. [快速參考](#快速參考)

---

## 前置準備

### 必要工具
- **Git** - 版本控制系統（[下載](https://git-scm.com/download/win)）
- **VS Code** - 程式碼編輯器（[下載](https://code.visualstudio.com/)）
- **GitHub 帳號** - 用於管理倉庫（[註冊](https://github.com/signup)）
- **Node.js** (可選) - 用於本機伺服器（[下載](https://nodejs.org/)）
- **Python** (可選) - 用於本機伺服器（[下載](https://www.python.org/downloads/)）

### 確認環境
在 PowerShell 或 Terminal 中輸入以下命令確認安裝：

```bash
# 檢查 Git 版本
git --version

# 檢查 Git 設定
git config --global user.name
git config --global user.email

# 檢查 Node.js 版本 (可選)
node --version

# 檢查 Python 版本 (可選)
python --version
```

### 首次 Git 設定（如果還沒做過）
```bash
# 設定全域 Git 使用者名稱
git config --global user.name "你的名字"

# 設定全域 Git 電子郵件
git config --global user.email "你的email@example.com"
```

---

## 在本機 (localhost) 執行網站

在修改網站之前，建議先在本機啟動伺服器預覽效果。以下提供多種方式：

### 🚀 方式 1：使用 VS Code Live Server 擴充套件（最推薦）

這是最簡單的方式，適合初學者。

#### 步驟 1：安裝 Live Server 擴充套件
```
1. 開啟 VS Code
2. 按 Ctrl + Shift + X 開啟擴充套件面板
3. 搜尋 "Live Server"
4. 找到 Ritwick Dey 開發的 "Live Server"
5. 點擊 "Install" 安裝
```

#### 步驟 2：啟動本機伺服器
```
1. 用 VS Code 開啟專案資料夾
2. 在左側檔案列表中找到 index.html
3. 右鍵點擊 index.html
4. 選擇 "Open with Live Server"
5. 瀏覽器會自動開啟 http://127.0.0.1:5500
```

#### 優點
- ✅ 自動重新整理：修改檔案後自動更新瀏覽器
- ✅ 不需要命令列操作
- ✅ 一鍵啟動

### 🐍 方式 2：使用 Python 內建伺服器

如果你已經安裝了 Python，這是最快的方式。

#### 在 PowerShell 中執行：
```powershell
# 進入專案目錄
cd "c:\Users\jiexi\Desktop\webme\fader2077.github.io\fader2077.github.io"

# Python 3.x
python -m http.server 8080

# 或者 Python 2.x (較舊版本)
python -m SimpleHTTPServer 8080
```

#### 開啟瀏覽器訪問：
```
http://localhost:8080
```

#### 停止伺服器
按 `Ctrl + C` 停止伺服器

### 📦 方式 3：使用 Node.js http-server

如果你已經安裝了 Node.js。

#### 安裝 http-server（只需執行一次）
```powershell
npm install -g http-server
```

#### 啟動伺服器
```powershell
# 進入專案目錄
cd "c:\Users\jiexi\Desktop\webme\fader2077.github.io\fader2077.github.io"

# 啟動伺服器
http-server -p 8080

# 或者啟用快取禁用（開發時推薦）
http-server -p 8080 -c-1
```

#### 開啟瀏覽器訪問：
```
http://localhost:8080
```

### 🎯 方式 4：使用 npx serve（無需安裝）

如果你有 Node.js 但不想全域安裝套件。

```powershell
# 進入專案目錄
cd "c:\Users\jiexi\Desktop\webme\fader2077.github.io\fader2077.github.io"

# 使用 npx 直接執行
npx serve -p 8080
```

### 📋 本機伺服器比較表

| 方式 | 需要安裝 | 自動重新整理 | 難度 |
|------|----------|--------------|------|
| VS Code Live Server | VS Code 擴充套件 | ✅ 是 | ⭐ 最簡單 |
| Python http.server | Python | ❌ 否 | ⭐⭐ 簡單 |
| Node.js http-server | Node.js + 套件 | ❌ 否 | ⭐⭐ 簡單 |
| npx serve | Node.js | ❌ 否 | ⭐⭐ 簡單 |

### 🔍 本機測試完整流程

```powershell
# 1. 開啟 PowerShell 或 Terminal

# 2. 進入專案目錄
cd "c:\Users\jiexi\Desktop\webme\fader2077.github.io\fader2077.github.io"

# 3. 選擇以下任一方式啟動伺服器：

# 方式 A: Python
python -m http.server 8080

# 方式 B: Node.js (需先安裝 http-server)
http-server -p 8080

# 方式 C: npx (需有 Node.js)
npx serve -p 8080

# 4. 開啟瀏覽器訪問
# http://localhost:8080

# 5. 測試三個分頁：
# - http://localhost:8080/index.html (About 頁面)
# - http://localhost:8080/publications.html (Publications 頁面)
# - http://localhost:8080/projects.html (Projects 頁面)

# 6. 修改檔案後重新整理瀏覽器查看效果
# 按 F5 或 Ctrl + R 重新整理

# 7. 完成後按 Ctrl + C 停止伺服器
```

---

## 網站結構說明

本網站由三個主要分頁組成：

### 🗂️ 分頁結構

| 分頁 | 檔案 | 說明 |
|------|------|------|
| **About** | `index.html` | 首頁，包含個人介紹、教育背景、研究興趣、技能等 |
| **Publications** | `publications.html` | 論文發表頁面，點擊卡片可查看論文詳情 |
| **Projects** | `projects.html` | 專案展示頁面，點擊卡片可查看專案詳情 |

### 📁 完整專案檔案結構
```
fader2077.github.io/
├── index.html              # About 主頁面
├── publications.html       # Publications 論文頁面
├── projects.html           # Projects 專案頁面
├── README.md               # 專案說明
├── TUTORIAL.md             # 本教學檔案
├── intro.md                # 原始個人資料
└── assets/
    ├── css/
    │   ├── style.css       # 主要樣式表
    │   └── pages.css       # 分頁專用樣式
    ├── js/
    │   ├── main.js         # 主要 JavaScript
    │   ├── pages.js        # 分頁互動功能 (Modal)
    │   └── live2d-config.js # Live2D 配置
    └── img/                # 圖片資料夾
        └── (在此放置圖片)
```

### 🎯 互動功能說明

#### Projects 頁面
- **卡片滑鼠懸停效果**：滑鼠移到專案卡片上會顯示「查看詳情」按鈕
- **點擊展開詳情**：點擊卡片會彈出 Modal 視窗，顯示：
  - 專案概述
  - 研究目標
  - 技術實現
  - 研究成果
  - 相關連結

#### Publications 頁面
- **依年份分類**：論文按發表年份分組顯示
- **卡片滑鼠懸停效果**：滑鼠移到論文卡片上會有動畫效果
- **點擊展開詳情**：點擊卡片會彈出 Modal 視窗，顯示：
  - 論文作者
  - 發表期刊/研討會
  - 論文摘要
  - 關鍵字
  - 下載/引用連結

---

## 修改網頁檔案

### 🛠️ 可自訂部分總覽

本網站提供多處可自訂的部分，讓您輕鬆打造個人化網站：

| 類別 | 檔案位置 | 可修改項目 |
|------|----------|-----------|
| **個人資訊** | `index.html` | 姓名、介紹、教育背景、聯繫方式 |
| **研究內容** | `index.html` | 研究興趣、技能、專案介紹 |
| **論文列表** | `publications.html` | 論文標題、作者、摘要 |
| **專案展示** | `projects.html` | 專案卡片、詳情 Modal |
| **網站配色** | `assets/css/style.css` | 顏色變數、主題色 |
| **看板娘** | `assets/js/live2d-config.js` | 模型、對話內容、位置 |
| **動畫效果** | `assets/js/main.js` | 互動效果、動畫 |

---

### 1️⃣ 使用 VS Code 開啟專案

```bash
# 進入專案目錄
cd "c:\Users\jiexi\Desktop\webme\fader2077.github.io\fader2077.github.io"

# 用 VS Code 開啟
code .
```

**VS Code 使用技巧**：
- 按 `Ctrl + P` 快速開啟檔案
- 按 `Ctrl + F` 在檔案中搜尋
- 按 `Ctrl + Shift + F` 在整個專案中搜尋
- 按 `Ctrl + /` 快速註解/取消註解

---

### 2️⃣ 修改個人資訊 (index.html)

#### 修改名字和介紹

在 `index.html` 中找到以下區塊：

```html
<!-- 找到這段 -->
<h1 class="hero-title">
    Hi, I'm <span class="gradient-text">Jie-Xiang Li</span>
</h1>
<p class="hero-description">PhD Candidate | Machine Learning Researcher</p>

<!-- 改成你自己的 -->
<h1 class="hero-title">
    Hi, I'm <span class="gradient-text">你的名字</span>
</h1>
<p class="hero-description">你的職稱 | 你的專業領域</p>
```

#### 修改教育背景

```html
<!-- 找到教育區塊 -->
<h3>National Taiwan University (NTU)</h3>
<p class="card-role">PhD in Computer Science</p>
<p class="card-date">2022 - Present</p>

<!-- 改成你的教育背景 -->
<h3>你的學校</h3>
<p class="card-role">你的學位</p>
<p class="card-date">你的就學時間</p>
```

---

## 🎨 Live2D 看板娘自訂設定

看板娘是網站的互動特色，所有設定都在 `assets/js/live2d-config.js` 檔案中。

### 📍 修改看板娘位置和大小

找到 `live2d_settings` 物件：

```javascript
const live2d_settings = {
    modelId: 1,                    // 模型編號
    modelTexturesId: 53,           // 材質編號
    waifuSize: 280,                // 看板娘大小（單位：像素）
    waifuTipsSize: "250x70",       // 對話框大小
    waifuFontSize: "12px",         // 字體大小
    waifuToolFont: "14px",         // 工具欄字體
    waifuToolLine: "20px",         // 工具欄行高
    waifuToolTop: "0px",           // 工具欄頂部距離
    waifuMinWidth: "768px",        // 最小顯示寬度
    homePageUrl: "auto",           // 首頁網址
    aboutPageUrl: "",              // 關於頁網址
    screenshotCaptureName: "screenshot.png",  // 截圖檔名
    modelStorage: false,           // 是否儲存模型選擇
    modelRandMode: "rand",         // 隨機模式
    modelTexturesRandMode: "rand", // 材質隨機模式
    showToolMenu: true,            // 顯示工具選單
    canCloseLive2d: true,          // 可關閉看板娘
    canSwitchModel: true,          // 可切換模型
    canSwitchTextures: true,       // 可切換材質
    canSwitchHitokoto: true,       // 可切換一言
    canTakeScreenshot: true,       // 可截圖
    canTurnToHomePage: true,       // 可回首頁
    canTurnToAboutPage: false,     // 可去關於頁
    showHitokoto: true,            // 顯示一言
    showF12Status: true,           // 顯示 F12 狀態
    showF12Message: true,          // 顯示 F12 訊息
    showF12OpenMsg: true,          // 顯示開啟 F12 訊息
    showCopyMessage: true,         // 顯示複製訊息
    showWelcomeMessage: true       // 顯示歡迎訊息
};
```

#### 常用修改範例

**🔧 改變看板娘位置**
```javascript
// 在檔案最下方找到 CSS 設定
'#waifu': {
    'position': 'fixed',
    'bottom': '0',
    'left': '30px',    // 改這裡！左側距離
    'z-index': '999'
}
```

位置選項：
- 左下角：`'left': '30px'`
- 右下角：`'right': '30px'` (需刪除 left 改用 right)
- 中間偏左：`'left': '100px'`

**🔧 改變看板娘大小**
```javascript
waifuSize: 280,  // 預設 280px

// 改成其他大小：
waifuSize: 200,  // 較小
waifuSize: 350,  // 較大
```

### 💬 修改看板娘對話內容

#### 1. 歡迎訊息 (Welcome Messages)

找到 `welcomeMessage` 陣列：

```javascript
const welcomeMessage = [
    "歡迎來到我的個人網站！",
    "很高興見到你呢！",
    "今天也要加油哦！",
    "讓我們一起探索這個網站吧～"
];
```

**新增更多歡迎詞**：
```javascript
const welcomeMessage = [
    "歡迎光臨！😊",
    "嗨！有什麼我能幫忙的嗎？",
    "很高興認識你！",
    "今天過得好嗎？",
    "一起來看看有什麼有趣的吧！",
    "你的到來讓我很開心呢～"
];
```

#### 2. 時間問候語 (Hour Tips)

看板娘會根據不同時段顯示不同問候：

```javascript
const hour_tips = {
    "t5-7": "早上好！一日之計在於晨，美好的一天就要開始了。",
    "t7-11": "上午好！工作順利嗎？不要久坐，多起來走動走動哦！",
    "t11-13": "中午了，工作了一個上午，現在是午餐時間！",
    "t13-17": "午後很容易犯困呢，今天的運動目標完成了嗎？",
    "t17-19": "傍晚了！窗外夕陽的景色很美麗呢，最美不過夕陽紅～",
    "t19-21": "晚上好，今天過得怎麼樣？",
    "t21-23": ["已經這麼晚了呀，早點休息吧，晚安～", "深夜時要愛護眼睛呀！"],
    "t23-5": ["你是夜貓子呀？這麼晚還不睡覺，明天起得來嗎？", "少熬夜，我在這裡等著你呢！"]
};
```

**自訂你的時段問候**：
```javascript
const hour_tips = {
    "t5-7": "☀️ 早安！新的一天開始囉～",
    "t7-11": "💪 上午好！記得喝水休息哦！",
    "t11-13": "🍱 該吃午餐了！要吃什麼呢？",
    "t13-17": "☕ 下午茶時間～要不要休息一下？",
    "t17-19": "🌆 傍晚了，辛苦一天了！",
    "t19-21": "🌙 晚上好！今天有什麼收穫嗎？",
    "t21-23": "😴 該準備睡覺囉～晚安！",
    "t23-5": "🦉 這麼晚還不睡？小心身體哦～"
};
```

#### 3. 點擊對話 (Click Tips)

當使用者點擊看板娘時的互動對話：

```javascript
const click_tips = [
    "你要摸哪裡呢？",
    "不要亂摸啦～",
    "喵～",
    "再摸的話我可要生氣了哦！",
    "討厭啦～",
    "嘿嘿～"
];
```

**改成你喜歡的反應**：
```javascript
const click_tips = [
    "嘿！你點我了！👀",
    "有什麼事嗎？😊",
    "再點一下試試看～",
    "我很忙的欸！😤",
    "哈哈哈～好癢！",
    "不要一直戳我啦～",
    "要和我玩嗎？🎮",
    "點我幹嘛～",
    "我不是按鈕啦！"
];
```

#### 4. 滑鼠懸停提示 (Mouseover Messages)

找到 `mouseover_tips` 陣列：

```javascript
const mouseover_tips = [
    {
        "selector": ".hero-title",
        "texts": ["這是我的名字～", "你好呀！"]
    },
    {
        "selector": ".research-interests",
        "texts": ["這些是我的研究興趣哦！", "看起來很有趣吧？"]
    },
    {
        "selector": ".nav-link",
        "texts": ["點擊可以切換頁面哦～", "想去哪裡看看？"]
    }
];
```

**新增自訂提示**：
```javascript
const mouseover_tips = [
    {
        "selector": ".hero-title",
        "texts": ["這就是我啦～", "很高興認識你！"]
    },
    {
        "selector": ".education-section",
        "texts": ["這是我的學歷背景", "努力學習中！"]
    },
    {
        "selector": ".skills-section",
        "texts": ["看看我會什麼～", "這些是我掌握的技能！"]
    },
    {
        "selector": ".contact-section",
        "texts": ["想和我聯絡嗎？", "歡迎來信交流！"]
    },
    {
        "selector": "a[href='publications.html']",
        "texts": ["去看看我的論文吧！", "這裡有我的研究成果～"]
    },
    {
        "selector": "a[href='projects.html']",
        "texts": ["看看我做過的專案！", "這些專案都很有趣哦～"]
    }
];
```

### 🎨 修改看板娘顏色和樣式

在 `live2d-config.js` 檔案最下方，找到 CSS 樣式設定：

```javascript
'#waifu-tips': {
    'color': '#e0e7ff',              // 文字顏色（淺色）
    'background': 'rgba(30, 41, 59, 0.9)',  // 背景顏色（深色帶透明）
    'border': '1px solid rgba(99, 102, 241, 0.3)',  // 邊框顏色
    'box-shadow': '0 4px 20px rgba(99, 102, 241, 0.15)'  // 陰影效果
}
```

#### 配色方案範例

**🌸 粉紅可愛風**
```javascript
'#waifu-tips': {
    'color': '#fce7f3',
    'background': 'rgba(219, 39, 119, 0.85)',
    'border': '1px solid rgba(236, 72, 153, 0.4)',
    'box-shadow': '0 4px 20px rgba(236, 72, 153, 0.2)'
}
```

**💚 清新綠色風**
```javascript
'#waifu-tips': {
    'color': '#d1fae5',
    'background': 'rgba(16, 185, 129, 0.85)',
    'border': '1px solid rgba(52, 211, 153, 0.4)',
    'box-shadow': '0 4px 20px rgba(52, 211, 153, 0.2)'
}
```

**🔵 經典藍色風**
```javascript
'#waifu-tips': {
    'color': '#dbeafe',
    'background': 'rgba(37, 99, 235, 0.85)',
    'border': '1px solid rgba(59, 130, 246, 0.4)',
    'box-shadow': '0 4px 20px rgba(59, 130, 246, 0.2)'
}
```

---

## 🎨 網站配色主題修改

所有顏色變數都集中在 `assets/css/style.css` 開頭的 `:root` 區塊。

### 🌈 主題色系統

找到 `:root` 區塊：

```css
:root {
    /* 主要顏色 - Slate 系列 (灰階) */
    --slate-950: #020617;
    --slate-900: #0f172a;
    --slate-800: #1e293b;
    --slate-700: #334155;
    --slate-600: #475569;
    --slate-500: #64748b;
    --slate-400: #94a3b8;
    --slate-300: #cbd5e1;
    --slate-200: #e2e8f0;
    --slate-100: #f1f5f9;
    
    /* 強調色 - Indigo 系列 (藍紫) */
    --indigo-600: #4f46e5;
    --indigo-500: #6366f1;
    --indigo-400: #818cf8;
    --indigo-300: #a5b4fc;
    --indigo-200: #c7d2fe;
    
    /* 其他強調色 */
    --purple-500: #a855f7;
    --cyan-400: #22d3ee;
    --emerald-400: #34d399;
    --amber-400: #fbbf24;
    --rose-400: #fb7185;
}
```

### 🎨 完整配色方案範例

#### 方案 1：賽博龐克紫粉配色

```css
:root {
    /* 深色背景 */
    --slate-950: #0a0118;
    --slate-900: #1a0f2e;
    --slate-800: #2d1b4e;
    
    /* 主要強調色 - 霓虹紫 */
    --indigo-600: #a855f7;
    --indigo-500: #c084fc;
    --indigo-400: #d8b4fe;
    
    /* 次要強調色 - 霓虹粉 */
    --purple-500: #f472b6;
    --cyan-400: #2dd4bf;
    --rose-400: #fb7185;
}
```

#### 方案 2：科技藍綠配色

```css
:root {
    /* 深色背景 */
    --slate-950: #001018;
    --slate-900: #0a1929;
    --slate-800: #0f2942;
    
    /* 主要強調色 - 科技藍 */
    --indigo-600: #0ea5e9;
    --indigo-500: #38bdf8;
    --indigo-400: #7dd3fc;
    
    /* 次要強調色 - 青綠 */
    --cyan-400: #22d3ee;
    --emerald-400: #34d399;
}
```

#### 方案 3：溫暖橙紅配色

```css
:root {
    /* 深色背景 */
    --slate-950: #1c0f0a;
    --slate-900: #2d1b13;
    --slate-800: #422a1f;
    
    /* 主要強調色 - 溫暖橙 */
    --indigo-600: #f97316;
    --indigo-500: #fb923c;
    --indigo-400: #fdba74;
    
    /* 次要強調色 - 紅與黃 */
    --amber-400: #fbbf24;
    --rose-400: #f87171;
}
```

### 📝 修改特定元素顏色

#### 修改漸層文字顏色

找到 `.gradient-text` class：

```css
.gradient-text {
    background: linear-gradient(
        135deg,
        var(--indigo-400) 0%,
        var(--purple-500) 50%,
        var(--cyan-400) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
```

**改成你喜歡的漸層**：
```css
/* 火焰漸層 (橙紅黃) */
.gradient-text {
    background: linear-gradient(
        135deg,
        #f97316 0%,
        #ef4444 50%,
        #fbbf24 100%
    );
}

/* 海洋漸層 (藍綠青) */
.gradient-text {
    background: linear-gradient(
        135deg,
        #0ea5e9 0%,
        #06b6d4 50%,
        #14b8a6 100%
    );
}

/* 森林漸層 (綠色系) */
.gradient-text {
    background: linear-gradient(
        135deg,
        #10b981 0%,
        #34d399 50%,
        #6ee7b7 100%
    );
}
```

#### 修改按鈕顏色

找到 `.cta-button` 或按鈕相關 class：

```css
.cta-button {
    background: linear-gradient(135deg, var(--indigo-600), var(--purple-500));
    color: white;
}

.cta-button:hover {
    background: linear-gradient(135deg, var(--indigo-500), var(--purple-400));
    box-shadow: 0 8px 30px rgba(99, 102, 241, 0.4);
}
```

### 🎭 修改背景效果

#### 動態發光球體

找到 `.glow-orb` class：

```css
.glow-orb {
    background: radial-gradient(
        circle,
        rgba(99, 102, 241, 0.15) 0%,
        rgba(99, 102, 241, 0) 70%
    );
}
```

**改變發光顏色**：
```css
/* 粉紅發光 */
.glow-orb {
    background: radial-gradient(
        circle,
        rgba(236, 72, 153, 0.2) 0%,
        rgba(236, 72, 153, 0) 70%
    );
}

/* 綠色發光 */
.glow-orb {
    background: radial-gradient(
        circle,
        rgba(52, 211, 153, 0.2) 0%,
        rgba(52, 211, 153, 0) 70%
    );
}
```

---

## ✏️ 修改專案和論文內容

### 📄 新增/修改論文 (publications.html)

每篇論文都是一個卡片 + 一個 Modal：

#### 論文卡片結構

```html
<div class="publication-card" onclick="openModal('paper1-modal')">
    <div class="publication-header">
        <span class="publication-year">2024</span>
        <span class="publication-venue">NeurIPS</span>
    </div>
    <h3 class="publication-title">你的論文標題</h3>
    <p class="publication-authors">
        <strong>Your Name</strong>, Co-Author Name
    </p>
    <div class="publication-tags">
        <span class="tag">Machine Learning</span>
        <span class="tag">Computer Vision</span>
    </div>
</div>
```

#### 對應的 Modal

```html
<div id="paper1-modal" class="project-modal">
    <div class="modal-content">
        <button class="modal-close" onclick="closeModal('paper1-modal')">×</button>
        
        <h2>你的論文標題</h2>
        
        <div class="modal-meta">
            <span class="meta-item">📅 發表年份: 2024</span>
            <span class="meta-item">📍 會議/期刊: NeurIPS 2024</span>
            <span class="meta-item">👥 作者: Your Name, Co-Author</span>
        </div>
        
        <div class="modal-section">
            <h3>📝 摘要</h3>
            <p>你的論文摘要內容...</p>
        </div>
        
        <div class="modal-section">
            <h3>🔑 關鍵詞</h3>
            <div class="publication-tags">
                <span class="tag">Keyword 1</span>
                <span class="tag">Keyword 2</span>
            </div>
        </div>
        
        <div class="modal-section">
            <h3>🔗 連結</h3>
            <div class="modal-links">
                <a href="#" class="modal-link">📄 Paper</a>
                <a href="#" class="modal-link">💻 Code</a>
                <a href="#" class="modal-link">📊 Slides</a>
            </div>
        </div>
    </div>
</div>
```

**添加新論文步驟**：
1. 複製一個完整的 `publication-card` 區塊
2. 複製對應的 Modal 區塊
3. 修改 Modal ID（例如：`paper8-modal`）
4. 更新 `onclick` 事件為新的 ID
5. 填入你的論文資訊

### 📦 新增/修改專案 (projects.html)

#### 專案卡片結構

```html
<div class="project-card" onclick="openModal('project1-modal')">
    <div class="project-header">
        <span class="project-status featured">Featured</span>
    </div>
    <h3 class="project-title">你的專案名稱</h3>
    <p class="project-description">
        簡短的專案描述，1-2 行即可...
    </p>
    <div class="project-tags">
        <span class="tag">Python</span>
        <span class="tag">React</span>
        <span class="tag">AI</span>
    </div>
</div>
```

#### 對應的 Modal

```html
<div id="project1-modal" class="project-modal">
    <div class="modal-content">
        <button class="modal-close" onclick="closeModal('project1-modal')">×</button>
        
        <h2>你的專案名稱</h2>
        
        <div class="modal-section">
            <h3>📋 專案概述</h3>
            <p>詳細的專案描述...</p>
        </div>
        
        <div class="modal-section">
            <h3>🎯 專案目標</h3>
            <ul>
                <li>目標 1</li>
                <li>目標 2</li>
                <li>目標 3</li>
            </ul>
        </div>
        
        <div class="modal-section">
            <h3>🛠️ 技術棧</h3>
            <div class="tech-stack">
                <span class="tech-item">Python</span>
                <span class="tech-item">React</span>
                <span class="tech-item">PostgreSQL</span>
            </div>
        </div>
        
        <div class="modal-section">
            <h3>📊 成果</h3>
            <ul>
                <li>✅ 成果 1</li>
                <li>✅ 成果 2</li>
                <li>✅ 成果 3</li>
            </ul>
        </div>
        
        <div class="modal-section">
            <h3>🔗 連結</h3>
            <div class="modal-links">
                <a href="#" class="modal-link">🌐 Demo</a>
                <a href="#" class="modal-link">💻 GitHub</a>
                <a href="#" class="modal-link">📄 文件</a>
            </div>
        </div>
    </div>
</div>
```

---

## 🎬 修改動畫效果

### ⚡ 修改過渡時間

在 `assets/css/style.css` 找到：

```css
:root {
    --transition-fast: 0.15s;
    --transition-base: 0.3s;
    --transition-slow: 0.5s;
}
```

**加快/放慢動畫**：
```css
/* 快速版本 */
:root {
    --transition-fast: 0.1s;
    --transition-base: 0.2s;
    --transition-slow: 0.3s;
}

/* 慢速版本 */
:root {
    --transition-fast: 0.2s;
    --transition-base: 0.4s;
    --transition-slow: 0.7s;
}
```

### 🔄 修改懸停效果

找到各種 `:hover` 狀態：

```css
.project-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(99, 102, 241, 0.25);
}
```

**調整懸停效果強度**：
```css
/* 更強烈的效果 */
.project-card:hover {
    transform: translateY(-12px) scale(1.02);
    box-shadow: 0 20px 60px rgba(99, 102, 241, 0.4);
}

/* 更溫和的效果 */
.project-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(99, 102, 241, 0.15);
}
```

### ✨ 修改 Modal 進場動畫

在 `assets/css/pages.css` 找到：

```css
@keyframes modalEnter {
    from {
        opacity: 0;
        transform: scale(0.9) translateY(20px);
    }
    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}
```

**改變進場方式**：
```css
/* 從左側滑入 */
@keyframes modalEnter {
    from {
        opacity: 0;
        transform: translateX(-100px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

/* 旋轉進入 */
@keyframes modalEnter {
    from {
        opacity: 0;
        transform: rotate(-10deg) scale(0.8);
    }
    to {
        opacity: 1;
        transform: rotate(0) scale(1);
    }
}
```

---

## 🔤 修改字體

### 更換主要字體

在 `assets/css/style.css` 找到：

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap');

:root {
    --font-sans: 'Inter', sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
}
```

### 常用字體替換方案

#### 方案 1：使用 Noto Sans（支援中文）

```css
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&display=swap');

:root {
    --font-sans: 'Noto Sans TC', sans-serif;
    --font-mono: 'Fira Code', monospace;
}
```

#### 方案 2：使用 Poppins（現代風格）

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500;600&display=swap');

:root {
    --font-sans: 'Poppins', sans-serif;
    --font-mono: 'Source Code Pro', monospace;
}
```

#### 方案 3：使用 Roboto（經典選擇）

```css
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;600&display=swap');

:root {
    --font-sans: 'Roboto', sans-serif;
    --font-mono: 'Roboto Mono', monospace;
}
```

### 調整字體大小

```css
:root {
    --font-size-xs: 0.75rem;    /* 12px */
    --font-size-sm: 0.875rem;   /* 14px */
    --font-size-base: 1rem;     /* 16px */
    --font-size-lg: 1.125rem;   /* 18px */
    --font-size-xl: 1.25rem;    /* 20px */
    --font-size-2xl: 1.5rem;    /* 24px */
    --font-size-3xl: 1.875rem;  /* 30px */
    --font-size-4xl: 2.25rem;   /* 36px */
}
```

**調整為較大字體**：
```css
:root {
    --font-size-base: 1.125rem;  /* 18px -> 主文字加大 */
    --font-size-lg: 1.25rem;     /* 20px */
    --font-size-xl: 1.5rem;      /* 24px */
}
```

---

## 🧪 測試你的修改

### 即時預覽流程

```bash
# 1. 啟動本機伺服器
python -m http.server 8080

# 2. 開啟瀏覽器
http://localhost:8080

# 3. 修改檔案後，按 F5 或 Ctrl+R 重新整理瀏覽器

# 4. 檢查瀏覽器開發者工具（F12）查看錯誤訊息
```

### 常見修改檢查清單

- ✅ HTML 語法是否正確（成對標籤）
- ✅ Modal ID 是否唯一且對應正確
- ✅ CSS 顏色值格式是否正確（# 或 rgba）
- ✅ JavaScript 是否有語法錯誤（檢查 Console）
- ✅ 圖片路徑是否正確
- ✅ 連結是否有效

---

## 📚 快速參考表

### 檔案對應表

| 想修改... | 編輯檔案 | 重點區域 |
|----------|----------|----------|
| 個人資訊 | `index.html` | hero-section, education-section |
| 論文列表 | `publications.html` | publication-card, Modal |
| 專案展示 | `projects.html` | project-card, Modal |
| 網站配色 | `assets/css/style.css` | `:root` 變數 |
| 卡片樣式 | `assets/css/pages.css` | .project-card, .publication-card |
| 看板娘對話 | `assets/js/live2d-config.js` | welcomeMessage, hour_tips, click_tips |
| 看板娘外觀 | `assets/js/live2d-config.js` | waifuSize, CSS 區塊 |
| 互動效果 | `assets/js/pages.js` | openModal(), closeModal() |

### 顏色變數快速對照

```css
/* 深色背景 */
--slate-950  /* 最深 - 主背景 */
--slate-900  /* 次深 - 區塊背景 */
--slate-800  /* 卡片背景 */

/* 文字顏色 */
--slate-100  /* 主文字（淺色） */
--slate-300  /* 次要文字 */
--slate-500  /* 說明文字 */

/* 強調色 */
--indigo-600  /* 按鈕、連結 */
--indigo-400  /* 懸停、漸層 */
--purple-500  /* 次要強調 */
--cyan-400    /* 輔助顏色 */
```

---

## 🐛 常見問題排解

### Q: 修改後網頁沒有變化？

**解決方法**：
1. 強制重新整理：按 `Ctrl + Shift + R` (Windows) 或 `Cmd + Shift + R` (Mac)
2. 清除瀏覽器快取：設定 → 隱私權 → 清除瀏覽資料
3. 檢查檔案是否有儲存（VS Code 檔案名稱有白點表示未儲存）

### Q: Modal 無法開啟？

**檢查項目**：
1. Modal ID 是否與 `onclick` 中的 ID 一致
2. `assets/js/pages.js` 是否正確載入
3. 瀏覽器 Console (F12) 是否有錯誤訊息

### Q: 看板娘沒有顯示？

**檢查項目**：
1. `assets/js/live2d-config.js` 是否載入
2. Live2D 模型檔案是否存在
3. 瀏覽器寬度是否小於 `waifuMinWidth`（預設 768px）

### Q: 顏色修改後很醜？

**建議**：
1. 使用線上配色工具：
   - [Coolors](https://coolors.co/) - 自動生成配色
   - [Adobe Color](https://color.adobe.com/) - 專業配色輪
   - [Paletton](https://paletton.com/) - 和諧配色
2. 參考其他網站的配色
3. 保持對比度足夠（文字可讀性）

### Q: 修改後 Git Push 失敗？

```bash
# 如果出現 "rejected" 錯誤
git pull origin main --rebase
git push origin main

# 如果有衝突，手動解決後：
git add .
git rebase --continue
git push origin main
```

---

## 💡 進階技巧

### 使用瀏覽器開發者工具即時測試

1. 按 `F12` 開啟開發者工具
2. 選擇 "Elements" 或 "元素" 標籤
3. 點擊左上角的選取工具 🔍
4. 點擊網頁上要修改的元素
5. 在右側 "Styles" 面板即時修改 CSS
6. 滿意後，複製修改內容到實際檔案

### 使用 VS Code 擴充套件

推薦安裝：
- **Live Server** - 自動重新整理
- **Color Highlight** - 顯示顏色預覽
- **HTML CSS Support** - CSS 自動完成
- **Auto Rename Tag** - 自動重新命名成對標籤

### 建立樣式變體

複製現有樣式建立變體：

```css
/* 原始按鈕 */
.cta-button { ... }

/* 次要按鈕變體 */
.cta-button-secondary {
    background: linear-gradient(135deg, var(--slate-700), var(--slate-600));
}

/* 成功按鈕變體 */
.cta-button-success {
    background: linear-gradient(135deg, var(--emerald-600), var(--emerald-500));
}
```

---

**完成修改後，別忘了：**

1. ✅ 在本機測試所有頁面
2. ✅ 檢查手機版顯示（開發者工具 → Toggle Device Toolbar）
3. ✅ Commit 並 Push 到 GitHub
4. ✅ 等待 1-2 分鐘讓 GitHub Pages 部署
5. ✅ 訪問 https://fader2077.github.io 確認上線

🎉 現在你已經掌握了完整的網站自訂技巧！

---

## 新增與插入圖片

### 📸 準備圖片

#### 圖片要求
- **格式**：JPG、PNG、WebP
- **大小**：最好 < 500KB（更快加載）
- **尺寸**：建議 1200x800px 或更大
- **位置**：放在 `assets/img/` 資料夾

#### 壓縮圖片（推薦）
使用線上工具：[TinyPNG](https://tinypng.com/) 或 [Squoosh](https://squoosh.app/)

### 1️⃣ 上傳圖片到專案

#### 方式 1：使用檔案管理器
```
1. 開啟檔案管理器
2. 進入 c:\Users\jiexi\Desktop\webme\fader2077.github.io\assets\img\
3. 複製你的圖片檔案到此資料夾
4. 在 VS Code 中會自動看到新增的檔案
```

#### 方式 2：使用命令列
```bash
# 將圖片複製到資料夾
cp "你的圖片路徑/photo.jpg" "c:\Users\jiexi\Desktop\webme\fader2077.github.io\assets\img\"
```

### 2️⃣ 在網頁中插入圖片

#### 新增頭像（替換現有的）
在 `index.html` 中找到個人照片區塊（大約第 150 行）：

```html
<!-- 舊的代碼 -->
<!-- <img src="/assets/img/profile.jpg" class="profile-pic" alt="avatar"> -->

<!-- 新的代碼 -->
<img src="assets/img/你的圖片名稱.jpg" alt="李捷新的個人照片">
```

#### 新增經歷圖片（在研究部分）
在研究部分新增圖片展示。找到 Research Section（大約第 350 行），修改如下：

```html
<div class="bento-card research-card featured">
    <!-- 新增圖片 -->
    <img src="assets/img/research-project-01.jpg" 
         alt="醫學影像分析研究" 
         style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">
    
    <div class="research-icon">
        <i class="fas fa-heartbeat"></i>
    </div>
    <div class="research-content">
        <span class="research-tag">Featured</span>
        <h3>醫學影像分析與多任務學習</h3>
        <!-- ... 其他內容 ... -->
    </div>
</div>
```

#### 新增經歷展示卡片
在「教育背景」或「研究專案」下方新增有圖片的卡片：

```html
<div class="bento-card education-card">
    <img src="assets/img/university-photo.jpg" 
         alt="國立陽明交通大學" 
         style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">
    
    <div class="card-icon">
        <i class="fas fa-university"></i>
    </div>
    <h3 class="card-title">我的研究經歷</h3>
    <p>在此描述你的研究經歷和成就...</p>
</div>
```

#### 建立圖片畫廊
在適當位置新增圖片展示：

```html
<div class="bento-grid gallery-grid" style="grid-template-columns: repeat(3, 1fr);">
    <div class="bento-card gallery-card">
        <img src="assets/img/photo-01.jpg" 
             alt="會議演講" 
             style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;">
        <h4 style="margin-top: 1rem; color: #e2e8f0;">2024 國際研討會演講</h4>
    </div>
    
    <div class="bento-card gallery-card">
        <img src="assets/img/photo-02.jpg" 
             alt="實驗室工作" 
             style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;">
        <h4 style="margin-top: 1rem; color: #e2e8f0;">AI 實驗室成果展示</h4>
    </div>
    
    <div class="bento-card gallery-card">
        <img src="assets/img/photo-03.jpg" 
             alt="團隊合照" 
             style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;">
        <h4 style="margin-top: 1rem; color: #e2e8f0;">研究團隊合作</h4>
    </div>
</div>
```

### 3️⃣ 圖片最佳實踐

✅ **做這些事**
```html
<!-- 總是使用 alt 文字（無障礙和 SEO） -->
<img src="assets/img/photo.jpg" alt="描述性的替代文字">

<!-- 使用相對路徑 -->
<img src="assets/img/photo.jpg" alt="圖片">

<!-- 使用 object-fit 控制圖片顯示 -->
<img src="assets/img/photo.jpg" 
     alt="圖片" 
     style="width: 100%; height: 300px; object-fit: cover;">
```

❌ **避免這些事**
```html
<!-- 不要使用絕對 URL（除非必要） -->
<img src="https://example.com/photo.jpg" alt="圖片">

<!-- 不要忘記 alt 文字 -->
<img src="assets/img/photo.jpg">

<!-- 不要使用過大的圖片 -->
<!-- 圖片大小應該 < 500KB -->
```

---

## 使用 Git 推送更新

### 🔄 完整的推送流程

#### 第 1 步：檢查變更
```bash
# 進入專案目錄
cd "c:\Users\jiexi\Desktop\webme\fader2077.github.io"

# 檢查哪些檔案被修改了
git status
```

你應該會看到類似的輸出：
```
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  modified:   index.html
  modified:   assets/css/style.css

Untracked files:
  (use "git add..." to include in what will be committed)
  assets/img/new-photo.jpg
```

#### 第 2 步：添加所有變更
```bash
# 添加所有修改的檔案
git add -A

# 或者只添加特定檔案
git add index.html
git add assets/img/new-photo.jpg
```

#### 第 3 步：檢查暫存的變更
```bash
# 確認所有檔案都已暫存
git status
```

應該看到綠色的已暫存檔案。

#### 第 4 步：提交變更（Commit）
```bash
# 提交時必須寫說明訊息
git commit -m "feat: 更新個人資訊和新增研究經歷圖片"

# 詳細的提交訊息
git commit -m "feat: 更新個人資訊
- 修改名字和介紹
- 新增 3 張研究經歷照片
- 更新教育背景資訊"
```

**提交訊息指南**：
- `feat:` - 新功能或內容
- `fix:` - 修復問題
- `docs:` - 文檔更新
- `style:` - 樣式調整
- `refactor:` - 代碼重構

#### 第 5 步：推送到 GitHub
```bash
# 推送到遠端倉庫
git push origin main
```

你會看到類似的輸出：
```
Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
Delta compression using up to 12 threads
Compressing objects: 100% (4/4), done.
Writing objects: 100% (3/3), 2.54 KiB | 2.54 MiB/s, done.
To https://github.com/fader2077/fader2077.github.io.git
   8a690ae..10e7990  main -> main
```

#### 第 6 步：驗證推送
```bash
# 查看最新的 commit
git log --oneline -5

# 應該看到你的提交訊息在最上面
```

### 📝 推送變更的完整例子

```bash
# 1. 進入專案
cd "c:\Users\jiexi\Desktop\webme\fader2077.github.io"

# 2. 檢查狀態
git status

# 3. 添加所有變更
git add -A

# 4. 提交
git commit -m "feat: 新增個人經歷和研究照片"

# 5. 推送
git push origin main

# 6. 驗證
git log --oneline -5
```

### ⏱️ 部署時間

推送後，GitHub Pages 會自動部署你的網站：
- **通常需要** 1-2 分鐘
- **最多等待** 5-10 分鐘
- 重新整理網址看最新變更：`https://fader2077.github.io`

---

## 常見問題

### ❌ 問題 1：「fatal: not a git repository」

**原因**：不在正確的目錄中

**解決方案**：
```bash
# 確認進入正確的目錄
cd "c:\Users\jiexi\Desktop\webme\fader2077.github.io"

# 驗證這是一個 Git 倉庫
git status
```

### ❌ 問題 2：「Your branch is ahead of 'origin/main'」

**原因**：本地有 commit 還沒推送

**解決方案**：
```bash
# 推送到遠端
git push origin main
```

### ❌ 問題 3：圖片在本地顯示但網站上看不到

**原因**：
1. 圖片路徑錯誤
2. 圖片還沒推送到 GitHub

**解決方案**：
```bash
# 確認圖片在資料夾中
ls assets/img/

# 確認圖片已添加到 Git
git add assets/img/

# 推送
git push origin main
```

### ❌ 問題 4：修改後網站還是顯示舊內容

**原因**：瀏覽器快取

**解決方案**：
```
Windows/Linux: 按 Ctrl + F5
Mac: 按 Cmd + Shift + R
或者用無痕視窗開啟
```

### ❌ 問題 5：「permission denied」或認證錯誤

**原因**：Git 認證問題

**解決方案**：
```bash
# 重新設定認證
# 當提示輸入密碼時，使用 GitHub 個人存取令牌
# 而不是密碼

# 查看目前的認證
git config --global credential.helper

# 重設認證
git credential reject
```

---

## 快速參考

### 常用 Git 命令

```bash
# 查看狀態
git status

# 查看修改內容
git diff

# 查看提交歷史
git log --oneline

# 添加所有變更
git add -A

# 提交
git commit -m "說明訊息"

# 推送
git push origin main

# 拉取最新版本
git pull origin main

# 撤銷最後一個提交（未推送）
git reset --soft HEAD~1

# 查看遠端倉庫
git remote -v
```

### 檔案修改清單

修改網站時的檢查清單：

```
□ 備份原始檔案（可選）
□ 用 VS Code 編輯檔案
□ 在本地瀏覽器測試（http://localhost:8080）
□ 運行 git status 檢查變更
□ 運行 git add -A
□ 運行 git commit -m "說明"
□ 運行 git push origin main
□ 等待 1-2 分鐘部署
□ 訪問 https://fader2077.github.io 驗證
```

### 文件路徑速查表

```
首頁內容          → index.html （第 160-625 行）
樣式表           → assets/css/style.css
JavaScript       → assets/js/main.js
圖片資料夾       → assets/img/
README            → README.md
本教學            → TUTORIAL.md
```

---

## 📚 延伸學習

### Git 資源
- [Pro Git 電子書](https://git-scm.com/book/zh-tw/v2)
- [GitHub Desktop GUI](https://desktop.github.com/) - 圖形化 Git 工具
- [Git 官方文檔](https://git-scm.com/doc)

### 網頁設計資源
- [MDN Web Docs](https://developer.mozilla.org/zh-TW/)
- [CSS Grid 完整指南](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [HTML 最佳實踐](https://www.w3.org/standards/webdesign/htmlcss)

### 圖片優化工具
- [TinyPNG 壓縮](https://tinypng.com/)
- [Squoosh 線上編輯](https://squoosh.app/)
- [ImageOptim 本地優化](https://imageoptim.com/)

---

## 💡 專業建議

### ✨ SEO 和性能優化

**添加 Meta 標籤**（用於 SEO）：
```html
<meta name="description" content="你的網站描述">
<meta name="keywords" content="AI, 深度學習, 研究者">
<meta property="og:title" content="李捷新 - AI 研究者">
<meta property="og:image" content="assets/img/preview.jpg">
```

**圖片懶加載**（提升性能）：
```html
<img src="assets/img/photo.jpg" 
     alt="圖片描述" 
     loading="lazy">
```

### 🔐 安全性

- ✅ 定期使用 `.gitignore` 隱藏敏感檔案
- ✅ 不要提交個人 API 密鑰或密碼
- ✅ 使用 HTTPS 連結（GitHub Pages 預設支援）

### 📊 監控部署

在 GitHub 上查看部署狀態：
1. 進入 Repository Settings
2. 找到 Pages 部分
3. 查看最後的部署狀態

---

## 🎓 總結

現在你已經學會了：
1. ✅ 修改網頁 HTML 檔案
2. ✅ 新增和插入圖片
3. ✅ 使用 Git 追蹤變更
4. ✅ 推送更新到 GitHub
5. ✅ 部署到 GitHub Pages

**下一步**：
- 定期更新你的研究進展
- 新增論文連結
- 優化網站的視覺效果
- 分享你的學習成果

---

**祝你網站維護順利！如有問題，隨時查閱此教學 📖**

