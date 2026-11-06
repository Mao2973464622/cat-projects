# 💰 摸金交易行 · 涨跌看板

> 📍 上级目录：[Cat Projects 合集](../README.md)

**摸金玩法交易行物价快照对比看板** · 纯前端 · 按快照对比分析涨跌走势

---

## 🚀 快速开始

```bash
# 本地静态服务（data/ 下的 JSON 需经 HTTP 加载，直接 file:// 打开部分浏览器会拦截）
python3 -m http.server 8000
# 访问 http://localhost:8000
```

> ✅ 无需 npm install、无需构建。建议通过静态服务或 GitHub Pages 访问。

---

## 🎮 功能特性

- **对比区间**：从基准快照 → 当前快照，跨时段对比物价涨跌
- **统计概览**：顶部横向滚动展示涨/跌/平/收藏统计，点击查看清单
- **搜索**：按物资名称实时过滤
- **筛选与排序**：涨 / 跌 / 平 / 收藏筛选；按等级、名称、现价、涨跌排序
- **历史记录**：抽屉展示快照时间线，可回看任意时段
- **主题外观**：深金主题 + 主题切换（本地持久化），等级动效图例（7级炫彩流光 → 普通灰）
- **字体切换**：行楷 / 黑体 一键切换

---

## 📁 项目结构

```text
mini-world-mojin-trading/
├── index.html            # 主页面
├── css/
│   ├── style.css         # 布局与组件样式
│   └── theme.css         # 主题外观定义
├── js/
│   ├── app.js            # 主逻辑
│   └── parser.js         # 数据解析
├── data/
│   ├── index.json        # 快照元信息（snapshots 数组）
│   ├── items.json        # 物资种类定义
│   ├── prices.json       # 物价数据
│   └── snapshots/        # 各快照独立文件 s1.json ~ s8.json
├── LICENSE               # MIT 许可证
└── README.md             # 本说明
```

> **如何更新数据**：在 `data/index.json` 的 `snapshots` 数组追加一条快照元信息，再在 `data/snapshots/` 下新增同名文件（如 `s9.json`，内容 `{"id":"s9","prices":{...}}`）。新增物资**种类**才需改 `data/items.json`。

---

## 📄 许可证

[MIT License](LICENSE) · Copyright (c) 2026 Mao2973464622

<div align="center">

[⬆ 回到 Cat Projects 合集](../README.md)

</div>