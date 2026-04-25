<div align="center">

# KY Lab · 系統分析與控制實驗室

**System Analysis & Control Laboratory**

國立臺北科技大學 · 電機工程系

[![Website](https://img.shields.io/badge/官方網站-kylab--ntut.github.io-64D2D6?style=for-the-badge&logo=github-pages&logoColor=white)](https://kylab-ntut.github.io/)
[![GitHub Pages](https://img.shields.io/badge/Deployed_on-GitHub_Pages-181717?style=for-the-badge&logo=github)](https://kylab-ntut.github.io/)
[![Firebase](https://img.shields.io/badge/Backend-Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)

</div>

---

## 關於實驗室

**KY Lab** 由電機工程系 **練光祐特聘教授** 領導，專注於智慧控制、無人機系統、語音處理、影像辨識與節能控制等前瞻研究領域，培育具備理論基礎與實作能力的碩博士研究人才。

---

## 研究方向

| 領域 | 說明 |
|---|---|
| 🚁 無人機系統 | 自主飛行控制、路徑規劃、多機協作 |
| 🎙️ 語音處理 | 語音辨識、語音合成、聲紋分析 |
| 👁️ 影像辨識 | 深度學習視覺模型、目標偵測與追蹤 |
| ⚡ 節能控制 | 智慧電網、能源最佳化、嵌入式控制系統 |

---

## 網站技術棧

```
靜態前端          動態功能               部署
─────────         ───────────────        ──────────────
HTML / CSS / JS   Firebase Firestore     GitHub Pages
                  Firebase Auth          自動部署（push → live）
                  Firebase Storage
```

- **純靜態架構**：無框架、無建置步驟，所有頁面皆為獨立 HTML
- **成員系統**：Firebase 驅動，成員可登入編輯個人資料、上傳頭貼
- **管理員系統**：指定帳號可透過網頁介面管理所有成員資料

---

## 頁面一覽

| 路徑 | 內容 |
|---|---|
| `/` | Hero 首頁 |
| `/research/` | 研究方向 |
| `/projects/` | 實驗室專案 |
| `/professor/` | 教授簡介與學術歷程 |
| `/members/` | 實驗室成員（Firebase 動態） |
| `/awards/` | 榮譽獲獎 |
| `/gallery/` | 相簿 |

---

## 快速部署

```bash
# 修改任意檔案後
git add <檔案>
git commit -m "更新說明"
git push
# GitHub Pages 約 1-2 分鐘自動上線
```

詳細維護說明請參閱 **[MAINTENANCE.md](./MAINTENANCE.md)**。

---

## 聯絡資訊

**練光祐 特聘教授**

- 地址：106 台北市大安區忠孝東路三段 1 號 綜合科館 503 室
- Email：[kylian@ntut.edu.tw](mailto:kylian@ntut.edu.tw)
- 電話：02-2771-2171 #2171

---

<div align="center">

© KY Lab · National Taipei University of Technology

</div>
