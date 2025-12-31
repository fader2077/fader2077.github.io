# 🌐 Li Chieh-Hsin's Portfolio

這是我的個人學術與作品集網站，基於 HTML5, CSS3, JavaScript 構建，並部署於 GitHub Pages。

## ✨ 特色
- **Bento Grid 設計**：現代化的網格佈局
- **Live2D 看板娘**：互動式虛擬助手
- **深色模式 (Dark Mode)**：科技感配色 (Slate + Indigo)
- **響應式設計**：支援手機與桌面瀏覽
- **動態元件載入**：DRY 原則的模組化架構
- **Glassmorphism UI**：毛玻璃效果與進階動畫

## 🔗 線上預覽
[https://fader2077.github.io](https://fader2077.github.io)

## 🛠️ 技術棧
- **Frontend**: Vanilla JavaScript (No Frameworks)
- **Styling**: CSS Grid & Flexbox, Glassmorphism Effects
- **Icons**: FontAwesome 6.5.1
- **Animation**: Anime.js, Typed.js
- **Interactive**: Live2D Widget
- **SEO**: Open Graph, Twitter Cards, Sitemap

## 📂 專案結構
```
├── index.html                    # 主頁
├── projects.html                 # 研究專案頁面
├── publications.html             # 學術論文頁面
├── 404.html                      # 自訂錯誤頁面
├── components/                   # 可重用元件
│   ├── navbar.html
│   └── footer.html
├── assets/
│   ├── css/
│   │   ├── style.css            # 主要樣式
│   │   └── pages.css            # 子頁面樣式
│   ├── js/
│   │   ├── main.js              # 主要邏輯
│   │   ├── live2d-config.js     # Live2D 配置
│   │   └── pages.js             # 頁面互動邏輯
│   └── img/                     # 圖片資源
├── sitemap.xml                   # SEO 地圖
└── robots.txt                    # 爬蟲規則
```

## 🎨 設計特點
### 配色方案
- **主色調**: Slate-950 (#020617) - 深邃科技感
- **強調色**: Indigo-500 (#6366f1) - 活力藍紫
- **漸變**: Purple-500 到 Cyan-400 的多色漸變

### 核心功能
1. **Component Loader**: 動態載入導航欄與頁腳，避免程式碼重複
2. **Active Link Detection**: 自動偵測當前頁面並高亮導航
3. **Smooth Scroll**: 平滑滾動與錨點跳轉
4. **Intersection Observer**: 滾動觸發動畫
5. **Back to Top**: 智慧顯示的回頂按鈕
6. **GitHub Activity**: 整合 ghchart.rshah.org API

## 📱 響應式設計
- **Desktop**: 1200px+ (完整 Bento Grid 佈局)
- **Tablet**: 768px - 1199px (2 欄佈局)
- **Mobile**: < 768px (單欄堆疊佈局)

## 🚀 快速開始
```bash
# Clone 倉庫
git clone https://github.com/fader2077/fader2077.github.io.git

# 進入目錄
cd fader2077.github.io

# 使用任何 HTTP 伺服器運行 (例如 Python)
python -m http.server 8000

# 瀏覽器訪問
open http://localhost:8000
```

## 📊 效能優化
- ✅ 圖片 Lazy Loading
- ✅ 最小化 CSS/JS 檔案
- ✅ 預載入字型檔案
- ✅ Gzip 壓縮 (GitHub Pages 自動)

## 🔐 SEO 優化
- ✅ Semantic HTML5
- ✅ Open Graph Tags (LinkedIn/Facebook 預覽)
- ✅ Twitter Cards
- ✅ Sitemap.xml & Robots.txt
- ✅ 結構化資料標記

## 📄 授權
© 2025 李捷新 Chieh-Hsin Li. All Rights Reserved.

---

⭐ **如果你覺得這個專案有幫助，請給個 Star！**

