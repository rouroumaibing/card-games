# card-games

> [English](README.md) | 中文

[card-battle-framework](../README.zh-CN.md) 的游戏包仓库。每个子目录是一款完整的、自包含的游戏，运行在共享引擎 + UI 外壳上。

## 游戏列表

| 游戏 | 描述 | README |
|------|------|--------|
| crimsonfront | 红警题材卡牌对战游戏 | [README](crimsonfront/README.zh-CN.md) |

## 目录结构

```
card-games/
├── crimsonfront/          # 完整游戏包
│   ├── config/            # 游戏差异配置
│   │   ├── cards.js       # 卡牌定义（CJS）
│   │   ├── effects.js     # 效果注册表（CJS）
│   │   ├── rules.js       # 规则：flags + hooks（CJS）
│   │   ├── meta.js        # 元数据：阵营、稀有度（CJS）
│   │   ├── index.js       # 游戏包入口（CJS）
│   │   ├── theme.mjs      # 主题：颜色、文案、图片（ESM）
│   │   ├── presetDecks.mjs# 预设卡组（ESM）
│   │   ├── battleFx.mjs   # 对战屏 FX 配置（ESM）
│   │   ├── battleFx.css   # 对战 FX 样式
│   │   ├── videoCrypt.mjs # 视频加密配置（ESM）
│   │   ├── cards.data.mjs # 生成的卡池镜像（ESM，自动生成）
│   │   ├── dist/          # 生成的 ESM 构建产物（自动生成）
│   │   └── assets/        # 卡牌图片、视频、图标
│   ├── run.js             # CLI 入口
│   ├── server.js          # 联网对战 WebSocket 服务器
│   ├── web/index.html     # 浏览器入口
│   └── docs/prompts/      # 重生成提示词
├── .gitignore             # 排除构建产物
└── LICENSE                # MIT
```

## 开发

### 前置条件

- Node.js >= 16
- 父仓库 [card-battle-framework](../README.zh-CN.md)（提供引擎 + UI 外壳 + 构建工具）

### 构建命令

在父仓库根目录运行：

```bash
# ESM 构建（引擎 + 游戏配置 CJS → ESM）
npm run build:esm -- <game>

# 生成卡池镜像
npm run gen:cards -- <game>

# 视频加密
npm run build:videos -- <game>

# CLI 冒烟测试
npm run <game>

# 联网对战服务器（WebSocket 监听 8099）
npm run <game>:server

# 桌面开发模式
npm run desktop -- <game>
```

### 新增游戏

参见框架的[新游戏开发教程](../docs/new_game_guidance/DEVELOPMENT_GUIDE.md)（12 步），或使用[新游戏生成模板](../docs/new_game_guidance/NEW_GAME_PROMPT.md)由 AI 一键生成。

### 模块格式约定

- **CommonJS**（`.js`）：`cards.js`、`effects.js`、`rules.js`、`meta.js`、`index.js`、`run.js`、`server.js`
- **ESM**（`.mjs`）：`theme.mjs`、`presetDecks.mjs`、`battleFx.mjs`、`videoCrypt.mjs`、`cards.data.mjs`、`dist/*.mjs`

## 许可证

[MIT](LICENSE)
