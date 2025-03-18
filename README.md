# Project: Weather Dashboard

👀 Live demo: https://weilocus.github.io/weather-dashboard/

Desktop UI
<br />
<img src="/public/screen.png" width="500" height="auto"/>

Mobile UI
<br />
<img src="/public/screen-mobile.png" width="250" height="auto"/>

## Description

Weather Dashboard 是一個現代化且響應式的天氣預報應用程式，允許用戶快速查詢全球各城市的即時天氣資訊。

此專案整合了[第三方天氣 API]("https://open-meteo.com/")，提供即時的天氣數據，包括目前溫度、天氣狀況、風速和濕度等重要指標。

## Features 專案功能

- **城市搜尋功能**：使用者可以輸入城市名稱，搜尋特定地點的天氣資訊，目前預設出現台北天氣
  （強烈建議使用英文搜尋，中文會導致經緯度有偏差）
  <img src="/public/search%20city.gif" width="600" height="auto" alt="搜尋城市示意圖"/>
- **即時天氣顯示**：顯示搜尋城市的名稱、目前溫度、天氣狀況、風速和濕度
- **五天天氣預報**：提供未來五天的天氣預測，包括日期、預期溫度和天氣狀況
- **溫度單位切換**：支援攝氏度與華氏度之間的切換，滿足不同用戶的偏好
  <img src="/public/toggle-temp.gif" width="600" height="auto" alt="溫度切換示意圖"/>
- **收藏城市功能**：允許用戶儲存喜愛的城市並快速存取其天氣資訊
  <img src="/public/add%20to%20favorite.gif" width="600" height="auto" alt="收藏城市示意圖"/>

- **響應式設計**：不管是使用手機或是電腦都能得到一致的使用體驗

## Getting Started 開始使用

**請先確認電腦中已安裝 node.js 與 npm！**

⚠️ 專案使用 pnpm, 請確認 node.js version 至少需要 `v18.12` 版本

1. 將專案 clone 到本地：

```bash
$ git clone "https://github.com/WeiLocus/weather-dashboard.git"
```

2. 在本地開啟之後，透過終端機進入資料夾，輸入：

```bash
$ npm install / pnpm install
```

3. 安裝完畢後，繼續輸入：

```bash
$ npm run dev / pnpm run dev
```

## 💻 Technologies 開發環境與工具

- node.js 20.13.1
- vite 6.2.0
- react 19.0.0
- react-dom 19.0.0
- axios 1.8.3
- tailwind css 3.0.0
- react-icons 5.5.0

## File Structure 專案結構

```
-- public
-- src
  |-- App.jsx
  |-- assets
  |-- components
  |-- constants   天氣代碼資料對照
  |-- services    統一整理天氣資料格式
  |-- utils       處理日期
  |-- views       頁面

```
