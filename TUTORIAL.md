# 📚 GitHub Pages 網站修改與發佈教學

> 一步步學會如何修改個人網站、新增內容、插入圖片、並推送到 GitHub Pages

---

## 目錄
1. [前置準備](#前置準備)
2. [修改網頁檔案](#修改網頁檔案)
3. [新增與插入圖片](#新增與插入圖片)
4. [使用 Git 推送更新](#使用-git-推送更新)
5. [常見問題](#常見問題)
6. [快速參考](#快速參考)

---

## 前置準備

### 必要工具
- **Git** - 版本控制系統（[下載](https://git-scm.com/download/win)）
- **VS Code** - 程式碼編輯器（[下載](https://code.visualstudio.com/)）
- **GitHub 帳號** - 用於管理倉庫（[註冊](https://github.com/signup)）

### 確認環境
在 PowerShell 或 Terminal 中輸入以下命令確認安裝：

```bash
# 檢查 Git 版本
git --version

# 檢查 Git 設定
git config --global user.name
git config --global user.email
```

### 首次 Git 設定（如果還沒做過）
```bash
# 設定全域 Git 使用者名稱
git config --global user.name "你的名字"

# 設定全域 Git 電子郵件
git config --global user.email "你的email@example.com"
```

---

## 修改網頁檔案

### 📁 專案檔案結構
```
fader2077.github.io/
├── index.html              # 主頁面（主要編輯這個）
├── README.md               # 專案說明
├── TUTORIAL.md             # 本教學檔案
├── intro.md                # 原始個人資料
└── assets/
    ├── css/
    │   └── style.css       # 樣式表
    ├── js/
    │   ├── main.js         # 主要 JavaScript
    │   └── live2d-config.js # Live2D 配置
    └── img/                # 圖片資料夾
        └── (在此放置圖片)
```

### 1️⃣ 編輯主頁面

#### 使用 VS Code 開啟專案
```bash
# 進入專案目錄
cd "c:\Users\jiexi\Desktop\webme\fader2077.github.io"

# 用 VS Code 開啟
code .
```

#### 修改個人資訊
在 `index.html` 中找到以下區塊，用你的實際資訊替換：

**步驟 1：修改名字和介紹**
```html
<!-- 找到大約第 160-170 行 -->
<h1 class="hero-title">
    <span class="greeting">你好，我是</span>
    <span class="name-zh">李捷新</span>              <!-- 改為你的中文名字 -->
    <span class="name-en">Chieh-Hsin Li</span>      <!-- 改為你的英文名字 -->
</h1>
<p class="hero-description">
    專注於<span class="highlight">深度學習</span>、<!-- 改為你的研究領域 -->
    <span class="highlight">醫學影像分析</span>與
    <span class="highlight">多任務學習</span>的AI研究者。
    熱衷於探索 Transformer 架構與 LLM 在智慧系統中的創新應用。
</p>
```

**步驟 2：修改聯繫資訊**
```html
<!-- 找到大約第 580-600 行 -->
<div class="contact-info">
    <div class="contact-item">
        <i class="fas fa-map-marker-alt"></i>
        <span>Taiwan</span>                          <!-- 改為你的所在地 -->
    </div>
    <div class="contact-item">
        <i class="fas fa-envelope"></i>
        <span>contact@example.com</span>             <!-- 改為你的 Email -->
    </div>
</div>
```

**步驟 3：修改社群連結**
```html
<!-- 找到大約第 610-625 行 -->
<div class="contact-links">
    <a href="https://github.com/fader2077" target="_blank" class="contact-link">
        <!-- 把 fader2077 改為你的 GitHub 使用者名稱 -->
        <i class="fab fa-github"></i>
        <span>GitHub</span>
    </a>
    <a href="#" target="_blank" class="contact-link">
        <!-- 把 # 改為你的 Google Scholar 連結 -->
        <i class="fas fa-graduation-cap"></i>
        <span>Google Scholar</span>
    </a>
</div>
```

### 2️⃣ 修改教育背景

找到「About」部分（大約第 290 行），更新你的教育經歷：

```html
<div class="education-item">
    <div class="edu-badge">碩士</div>
    <h4>國立陽明交通大學</h4>                        <!-- 改為你的學校 -->
    <p class="edu-dept">智慧產業與綠色能源研究所</p>  <!-- 改為你的系所 -->
    <p class="edu-focus">研究導向：智慧系統、AI應用、綠色能源×AI</p>
</div>
```

### 3️⃣ 修改研究興趣

找到「Interests Card」部分（大約第 380-400 行），更新研究領域：

```html
<div class="interests-grid">
    <div class="interest-item">
        <i class="fas fa-network-wired"></i>
        <span>Deep Learning</span>                   <!-- 修改興趣項目 -->
    </div>
    <!-- 複製上面的區塊來新增更多項目 -->
</div>
```

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

