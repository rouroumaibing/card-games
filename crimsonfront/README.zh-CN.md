# 赤焦前线（CrimsonFront）

> [English](README.md) | 中文

基于 [card-battle-framework](../../README.zh-CN.md) 的红警题材卡牌对战游戏。

## 玩法

### 核心规则

- **基础生命**：20
- **电力**：0–10，每回合 +1
- **最大回合数**：50
- **初始手牌**：3 张
- **攻击规则**：嘲讽——有嘲讽单位时必须先攻击嘲讽单位，否则可直接攻击主基地
- **死亡结算**：仅在攻击时结算死亡

### 阵营

| 阵营 | 颜色 | 风格 |
|------|------|------|
| 同盟（Coalition） | 蓝 | 常规军事（美国、韩国、法国、德国、英国） |
| 赤潮（Crimson） | 红 | 苏式激进单位（苏俄、利比亚、伊拉克、古巴） |
| 灵能（Psion） | 紫 | 心灵控制 / 异能 |
| 中立（Neutral） | 灰 | 建筑 + 工具单位 |

### 卡牌

- **共 56 张**：34 随从、13 法术、9 建筑
- **阵营分布**：同盟 16、赤潮 16、灵能 12、中立 12
- **稀有度**：普通、稀有、史诗、传说
- **传说卡**：气象风暴、核弹、利维坦、灵能化身

### 预设卡组

10 套国家预设：美国、韩国、法国、德国、英国、苏俄、利比亚、伊拉克、古巴、灵主。

### 卡组规则

- 每套卡组 30 张
- 同名卡最多 2 张
- 建筑卡最多 3 张
- 超级武器（传说法术）最多 1 张

## 快速开始

| 模式 | 命令 |
|------|------|
| 浏览器 | `python3 -m http.server 8000` → 打开 `localhost:8000/card-games/crimsonfront/web/` |
| CLI 冒烟测试 | `npm run crimsonfront` |
| 联网服务器 | `npm run crimsonfront:server`（WS 端口 8099） |
| 桌面开发 | `npm run desktop:crimsonfront` |

- **浏览器**：用任意静态服务器托管仓库根目录，然后访问 web 入口。
- **联网对战**：先启动 WS 服务器，再打开浏览器入口，首页点「联网对战」进入大厅。
- **桌面模式**：内嵌 WS 服务器，无需额外启动服务端。

## 项目结构

```
card-games/crimsonfront/
├── config/
│   ├── meta.js            # 游戏元数据（id、名称、阵营色）
│   ├── cards.js           # 56 张卡池 + 卡组校验（CJS）
│   ├── effects.js         # EffectRegistry 效果注册（CJS）
│   ├── rules.js           # 规则标志 + 钩子（CJS）
│   ├── index.js           # 游戏包入口：组装 meta/cards/rules/effects（CJS）
│   ├── theme.mjs          # 主题变量、阵营、页签、文案（ESM）
│   ├── presetDecks.mjs    # 10 套预设卡组（ESM）
│   ├── battleFx.mjs       # 对战屏 FX 配置（ESM）
│   ├── battleFx.css       # 对战 FX 样式
│   ├── videoCrypt.mjs     # 视频加密密钥/清单（ESM）
│   ├── cards.data.mjs     # 生成的卡池镜像（工具产物）
│   ├── dist/              # ESM 构建产物
│   └── assets/
│       ├── cards/         # 卡牌图片（56 张 PNG）
│       ├── videos/        # 加密视频特效（.bin + .mp4）
│       ├── app_icon.png
│       └── title_splash.png
├── run.js                 # CLI 入口（node run.js [seed]）
├── server.js              # 联网 WS 服务器入口（node server.js [port]）
└── web/
    └── index.html         # 浏览器入口（游戏 × 外壳耦合点）
```

**模块格式边界**：`meta.js`、`cards.js`、`effects.js`、`rules.js`、`index.js` 为 CommonJS（Node + 配置装载层）。`theme.mjs`、`presetDecks.mjs`、`battleFx.mjs`、`videoCrypt.mjs` 为 ESM（浏览器）。`cards.data.mjs` 和 `dist/*.mjs` 是工具生成的产物，请勿手改。

## 构建命令

| 用途 | 命令 |
|------|------|
| ESM 构建 | `npm run build:esm:crimsonfront` |
| 卡池数据生成 | `npm run gen:cards:crimsonfront` |
| 视频加密 | `npm run build:videos:crimsonfront` |
| 桌面发布 | `npm run release:crimsonfront` |
| 清理构建产物 | `npm run clean` |

> `cards.data.mjs` 和 `dist/*.mjs` 是生成产物。修改 `.js` 源文件后需重新构建。

## 配置

游戏使用框架的三层扩展性模型：

- **EffectRegistry** — 单卡效果，通过 6 个活跃触发器：`battlecry`、`onPlay`、`onBuild`、`deathrattle`、`onTurnStart`、`onTurnEnd`
- **rules.flags** — 声明式规则差异（基础生命、电力上限、攻击规则等）
- **rules.hooks** — 白名单自定义逻辑（如兵营步兵费用 -1）

### 延伸阅读

- 框架设计：[`docs/prompts/FRAMEWORK_DESIGN_PROMPT.md`](../../docs/prompts/FRAMEWORK_DESIGN_PROMPT.md)
- 游戏设计：[`docs/prompts/CRIMSONFRONT_DESIGN_PROMPT.md`](docs/prompts/CRIMSONFRONT_DESIGN_PROMPT.md)

## 许可证

MIT
