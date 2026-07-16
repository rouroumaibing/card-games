# CrimsonFront（赤焦前线）游戏包重生成提示词

> 本文件是 **crimsonfront 游戏包**的重生成提示词：供 AI Agent 在**已按框架级 prompt 重建好的框架骨架之上**，生成 crimsonfront 这一个游戏包（`card-games/crimsonfront/config/` + `card-games/crimsonfront/`）。
>
> **分层原则（务必遵守）**：框架的接口 / shape / 契约（schema 白名单、6 触发器、`computeAttackTargets`、presenter 契约、`getRects` / facts、`bootShell` 四参……）**一律引用框架级** `docs/prompts/FRAMEWORK_DESIGN_PROMPT.md` 的对应节，本文件**绝不复述接口定义**，只写「crimsonfront 填什么值」。凡出现「见框架级 §N」处，该节在框架级 prompt 中真实存在（节标题格式 `## §N …`）。
>
> 本文件是 per-game 提示词，**允许**出现游戏专属串（`crimson`/`coalition`/`psion`/`赤焦` 等）与主题 hex 颜色。
>
> 体例：每节三件套 **设计要点 / 可复制提示词 / 避坑清单**。

---

## §0 定位与前置

### 设计要点

- **本文件产出**：一个可在框架引擎上跑通的 crimsonfront 游戏包。**逻辑差异全部落在 `card-games/crimsonfront/config/` 与 `card-games/crimsonfront/`，`framework/` 零改动**（三层扩展性模型见框架级 §3.2）。
- **前置铁律**：先按框架级 `docs/prompts/FRAMEWORK_DESIGN_PROMPT.md` §0–§7 重建好框架骨架（引擎 / config 装载层 / UI 外壳 / FX 底座 / 工具链 / 入口约定）。本文件只在骨架之上填 crimsonfront 的配置与入口，**不重建任何 framework 代码**。
- **产出文件清单**（14 个）：
  - `card-games/crimsonfront/config/` 五个 **CJS**（`.js`，`module.exports`，供 Node 测试与 config 装载）：`meta.js`、`cards.js`、`effects.js`、`rules.js`、`index.js`。
  - `card-games/crimsonfront/config/` 四个 **ESM**（`.mjs`，`export`，供浏览器 / 单测）：`theme.mjs`、`presetDecks.mjs`、`videoCrypt.mjs`、`battleFx.mjs`（外加一份 `battleFx.css`）；`cards.data.mjs` 由工具链 `gen:cards` 生成，`dist/*.mjs` 由 `build:esm` 生成（工具链见框架级 §6）。
  - `card-games/crimsonfront/`：`run.js`（Node CLI 冒烟）、`web/index.html`（唯一「游戏 × 外壳」耦合点）。
- **crimsonfront 一句话身份**：id `crimsonfront`、名「赤焦前线」，红警式即时战术题材；三主阵营 `coalition`（同盟）/ `crimson`（赤潮）/ `psion`（灵能）+ `neutral`（中立/建筑）；56 张有稀有度的卡、10 套国家预设、3 张加密视频施法法术。

### 可复制提示词

```
在已重建好的 card-battle-framework 骨架之上，生成 crimsonfront 游戏包。零改 framework/。
产出 14 个文件：
  card-games/crimsonfront/config/{meta.js, cards.js, effects.js, rules.js, index.js}   ← CJS
  card-games/crimsonfront/config/{theme.mjs, presetDecks.mjs, videoCrypt.mjs, battleFx.mjs, battleFx.css}  ← ESM/CSS
  card-games/crimsonfront/{run.js, web/index.html}
  （cards.data.mjs 与 dist/*.mjs 为工具链产物，见框架级 §6，勿手写。）
所有引擎接口 / 契约按框架级 §2–§7 消费，本包只填 crimsonfront 的值。
```

### 避坑清单

- **别重写 framework**：任何战斗逻辑差异只能落进 `EffectRegistry`（单卡触发器）/ `rules.flags`（声明差异）/ `rules.hooks`（白名单自定义逻辑）三层之一（见框架级 §3.2）。发现「想改引擎」时，先确认能否用这三层表达。
- **CJS / ESM 边界别混**：config 装载层 require 的是 `.js`（CJS）；浏览器 import 的是 `.mjs`（ESM）与 `dist/*.mjs`。`meta/cards/effects/rules/index` 写 CJS，`theme/presetDecks/videoCrypt/battleFx` 写 ESM。
- **`dist/` 与 `cards.data.mjs` 是产物不是手稿**：改了 `.js` 源须重跑 `build:esm`/`gen:cards`（框架级 §6），否则浏览器加载的是旧逻辑。

---

## §1 主题变量表（theme.mjs 的 crimsonfront 值）

### 设计要点

theme 描述符的**键名结构 / shape / `applyTheme` 注入规则见框架级 §4.3–§4.4**。本节只给 crimsonfront 的具体填值（`card-games/crimsonfront/config/theme.mjs` 默认导出）：

- **meta**：`{ id: 'crimsonfront', title: '赤焦前线：卡牌战争', version: 'v0.1.0' }`。`meta.id = 'crimsonfront'` 一物三用（store KEY 前缀 / `loadGamePack` 目录名 / 命名空间）。
- **tokens（恰 9 键，深蓝 + 金 + 红观感）**：

  | token | 值 | token | 值 |
  |-------|-----|-------|-----|
  | `--bg-0` | `#0f0f1a` | `--accent-contrast` | `#1a1a2e` |
  | `--bg-1` | `#16213e` | `--danger` | `#d94a4a` |
  | `--text-0` | `#e0e0e0` | `--ok` | `#3AA85A` |
  | `--text-1` | `#a0a0a0` | `--neutral` | `#95a5a6` |
  | `--accent` | `#f0c040` | | |

- **fonts**：`--font-title: "Impact, 'Arial Black', sans-serif"`；`--font-body: "'Segoe UI', Arial, sans-serif"`。
- **factions（注入为 `--faction-<id>`，供卡面边框色）**：`coalition: '#4a90d9'`、`crimson: '#d94a4a'`、`psion: '#9b59b6'`。（注意：无 `neutral` 键——neutral 卡面走中性回退。）
- **tabs（6 页签，驱动 tabBar 与屏幕装配）**：`home 主页 🏠` / `match 对战 ⚔` / `gallery 图鉴 📖` / `deck 卡组 🃏` / `settings 设置 ⚙` / `profile 个人 👤`。
- **home**：`logo '赤焦前线'`、`subtitle '卡牌战争'`、`background '/card-games/crimsonfront/config/assets/title_splash.png'`、`buttons`：`{ id:'btn-pve', label:'⚔ 人机对战', route:'match', params:{mode:'pve'} }`、`{ id:'btn-online', label:'🌐 联网对战', route:'onlineLobby' }`。
- **gallery**：`title '卡牌图鉴'`；`factionLabels { coalition:'同盟', crimson:'赤潮', psion:'灵能', neutral:'中立' }`；`rarities` 四项 `[{common,普通},{rare,稀有},{epic,史诗},{legendary,传说}]`。
- **deck**：`title '卡组管理'`，`rules`：`size:30`、`maxCopies:2`，`groups`：
  - `{ key:'building', label:'建筑', max:3, match:{ field:'type', eq:'building' } }`
  - `{ key:'superweapon', label:'超级武器', max:1, match:{ all:[{field:'type',eq:'spell'},{field:'rarity',eq:'legendary'}] } }`（超武 = 传说法术，全场只能 1 张。声明式谓词语义见框架级 §4.7）。
- **settings**：`title '游戏设置'`；`labels.difficulty { easy:'新兵', medium:'老兵', hard:'指挥官' }`；`labels.animSpeed { slow:'慢', normal:'中', fast:'快' }`。
- **profile**：`title '个人中心'`、`defaultUsername '指挥官'`。
- **battle.labels**：`yourTurn 你的回合` / `enemyTurn 敌方回合` / `endTurn 结束回合` / `concede 投降` / `concedeConfirm '确认撤退？此战判负。'` / `win 战役胜利` / `lose 战役失败` / `draw 两败俱伤` / `rematch 再战一局` / `backHome 返回基地`；`base { playerAvatar:null, opponentAvatar:null }`；`card { artBasePath:'/card-games/crimsonfront/config/assets/cards', artEnabled:true }`。
- **match.labels**：`title 出击部署` / `selectDeck 选择卡组` / `selectOpponent 选择对手` / `selectDifficulty 选择难度` / `start 开战`。

### 可复制提示词

```
写 card-games/crimsonfront/config/theme.mjs（ESM，默认导出；shape 见框架级 §4.3）：
  meta:     { id:'crimsonfront', title:'赤焦前线：卡牌战争', version:'v0.1.0' }
  tokens:   { '--bg-0':'#0f0f1a','--bg-1':'#16213e','--text-0':'#e0e0e0','--text-1':'#a0a0a0',
              '--accent':'#f0c040','--accent-contrast':'#1a1a2e','--danger':'#d94a4a','--ok':'#3AA85A','--neutral':'#95a5a6' }
  fonts:    { '--font-title':"Impact, 'Arial Black', sans-serif", '--font-body':"'Segoe UI', Arial, sans-serif" }
  factions: { coalition:'#4a90d9', crimson:'#d94a4a', psion:'#9b59b6' }   // 无 neutral
  tabs:     home/match/gallery/deck/settings/profile（label+icon 见 §1 表）
  home:     logo/subtitle/background + btn-pve(route match,params.mode='pve') + btn-online(route onlineLobby)
  gallery:  factionLabels{coalition:同盟,crimson:赤潮,psion:灵能,neutral:中立}; rarities[common普通,rare稀有,epic史诗,legendary传说]
  deck:     size 30, maxCopies 2, groups: building(max3,type=building) + superweapon(max1, all[type=spell, rarity=legendary])
  settings/profile/battle/match labels 逐字见 §1。
```

### 避坑清单

- **tokens 恰 9 键**：少一键该 CSS 变量不注入、靠 shell.css 中性回退（见框架级 §4.3）。crimsonfront 的 `--ok` 写作 `#3AA85A`（大小写混排，抄准即可，CSS 不敏感）。
- **`factions` 无 `neutral` 键是有意的**：neutral 阵营（建筑 + engineer/attack_dog/war_cry）不注入 `--faction-neutral`，卡面走回退。别自行补 neutral 色导致与源不符。
- **`deck.rules.groups` 的 superweapon 谓词是复合 `all`**：`type=spell` 且 `rarity=legendary`（对应 crimsonfront 的 `weather`/`nuke` 两张传说法术），别写成单字段。
- **主题另有一处冗余 faction 色**：`meta.js` 里含 `theme.factionColors`（`coalition:#3b82f6 / crimson:#dc2626 / psion:#a855f7 / neutral:#9ca3af`），与 `theme.mjs` 的 `factions` **不是同一组值**。外壳注入的是 `theme.mjs.factions`；`meta.js` 那组按源照抄即可，勿混用为 CSS 变量来源（详见 §8 存疑）。

---

## §2 卡池（cards.js / cards.data.mjs 的 crimsonfront 值）

### 设计要点

- **卡池规模**：**56 张**（`allCards` 数组）。`getCardById(id)` / `getCardsByFaction(faction)` / `buildDeckFromCardIds(cardIds)` / `validateDeck(cardIds)` 的**接口 shape 与 config 层如何校验消费见框架级 §3.8 / §3.3**；本节只给 crimsonfront 的卡字段与分布。
- **卡字段 shape（每张卡逐字段）**：`id`、`name`、`faction`（`coalition`/`crimson`/`psion`/`neutral`）、`commander`（`null` 或 `'britain'`/`'france'` 等国家 id）、`type`（`minion`/`spell`/`building`）、`cost`、`attack`、`health`（法术 `attack`/`health` 为 `undefined`）、`tags`（如 `['infantry']`/`['mechanic']`/`[]`）、`keywords`（如 `['battlecry']`/`['stealth','anti_mech']`）、`techLevel`（1–3）、`text`（中文卡面描述）、`rarity`（`common`/`rare`/`epic`/`legendary`——crimsonfront **有 rarity**）、`needsTarget`（布尔，驱动出牌是否需选目标）。
- **按类型分布（合计 56）**：`minion` 34 张、`spell` 13 张、`building` 9 张。
- **按阵营分布（合计 56）**：`coalition` 16（11 单位 + 5 战术）、`crimson` 16（12 单位 + 4 战术）、`psion` 12（9 单位 + 3 战术）、`neutral` 12（2 单位 engineer/attack_dog + 1 战术 war_cry + 9 建筑）。
- **rarity 四档齐全**：`common`/`rare`/`epic`/`legendary`；传说卡 4 张（法术 `weather`、`nuke`；单位 `leviathan`、`psi_avatar`）。其中传说法术 `weather`/`nuke` 即 deck.rules 的「超级武器」。
- **`validateDeck(cardIds)` 的 crimsonfront 规则**：卡组须 **30 张**；同名卡 ≤ **2** 张；`building` 类型 ≤ **3** 张；「超级武器」（`type==='spell' && rarity==='legendary'`）≤ **1** 张。返回 `{ valid, errors }`（报错文案中文，如「卡组必须为 30 张」「建筑卡不能超过 3 张」）。
- **代表性卡例**（供 AI 复刻数值口味，非全表）：`rifleman`（同盟 1/1/2 infantry，战吼+1攻）、`phantom_tank`（同盟 4 费 3/3 mechanic，stealth）、`conscript`（赤潮 1 费 1/1，战吼召唤动员兵）、`nuke`（赤潮 8 费传说法术，全场敌随 -5 + 敌基 -5）、`psi_avatar`（灵能 8 费 4/6 传说，战吼永久夺取）、`barracks`（中立 2 费建筑 3 血，配合 hook 给步兵 -1 费）。

### 可复制提示词

```
写 card-games/crimsonfront/config/cards.js（CJS；接口 shape 见框架级 §3.8）：
  module.exports = { allCards, getCardById, getCardsByFaction, buildDeckFromCardIds, validateDeck }
  allCards = 56 张，每张字段：
    { id, name, faction, commander, type, cost, attack, health, tags[], keywords[], techLevel, text, rarity, needsTarget }
    - faction ∈ {coalition, crimson, psion, neutral}
    - type ∈ {minion, spell, building}；spell 的 attack/health = undefined
    - rarity ∈ {common, rare, epic, legendary}（本游戏 hasRarity=true）
  分布：minion 34 / spell 13 / building 9；coalition16 / crimson16 / psion12 / neutral12
  getCardById 走 Map(allCards.map(c=>[c.id,c]))；getCardsByFaction 返回该阵营 + neutral
  validateDeck(cardIds)：30 张；同名≤2；building≤3；超武(type=spell&&rarity=legendary)≤1；返回 {valid,errors[中文]}
  buildDeckFromCardIds(cardIds)：映射为 {id:`card_${seq++}`, cardId}
```

### 避坑清单

- **法术的 `attack`/`health` 是 `undefined` 而非 0**：schema 只对 `minion` 要求数值 `attack`、对 `minion`/`building` 要求数值 `health`（见框架级 §3.3）；法术这两字段留 `undefined`，别填 0 以免误当数值随从。
- **`validateDeck` 与 theme.deck.rules 是两套校验**：`cards.js` 的 `validateDeck` 是引擎/CLI 侧硬校验（30/2/3/1），theme 的 `deck.rules` 是 UI 卡组屏声明式校验；两者数值须一致（都是 30 / maxCopies 2 / building 3 / superweapon 1），改一处要同步另一处。
- **`hasRarity=true` → 图鉴要渲染稀有度**：卡必须都带 `rarity` 字段，否则图鉴稀有度分组行为不一致（见框架级 §4.8）。四档标签在 theme.gallery.rarities。
- **被校验的是 `pack.cards.allCards`**：导出结构须是 `{ allCards, ... }`，别把数组直接当 `cards` 导出（见框架级 §3 避坑）。

---

## §3 效果（effects.js 的 crimsonfront 值）

### 设计要点

- **`EffectRegistry` 用法、6 个活触发器的调度点、死触发器告警机制见框架级 §3.4–§3.5**。本节只列 crimsonfront **注册了哪些卡的哪些触发器**，以及关键词硬编码的边界。
- **`effects.js` 导出 `registerAllEffects(registry)`**（`index.js` 再导出为 `registerEffects`）。逐卡 `registry.register(cardId, { <trigger>: fn })`。
- **活触发器登记（会被引擎调度，按框架级 §3.5 的 6 个活触发器归类）**：
  - `battlecry`：`rifleman`（+1攻）、`seal`（消灭机械随从）、`sniper`（消灭攻≤1）、`spy`（偷对手手牌）、`conscript`（召唤动员兵）、`mad_bomber`（装炸弹 timer）、`irradiator`（消灭机械）、`psi_initiate`（敌随 -1 攻）、`psi_master`（夺取攻≤3敌随）、`mag_tank`（移动/夺取随从）、`psi_avatar`（永久夺取）、`attack_dog`（消灭攻≤1敌随）、`engineer`（修建筑 +3 血）。
  - `onPlay`（法术）：`airborne`（召 3 个步枪兵）、`phaseshift_spell`（重置攻击）、`satellite`（抽 2）、`industrial`（本回合折扣 3）、`weather`（冻结+3 AOE）、`mad_bomb`（装 timer）、`arc_overload`（敌随 -2 AOE）、`aegis_field`（无敌附魔）、`nuke`（敌随 -5 + 敌基 -5）、`psi_control`（控攻≤3）、`berserk`（+3 攻附魔）、`gene_mut`（攻≤2 变 3/3）、`war_cry`（己方全体 +1 攻）。
  - `onBuild`（建筑落场）：`barracks`、`battle_lab`、`aegis_device`（己方全体无敌）、`psi_sensor`。
  - `deathrattle`：`demo_truck`（全场 -3）、`armored_harvester`（+2 电力）、`psi_clone`（召灵能新兵）。
  - `onTurnStart`：`battalion`（相邻 +1/+1 光环）、`war_factory`（召动员兵）、`ore_refinery`（+1 电力）、`radar`（抽牌）、`repair`（治疗随从）、`nuke_silo`（蓄 3 回合全场 -10）、`thrall_miner`（+1 电力）。
  - `onTurnEnd`：`phantom_tank`（回合末重获 stealth）、`bastion_cannon`（随机敌随 -3）、`arc_tower`（随机敌随 -2 血）、`leviathan`（自身 +1 攻蓄力）。
- **纯关键词硬编码驱动（引擎内建，`register` 空对象或无逻辑体）**：
  - `windfury`（`jet_trooper`）——每回合可攻 2 次。
  - `anti_mech`（`tank_destroyer`、`sabotage_drone`）——对机械增伤/克制。
  - `stealth`（`phantom_tank`、`spy`、`sabotage_drone`、`thunder_sub`）——潜行，不可被指定为攻击目标（见框架级 §3.6 `computeAttackTargets` 默认过滤 stealth）。
  - 这些关键词**不注册效果函数**，仅靠卡的 `keywords` 数组 + 引擎内建逻辑驱动。
- **死触发器 `onAttack`（★ 关键坑）**：crimsonfront 的 `effects.js` **给 5 张卡注册了 `onAttack`**——`beam_tank`（折射溅射）、`phase_legion`（攻击后弹回手牌）、`doom_tank`（溅射相邻）、`arc_trooper`（电弧敌基 -1）、`thunder_sub`（电弧敌基 -2）。但 `onAttack ∈ DEAD_TRIGGERS`（见框架级 §3.5），**引擎无调度点**：这些效果**静默失效**，仅在 `loadGamePack` 时 `console.warn` 告警（设计内输出，非崩溃）。即：这 5 张卡的「攻击时」行为在当前引擎上**不会真正触发**。

### 可复制提示词

```
写 card-games/crimsonfront/config/effects.js（CJS；EffectRegistry 用法 + 6 活触发器见框架级 §3.4–§3.5）：
  module.exports = { registerAllEffects }
  registerAllEffects(registry){ 逐卡 registry.register(cardId, { <trigger>: (state,self,context)=>state }) }
  活触发器登记（会被调度）：
    battlecry: rifleman/seal/sniper/spy/conscript/mad_bomber/irradiator/psi_initiate/psi_master/mag_tank/psi_avatar/attack_dog/engineer
    onPlay:    airborne/phaseshift_spell/satellite/industrial/weather/mad_bomb/arc_overload/aegis_field/nuke/psi_control/berserk/gene_mut/war_cry
    onBuild:   barracks/battle_lab/aegis_device/psi_sensor
    deathrattle: demo_truck/armored_harvester/psi_clone
    onTurnStart: battalion/war_factory/ore_refinery/radar/repair/nuke_silo/thrall_miner
    onTurnEnd: phantom_tank/bastion_cannon/arc_tower/leviathan
  纯关键词（不注册效果，仅 keywords 数组 + 引擎内建）：windfury(jet_trooper) / anti_mech(tank_destroyer,sabotage_drone) / stealth(phantom_tank,spy,sabotage_drone,thunder_sub)
  ⚠ onAttack 是死触发器（框架级 §3.5）：若要保留 beam_tank/phase_legion/doom_tank/arc_trooper/thunder_sub 的「攻击时」行为，
     不能挂 onAttack（会静默失效 + console.warn）。要么接受其失效（与现状一致），要么改挂活触发器/hook。
  辅助函数：summonMinion(state,pi,cardId)（场满 6 则不召）、findOwnerIndex、findMinionById；随从 shape 见效果内 summonMinion。
```

### 避坑清单

- **`onAttack` 静默失效是本包现状**：5 张卡（beam_tank/phase_legion/doom_tank/arc_trooper/thunder_sub）的攻击时效果注册在死触发器上，**当前引擎不会触发**，只 `console.warn`。若要让它们生效，须迁移到活触发器（如 `onTurnEnd`）或走 hook——但那会偏离源仓行为，需明确取舍（见 §8）。
- **关键词卡别重复注册逻辑**：`windfury`/`anti_mech`/`stealth` 由引擎内建，`register` 时传空对象即可（或干脆不 register）；再写效果函数会与内建逻辑冲突。
- **`phantom_tank` 既是关键词又有活效果**：它的 `stealth` 是关键词驱动，但**额外**注册了 `onTurnEnd` 在回合末重新 push `stealth`（攻击后会掉潜行，回合末补回）——这是活触发器，不要删。
- **`summonMinion` 有场面上限 6**：召唤类效果（airborne/conscript/psi_clone/war_factory）在场满 6 时静默不召，勿假设一定成功。

---

## §4 规则（rules.js 的 crimsonfront 值）

### 设计要点

- **flags 值域、schema 白名单校验、hooks 白名单与默认实现、`getEffectiveCost` 注入点见框架级 §3.3 / §3.7**。本节只逐项列 crimsonfront 的取值。
- **flags 取值表**（`card-games/crimsonfront/config/rules.js` 的 `module.exports.flags`）：

  | flag | crimsonfront 值 | 含义 |
  |------|-----------------|------|
  | `baseHealth` | `20` | 基地初始血量 |
  | `maxPower` | `10` | 电力（法力）上限 |
  | `maxTurns` | `50` | 最大回合数 |
  | `startHand` | `3` | 起手牌数 |
  | `startPower` | `0` | 初始电力（MAIN 阶段引擎会置 1，见框架级 §3 避坑） |
  | `attackRule` | `'clear-board'` | 攻击基地前须清空敌方随从（枚举 `clear-board`/`taunt`） |
  | `deathTiming` | `'attack-only'` | 仅在 `handleAttack` 内结算死亡（枚举 `attack-only`/`after-every-command`） |
  | `hasRarity` | `true` | 有稀有度 → 图鉴渲染稀有度 |

- **hooks（`module.exports.hooks`）**：crimsonfront 只定义 **1 个** hook——`getEffectiveCost`：
  - **逻辑**：若当前玩家已建 `barracks`（`player.building && player.building.cardId === 'barracks'`）且待出卡的 `tags` 含 `'infantry'`，则费用 `-1`（`Math.max(0, baseCost - 1)`，不低于 0）；否则返回 `undefined`（回退框架默认 `baseCost`）。
  - **签名 / 注入点见框架级 §3.7**；hook 名 `getEffectiveCost` 已在框架 `VALID_HOOK_NAMES` 白名单内，无需改 schema。

### 可复制提示词

```
写 card-games/crimsonfront/config/rules.js（CJS；flags 值域 + hooks 白名单见框架级 §3.3/§3.7）：
  module.exports = {
    flags: {
      baseHealth: 20, maxPower: 10, maxTurns: 50, startHand: 3, startPower: 0,
      attackRule: 'clear-board', deathTiming: 'attack-only', hasRarity: true,
    },
    hooks: {
      getEffectiveCost(state, player, cardDef, baseCost) {
        if (player.building && player.building.cardId === 'barracks'
            && cardDef.tags && cardDef.tags.includes('infantry')) {
          return Math.max(0, baseCost - 1);     // 兵营在场：步兵 -1 费
        }
        return undefined;                        // 其余走框架默认 baseCost
      },
    },
  };
```

### 避坑清单

- **`startPower:0` 不等于 MAIN 开局法力为 0**：MAIN 阶段引擎会把双方 `power`/`maxPower` 置 1（框架通则，见框架级 §3 避坑），别据此误判开局。
- **`getEffectiveCost` 返回 `undefined` 才回退默认**：返回 `null`/`undefined` 都回退 `baseCost`；别返回 `baseCost` 本身以外的非法值。折扣要 `Math.max(0, …)` 夹底，避免负费用。
- **新增 hook 必须先进 schema 白名单**：crimsonfront 只用 `getEffectiveCost`（已在白名单）。若将来想加别的 hook（如 `canAttackTarget` 让 rocket_truck 只能打基地），须先把名字加进框架 `schema.js` 的 `VALID_HOOK_NAMES`，否则装载即抛（见框架级 §3.3）。
- **flags 键名与枚举严格受控**：未知 flag 名 / 类型不符 / 枚举越界都会在 `validate` 时抛（文案见框架级 §3.3）。`attackRule` 只能 `clear-board`/`taunt`，`deathTiming` 只能 `attack-only`/`after-every-command`。

---

## §5 预设卡组（presetDecks.mjs 的 crimsonfront 值）

### 设计要点

- `card-games/crimsonfront/config/presetDecks.mjs`（ESM，默认导出数组）。每套预设 shape：`{ id, name, shortName, cardIds }`，`cardIds` 为 30 个卡 id 的数组（可重复，遵守同名 ≤2）。
- **共 10 套**（红警式国家阵营），共享 5 副底板牌表：

  | id | name | shortName | 用的牌表 |
  |----|------|-----------|----------|
  | `usa` | 美国铁流 | 美国 | COALITION |
  | `korea` | 韩国精锐 | 韩国 | COALITION |
  | `france` | 法国要塞 | 法国 | FRANCE（含 `bastion_cannon`） |
  | `germany` | 德国装甲 | 德国 | COALITION |
  | `britain` | 英国狙击 | 英国 | BRITAIN（`sniper` 提前起手） |
  | `russia` | 苏俄钢潮 | 苏俄 | CRIMSON |
  | `libya` | 利比亚爆破 | 利比亚 | CRIMSON |
  | `iraq` | 伊拉克辐射 | 伊拉克 | CRIMSON |
  | `cuba` | 古巴游击 | 古巴 | CRIMSON |
  | `psilord` | 灵主异能 | 灵主 | PSILORD |

- **5 副底板牌表**（30 张/副，`cardIds` 为常量数组展开 `[...COALITION]` 等）：
  - `COALITION`：同盟单位为主（weather/barracks/radar/war_factory/engineer×2/attack_dog×2/war_cry×2/rifleman×2/jet_trooper×2/satellite×2/phase_legion×2/tank_destroyer×2/sniper×2/airborne×2/phantom_tank×2/seal×2/spy×2）。
  - `FRANCE`：在同盟基础上加 `bastion_cannon`（要塞巨炮，`commander:'france'`），少 1 张 spy。
  - `BRITAIN`：狙击流，`sniper` 位置提前（放到牌库首位），起手更易拿到（数量仍为 2，受 maxCopies=2 限制，与 COALITION 相同）。
  - `CRIMSON`：赤潮阵营（nuke/conscript×2/sabotage_drone×2/mad_bomb×2/arc_trooper×2/mad_bomber×2/heavy_tank×2/arc_tower×2/demo_truck×2/arc_overload×2/rocket_truck×2 等）。
  - `PSILORD`：灵能阵营（psi_initiate×2/berserk×2/psi_clone×2/thrall_miner×2/savage×2/mag_tank×2/psi_master×2/psi_tower×2/psi_control×2/thunder_sub×2/gene_mut 等）。

### 可复制提示词

```
写 card-games/crimsonfront/config/presetDecks.mjs（ESM，默认导出 10 套）：
  const COALITION = [ ...30 张同盟底板... ];   // weather/barracks/radar/war_factory/engineer×2/…/spy×2
  const FRANCE    = [ ...含 bastion_cannon，30 张... ];
  const BRITAIN   = [ ...狙击流，sniper 提前至牌库首位（数量仍 2），30 张... ];
  const CRIMSON   = [ ...赤潮 30 张... ];
  const PSILORD   = [ ...灵能 30 张... ];
  export default [
    { id:'usa',     name:'美国铁流',   shortName:'美国',   cardIds:[...COALITION] },
    { id:'korea',   name:'韩国精锐',   shortName:'韩国',   cardIds:[...COALITION] },
    { id:'france',  name:'法国要塞',   shortName:'法国',   cardIds:[...FRANCE] },
    { id:'germany', name:'德国装甲',   shortName:'德国',   cardIds:[...COALITION] },
    { id:'britain', name:'英国狙击',   shortName:'英国',   cardIds:[...BRITAIN] },
    { id:'russia',  name:'苏俄钢潮',   shortName:'苏俄',   cardIds:[...CRIMSON] },
    { id:'libya',   name:'利比亚爆破', shortName:'利比亚', cardIds:[...CRIMSON] },
    { id:'iraq',    name:'伊拉克辐射', shortName:'伊拉克', cardIds:[...CRIMSON] },
    { id:'cuba',    name:'古巴游击',   shortName:'古巴',   cardIds:[...CRIMSON] },
    { id:'psilord', name:'灵主异能',   shortName:'灵主',   cardIds:[...PSILORD] },
  ];
  每副 30 张、同名≤2、通过 validateDeck。
```

### 避坑清单

- **多国共享底板是有意的**：usa/korea/germany 共用 COALITION、russia/libya/iraq/cuba 共用 CRIMSON——用 `[...COALITION]` 展开拷贝，别写引用（避免 UI 侧改一副污染多副）。
- **每副必须正好 30 张且过 `validateDeck`**：注意同名 ≤2、building ≤3、超武 ≤1。FRANCE 因加了 `bastion_cannon` 需相应减 1 张以保持 30。
- **`cardIds` 里的 id 必须都在 `allCards`**：出现未知 id 会被 `validateDeck` 判「未知卡牌」。
- **`bastion_cannon`/`sniper` 带 `commander` 字段**：它们绑定特定国家（france/britain），但预设照样按普通卡 id 列入 cardIds，无需特殊处理。

---

## §6 battleFx（battleFx.mjs + videoCrypt.mjs + battleFx.css 的 crimsonfront 值）

### 设计要点

- **presenter 契约 `createBattleFx(services) → { playAttack, playSpell, sfxFor }`、`services` 五键、演出序列（windup → applyFn → computeFacts → 旧 DOM 放粒子 → render）、`getRects` 四形态、facts 七字段、视频覆盖层 `playVideoOverlay` 均见框架级 §5.9–§5.10**。本节只写 crimsonfront 的 FX 填值。
- **`createBattleFx(services)`（`card-games/crimsonfront/config/battleFx.mjs`，ESM）实现要点**：
  - 从框架 import 通用件：`playVideoOverlay`（`framework/ui/shell/fx/videoOverlay.mjs`）、`playAttackAnimation`（`framework/ui/shell/fx/attackAnimator.mjs`）。
  - 从本包 `videoCrypt.mjs` import `xorBytes`、`VIDEO_XOR_KEY`、`SPELL_VIDEO`。
  - 解构 `services` 用到 `{ particles, sound, getRects, reducedMotion }`（`getState` 属契约五键但本 presenter 未用——契约见框架级 §5.9，别删五键之一）。
- **阵营指针色映射 `FACTION_POINTER`（presenter 内部 hex，允许）**：`coalition {#4fc3f7, dash '6,4', lock diamond}`、`crimson {#ff4444, dash '2,3', lock diamond}`、`psion {#b06bff, dash '0', lock spiral}`、`neutral {#cccccc, dash '4,4', lock diamond}`。
- **法术表现注册表 `SPELL_PRESENTATION`（cardId → 表现描述）**：字段 `faction`/`pointer`（是否指向型光缆）/`lock`（`diamond`/`spiral`/`shield`）/`resolveVisual`（`phase`/`summon`/`draw`/`buff-econ`/`bomb`/`shield`/`arc`/`nuke`/`control`/`berserk`/`mutate`/`generic`）/`warnScope`（`enemy`/`ally`/`all`/null，相对施法者）/`shakeTier`（`light`/`medium`/`strong`/`extreme`）/ 各类 sound key / `countdown` / `nukeSequence`。已登记：`phaseshift_spell`/`airborne`/`satellite`/`industrial`/`mad_bomb`/`aegis_field`/`arc_overload`/`nuke`/`psi_control`/`berserk`/`gene_mut`/`weather`/`war_cry`；未登记的法术走 `getPresentation` 缺省（按 `needsTarget` 与 `faction` 派生）。
- **音效目录 `SOUND_CATALOG`（事件名 → WebAudio 声明式 descriptor，`kind: tone|noise|vibrato|sequence`）**：含 `card_play`/`attack`/`attack_base`/`death`/`explosion`/`lightning`/`mind_control`/`freeze`/`heal`/`hero_power`/`turn_start`/`victory`/`defeat`，以及阵营锁定/命中音 `lock_coalition`/`lock_crimson`/`lock_psion`、`hit_coalition`/`hit_crimson`/`hit_psion`、`cast_boom`/`nuke_heartbeat`/`hit_stop_clink`。`sfxFor(event)` 返回该目录项或 `null`。
- **视频施法（加密视频，crimsonfront 专属机制）**：
  - `videoCrypt.mjs`（ESM，无浏览器依赖，Node 可 import 供单测）导出：
    - `VIDEO_XOR_KEY = 'cf-tactical-video-xor-2026-key!!'`（32 字节，≥16）。
    - `SPELL_VIDEO = { airborne:'paratroops.bin', arc_overload:'lightning-chain.bin', nuke:'nuclear-detonation.bin' }`（3 张视频卡 → 加密文件名，相对 `assets/videos/`）。
    - `xorBytes(bytes, key = VIDEO_XOR_KEY)`：对称循环异或，加密=解密同一操作；key 可为字符串（内部 UTF-8 编码）或字节数组。
  - `battleFx.mjs` 内 `loadBlobUrl(cardId)`（浏览器专属）：按 `SPELL_VIDEO[cardId]` 取加密文件 → `fetch`/`electronAPI.readAsset` 读字节 → `xorBytes` 解密 → `URL.createObjectURL(new Blob([dec], {type:'video/mp4'}))`。具名 `export { xorBytes, loadBlobUrl }` 供构建/调试；**纯解密单测走 `videoCrypt.mjs`**。
  - `playSpell` 中：命中 `SPELL_VIDEO[cardId]` 且非 reducedMotion → `playVideoOverlay({ cardId, loadBlobUrl, skipHintText:'点击或按任意键跳过', onUnderlay: ()=>{ applyFn(); render(); } })`，播放成功则视频完全替换程序化表现；失败/reducedMotion 降级到程序化前摇。
- **`battleFx.css`（crimsonfront 专属分镜样式）**：只放**非通用**前摇/结算元素（`cf-` 前缀）——阵营光缆 `cf-cable`、锁定水晶 `cf-lock-crystal`（含 `cf-lock-spiral`/`cf-lock-shield`）、预警椭圆 `cf-warning-ellipse`、核弹遮罩 `cf-nuke-veil`/`cf-nuke-count`、hit-stop 闪白 `cf-hitstop-flash`、炸弹倒计时环 `cf-bomb-count-ring`、召唤光柱 `cf-summon-pillar`、增益轮廓 `cf-buff-outline`、抽牌飞入 `cf-draw-flyer`，含 `prefers-reduced-motion` 降级块。**通用图元（伤害数字/爆炸/闪电/治疗/震屏 + 视频叠加层）由框架 `fx.css` 提供，勿在此重复**。所有元素挂进全屏 `particle-layer`（`position:absolute`）。

### 可复制提示词

```
写 card-games/crimsonfront/config/{videoCrypt.mjs, battleFx.mjs, battleFx.css}（ESM/CSS；presenter 契约见框架级 §5.9–§5.10）：

videoCrypt.mjs（无浏览器依赖，Node 可 import）：
  export const VIDEO_XOR_KEY = 'cf-tactical-video-xor-2026-key!!';   // 32 字节
  export const SPELL_VIDEO = { airborne:'paratroops.bin', arc_overload:'lightning-chain.bin', nuke:'nuclear-detonation.bin' };
  export function xorBytes(bytes, key = VIDEO_XOR_KEY){ /* 对称循环异或；key 字符串→UTF-8 编码 */ }

battleFx.mjs：
  import { playVideoOverlay } from '../../framework/ui/shell/fx/videoOverlay.mjs';
  import { playAttackAnimation } from '../../framework/ui/shell/fx/attackAnimator.mjs';
  import { xorBytes, VIDEO_XOR_KEY, SPELL_VIDEO } from './videoCrypt.mjs';
  const FACTION_POINTER = { coalition:{#4fc3f7,...}, crimson:{#ff4444,...}, psion:{#b06bff,spiral}, neutral:{#cccccc,...} };
  const SPELL_PRESENTATION = { phaseshift_spell/airborne/satellite/industrial/mad_bomb/aegis_field/arc_overload/nuke/psi_control/berserk/gene_mut/weather/war_cry };
  const SOUND_CATALOG = { card_play/attack/attack_base/death/explosion/lightning/…/lock_*/hit_*/cast_boom/nuke_heartbeat/hit_stop_clink };
  async function loadBlobUrl(cardId){ 读 SPELL_VIDEO[cardId] → xorBytes 解密 → URL.createObjectURL(Blob mp4) }
  export { xorBytes, loadBlobUrl };
  export function createBattleFx(services){                          // 契约五键见框架级 §5.9
    const { particles, sound, getRects, reducedMotion } = services;  // getState 属五键但本 presenter 未用，勿删契约
    return {
      async playAttack({ attackerEl, targetEl, applyFn, computeFacts, render }){ /* attackAnimator + 伤害数字/死亡爆点/轻震屏 */ },
      async playSpell({ cardId, card, casterIndex, sourceEl, targetId, applyFn, computeFacts, render }){
        // 非法术直接落地轻结算；SPELL_VIDEO 命中且非 reducedMotion → playVideoOverlay(onUnderlay=applyFn+render)；
        // 否则 windup(nuke/pointer/area) → applyFn → facts=computeFacts() → 旧 DOM 放粒子(resolveVisual) → 震屏/hit-stop → render()
      },
      sfxFor(event){ return SOUND_CATALOG[event] || null; },
    };
  }

battleFx.css：仅 cf- 前缀的非通用分镜（光缆/锁定水晶/预警椭圆/核弹遮罩/hit-stop/倒计时环/召唤光柱/增益轮廓/抽牌飞入 + reduced-motion 降级）；
  通用图元由框架 fx.css 提供，勿重复。元素挂 particle-layer，position:absolute。
```

### 避坑清单

- **`services` 五键别只解构就删**：本 presenter 只用到 4 键，但 `getState` 仍是契约的一部分（见框架级 §5.9）；构造 services 时五键必须齐备，`createBattleFx` 内可只取需要的。
- **视频是混淆级保护，不是加密**：`VIDEO_XOR_KEY` 随包发出，仅阻挡直连引用/直接复制；`xorBytes` 是对称异或（加密=解密）。别把它当真正的安全边界。
- **视频失败必须降级**：`playVideoOverlay` 无 url / fetch 失败 / reducedMotion 时返回 falsy，`playSpell` 要接着走程序化前摇（此时 `applyFn` 尚未执行，勿重复施加）。视频成功（`onUnderlay` 里 `applyFn()+render()`）后要 `return`，不再走程序化。
- **粒子放旧 DOM 再 render**：`resolveVisual` 里按 `getRects` 定位受伤/死亡随从放粒子，必须在 `render()` 之前（死亡随从重绘后 DOM 消失，坐标取不到）——序列见框架级 §5.9。
- **`battleFx.css` 别抄通用图元**：伤害数字/爆炸/闪电/治疗/震屏/视频叠加层由框架 `fx.css` 提供；这里只放 `cf-` 专属前摇/结算，重复会样式冲突。
- **`getRects` 的 target 字符串要透传对齐**：facts 里的 `damages[].target` 是随从 id 或 `'base:N'`，`resolveVisual` 用 `String(d.target).startsWith('base:')` 区分随从/基地——别改这套约定（见框架级 §5.10）。

---

## §7 入口接线（card-games/crimsonfront/ 的 crimsonfront 值）

### 设计要点

- **`run.js` 的 exit 契约、`index.html` 的固定结构、`bootShell` 四参、两份卡牌来源见框架级 §7.1–§7.4 与 §5.3**。本节只给 crimsonfront 的填值。
- **`card-games/crimsonfront/run.js`（CJS，Node CLI 冒烟）**：
  - `require('../../framework/config/loadGamePack')` 与 `require('../../framework/engine/gameEngine')`。
  - `seed = Number(process.argv[2]) || 2026`（crimsonfront 默认 seed **2026**）。
  - `loadGamePack('crimsonfront')` → `buildDeck(pack)`（取前 15 张 minion ×2 = 30 张的临时合法牌组）→ `createGame(pack, { seed, player1:{deck}, player2:{deck} })` → 两次空 `MULLIGAN` → `while(state.winner===null && guard-->0)`（guard 200）里 `runAITurn(state,'hard')` 对轰 + `checkWinner`。
  - exit：分胜负 `process.exit(0)`；guard 耗尽仍无胜负 `console.error` + `process.exit(1)`。
- **`card-games/crimsonfront/web/index.html`（浏览器唯一耦合点）**：
  - `<head>` 三条 `<link>`：`/framework/ui/shell/shell.css`、`/framework/ui/shell/fx/fx.css`、`/card-games/crimsonfront/config/battleFx.css`。**不写 `<title>`**（由 `applyTheme` 从 `theme.meta.title` 注入）。
  - `<script type="module">` import：
    - UI 数据三件：`theme` ← `theme.mjs`、`cards` ← `cards.data.mjs`（纯数据，bootShell 第 2 参）、`presets` ← `presetDecks.mjs`。
    - `bootShell` ← `/framework/ui/shell/boot.js`。
    - 对战 runtime 四件：`meta` ← `dist/meta.mjs`、`rules` ← `dist/rules.mjs`、`registerAllEffects` ← `dist/effects.mjs`、`import * as cardsModule from '/card-games/crimsonfront/config/dist/cards.mjs'`（**带 `getCardById`**），`createBattleFx` ← `battleFx.mjs`。
  - **appRoot 路径处理**：所有 import 路径必须通过 `root(path)` 函数处理，theme 中的图片路径必须通过 `fixPath()` 处理（见框架级 §7.3）。
  - 组装 `runtime = { meta, rules, registerEffects: registerAllEffects, cards: cardsModule, createBattleFx }`，调 `bootShell(theme, cards, presets, runtime)`。
- **两份卡牌来源（crimsonfront 具体路径，别喂反）**：
  - `bootShell` 第 2 参 `cards` = `/card-games/crimsonfront/config/cards.data.mjs`（纯数据数组，图鉴/卡组屏用）。
  - `runtime.cards` = `/card-games/crimsonfront/config/dist/cards.mjs`（含 `getCardById`，`EngineBridge._buildPack()` 用）。

### 可复制提示词

```
写 card-games/crimsonfront/run.js（CJS；exit 契约见框架级 §7.2）：
  const { loadGamePack } = require('../../framework/config/loadGamePack');
  const { createGame, processCommand, runAITurn, checkWinner } = require('../../framework/engine/gameEngine');
  buildDeck(pack){ 取前 15 张 minion ×2 = 30，pack.cards.buildDeckFromCardIds }
  main(){ seed = Number(process.argv[2]) || 2026; pack = loadGamePack('crimsonfront');
    deck = buildDeck(pack); state = createGame(pack,{seed,player1:{deck},player2:{deck}});
    processCommand ×2 MULLIGAN([]); let guard=200;
    while(state.winner===null && guard-->0){ state=runAITurn(state,'hard');
      if(state.winner!==null) break; const w=checkWinner(state); if(w!==null){state.winner=w;break;} }
    if(state.winner===null){ console.error('no winner within guard'); process.exit(1); } process.exit(0); }
  main();

写 card-games/crimsonfront/web/index.html（唯一游戏×外壳耦合点；结构见框架级 §7.3；appRoot 路径处理）：
  <head>
    <link rel="stylesheet" href="/framework/ui/shell/shell.css">
    <link rel="stylesheet" href="/framework/ui/shell/fx/fx.css">
    <link rel="stylesheet" href="/card-games/crimsonfront/config/battleFx.css">
    <!-- 无 <title>：由 applyTheme 从 theme.meta.title 注入 -->
  </head>
  <body><div id="app"></div>
  <script type="module">
    function root(path) {
      if (typeof window !== 'undefined' && window.electronAPI && window.electronAPI.appRoot) {
        return window.electronAPI.appRoot + path;
      }
      return path;
    }

    const [
      { default: theme },
      { default: cards },
      { default: presets },
      { bootShell },
      { default: meta },
      { default: rules },
      { registerAllEffects },
      cardsModule,
      { default: createBattleFx },
    ] = await Promise.all([
      import(root('/card-games/crimsonfront/config/theme.mjs')),
      import(root('/card-games/crimsonfront/config/cards.data.mjs')),
      import(root('/card-games/crimsonfront/config/presetDecks.mjs')),
      import(root('/framework/ui/shell/boot.js')),
      import(root('/card-games/crimsonfront/config/dist/meta.mjs')),
      import(root('/card-games/crimsonfront/config/dist/rules.mjs')),
      import(root('/card-games/crimsonfront/config/dist/effects.mjs')),
      import(root('/card-games/crimsonfront/config/dist/cards.mjs')),
      import(root('/card-games/crimsonfront/config/battleFx.mjs')),
    ]);

    function fixPath(p) {
      if (!p) return p;
      if (p.startsWith('/')) return root(p);
      return p;
    }

    if (theme.home && theme.home.background) {
      theme.home.background = fixPath(theme.home.background);
    }
    if (theme.gallery && theme.gallery.artBasePath) {
      theme.gallery.artBasePath = fixPath(theme.gallery.artBasePath);
    }
    if (theme.battle && theme.battle.card && theme.battle.card.artBasePath) {
      theme.battle.card.artBasePath = fixPath(theme.battle.card.artBasePath);
    }

    const runtime = { meta, rules, registerEffects: registerAllEffects, cards: cardsModule, createBattleFx };
    bootShell(theme, cards, presets, runtime);                             // 四参
  </script></body>
```

### 避坑清单

- **两份卡牌别喂反（★ 最易错）**：`cards.data.mjs`（纯数据）→ `bootShell` 第 2 参；`dist/cards.mjs`（含 `getCardById`）→ `runtime.cards`。喂反 → 起局 `getCardById is not a function`（见框架级 §5.3 / §7.4）。crimsonfront 的 `index.html` 两份**都要 import**（不是二选一）。
- **别写 `<title>`**：标题来自 `theme.meta.title`（'赤焦前线：卡牌战争'）经 `applyTheme` 注入。
- **import 用绝对服务器根路径**：HTTP 服务器从仓库根起（如 `python -m http.server`），`card-games/crimsonfront/web/` 层级下相对路径会错位。
- **appRoot 路径处理**：Electron 环境中绝对路径会解析到文件系统根目录，必须通过 `root(path)` 函数加上 `appRoot` 前缀；theme 中的图片路径也必须用 `fixPath()` 处理（见框架级 §7.3）。
- **run.js 胜负判断守 `=== null`**：`while(winner===null)` 与 `checkWinner(...)!==null`，禁 `!winner`（座位 0 获胜是 falsy `0`，见框架级 §7.2）。默认 seed 2026 可复现。
- **改了源要先 `build:esm`**：`index.html` 加载 `dist/*.mjs`；改 `cards.js`/`effects.js`/`rules.js`/`meta.js` 后不重跑 `build:esm`，浏览器仍是旧逻辑（Node 侧却已生效，易误判）。

---

## §8 本游戏避坑 + 验收

### 设计要点

crimsonfront 特有的、易踩的坑与最终验收清单。

### 可复制提示词

```
交付 crimsonfront 前逐项自检：
1. rarity 富色板：56 卡全带 rarity（common/rare/epic/legendary），hasRarity=true，图鉴稀有度分组正常。
2. 视频 XOR 单测：写 videoDecrypt.test.mjs 覆盖 videoCrypt.mjs——
   - xorBytes(xorBytes(data,key),key) === data（对称往返）；
   - VIDEO_XOR_KEY 长度 ≥16；SPELL_VIDEO 三键 airborne/arc_overload/nuke 映射存在。
3. EngineBridge cards 须喂 dist/cards.mjs（含 getCardById），不是 cards.data.mjs（见框架级 §5.3）。
4. onAttack 死触发器：确认 beam_tank/phase_legion/doom_tank/arc_trooper/thunder_sub 的 onAttack 现状（静默失效 + console.warn），
   若要生效须迁到活触发器/hook——明确取舍，勿默认它们会触发。
5. CLI 冒烟：node card-games/crimsonfront/run.js → exit=0。
6. 浏览器完整一局：起服务器 → 开 card-games/crimsonfront/web/index.html → PVE 打完一局无报错，视频施法（nuke/airborne/arc_overload）可播放且失败能降级。
7. 三条边界 grep（框架级 §4.2，在仓库根跑，均须 exit=1 无匹配）：
   grep -rn "card-games/" framework/ui/
   grep -rEn "#[0-9a-fA-F]{3,6}" framework/ui/
   grep -rEn "crimsonfront|赤焦|coalition|crimson|psion" framework/ui/
8. 可选对拍：与源仓 crimsonfront 同 seed 跑 run.js，比对 winner/turn/base 收敛。
```

### 避坑清单

- **rarity 富色板**：crimsonfront `hasRarity=true`，卡池 56 张必须张张带 `rarity`；缺字段会让图鉴稀有度分组与 deck.rules 超武谓词（`rarity===legendary`）失效。
- **视频 XOR 单测走 `videoCrypt.mjs`**：纯解密逻辑抽在 `videoCrypt.mjs`（无浏览器依赖）就是为了可单测；`battleFx.mjs` 的 `loadBlobUrl` 依赖 `fetch`/DOM 不易单测。测 `xorBytes` 对称往返 + 密钥长度 + 三视频卡映射。
- **`EngineBridge` cards 喂 `dist/cards.mjs`**：这是 crimsonfront 最易崩的接线点——`runtime.cards` 必须是带 `getCardById` 的 dist 模块（见框架级 §5.3 / §7.4）。
- **`onAttack` 五卡失效需明示**：这是从源码核对出的真实现状（框架 `onAttack ∈ DEAD_TRIGGERS`），重生成时要么保持一致（接受失效），要么显式迁移触发器——不要以为写了 `onAttack` 就生效。
- **三份 faction 色不一致（存疑）**：`meta.js.theme.factionColors`（#3b82f6/#dc2626/#a855f7/#9ca3af）、`theme.mjs.factions`（#4a90d9/#d94a4a/#9b59b6）、`battleFx.mjs.FACTION_POINTER`（#4fc3f7/#ff4444/#b06bff/#cccccc）三处阵营色各不相同。外壳 CSS 变量只取 `theme.mjs.factions`；`meta.js` 那组似为历史遗留（config 层不读它作色）；presenter 指针色独立。重生成时**按源逐处照抄**，别强行统一为一组值。
- **home 无 overlay/glow**：`theme.mjs.home` 只有 `logo/subtitle/background/buttons`，无 overlay/glow 字段（若参考旧简报描述过 splash overlay/glow，以源码为准——本包没有）。

---

## §8.5 联网配置（crimsonfront 值）

> 契约与模块接口见框架级 `FRAMEWORK_DESIGN_PROMPT.md §8`，本节只给 crimsonfront 具体值，不复述接口。

### 设计要点

- **`theme.online`**（`card-games/crimsonfront/config/theme.mjs` 新增块）：
  - `serverUrl: 'ws://localhost:8099'`
  - lobby / disconnect 文案走 CrimsonFront 军事风（如大厅标题「联网前线」、等待「正在搜寻对手…」、断线「与前线失去联络」、对手掉线「对手已撤离战场」、重连成功「通讯已恢复」）。
- **`theme.chat`**（同 theme.mjs）：
  - `presets.lobby` / `presets.battle`：各若干条快捷语（战地口吻，如「准备就绪」「掩护我」「打得好」）。
  - `labels`：面板标题「战地通讯」等。
  - `rateLimit`（与服务器 chatRateLimit 呼应）、`maxLen`。
- **`card-games/crimsonfront/server.js`**（CJS 入口）：`loadGamePack('crimsonfront')` → 组 `enginePack = { createGame:(config)=>engine.createGame(pack,config), processCommand, checkWinner, buildDeck: pack.cards.buildDeckFromCardIds }` → `startWSServer(Number(process.argv[2])||8099, enginePack)`。
- **`package.json`**：加 `"crimsonfront:server": "node card-games/crimsonfront/server.js"`；根依赖含 `ws`。
- **编号说明**：§8.5 独立插入于 §8 与 §9 之间；§9（游戏级归档提示词）编号不变，交叉引用保持一致。

### 可复制提示词

> 为 crimsonfront 启用联网（框架联网层已就绪，见 FRAMEWORK §8）：
> 1. `card-games/crimsonfront/config/theme.mjs` 加 `online`（`serverUrl:'ws://localhost:8099'` + CrimsonFront 军事风 lobby/disconnect 文案）与 `chat`（`presets.lobby`/`presets.battle` 快捷语、`labels`「战地通讯」、`rateLimit`/`maxLen`）两块。
> 2. 建 `card-games/crimsonfront/server.js`（CJS）：`loadGamePack('crimsonfront')` → 组 enginePack（`createGame:(config)=>engine.createGame(pack,config)`、processCommand、checkWinner、`buildDeck:pack.cards.buildDeckFromCardIds`）→ `startWSServer(Number(process.argv[2])||8099, enginePack)` + 一行启动日志。
> 3. `package.json` scripts 加 `"crimsonfront:server": "node card-games/crimsonfront/server.js"`；dependencies 含 `ws`。
> 4. 验证：`npm run crimsonfront:server`（监听 8099）→ 两浏览器标签页首页点「联网对战」→ 快速匹配撮合 → 各自收到正确座席 `game_start` → 出牌/认输/聊天/断线重连正常。

### 避坑清单

- **端口 8099**：`theme.online.serverUrl`、`server.js` 默认参、框架 `netManager` 默认三处必须一致；勿用 8090/8091（被 IDE 预览代理影子占用，WS 握手被拦成 HTTP 200）。
- **enginePack 包装**：`createGame` 必须包成 `(config)=>engine.createGame(pack,config)`（真实引擎双参 `createGame(pack,config)`）；deck 由 `buildDeck` 在服务器侧构建，勿在别处二次构建。
- **theme 文案不越界**：online/chat 文案属游戏值，写在 `card-games/crimsonfront/config/theme.mjs`，不得渗入 `framework/ui/`（否则命中外壳边界 grep）。

---

## §9 游戏级归档提示词

### 设计要点

crimsonfront 游戏专属切片（卡池/效果/主题/FX/预设卡组/入口接线等）完成后的归档流程。与框架级 `FRAMEWORK_DESIGN_PROMPT.md §A.4` 同结构，但作用域为游戏层决策。

### 状态标记约定

与框架级 §A.4.1 相同：

| 文件类型 | 位置 | 完成标记 | 跳过条件 |
|----------|------|----------|----------|
| spec（`docs/superpowers/specs/*.md`） | 头部 frontmatter | `> 状态：已完成` | `> 状态：待实施` |
| plan（`docs/superpowers/plans/*.md`） | Task checkbox | 所有 checkbox 均为 `- [x]` | 存在未勾选 `- [ ]` |
| sdd（`.superpowers/sdd/*`） | 文件名 / 内容 | 文件名含 `report` 或内容含 `## Result` | 无完成标记 |

### 提取模板

与框架级 §A.4.2 相同的四要素，但聚焦 crimsonfront 游戏层决策（卡池/效果/主题/FX/预设/入口接线），非框架骨架决策：

- **决策**：做了什么、方案选哪个（1-3 句）
- **选型理由**：为什么选这个方案、对比方案为何放弃（1-3 句）
- **踩坑与解决方案**：实施中遇到的问题及解法（按条列出）
- **数据模型/契约/常量**：只存在于过程文件、代码难回溯的信息

### 可复制提示词

```
请执行 crimsonfront 游戏级归档流程：

1. 扫描以下三个目录，按状态标记约定筛选已完成文件：
   - docs/superpowers/plans/
   - docs/superpowers/specs/
   - .superpowers/sdd/

2. 逐文件按四要素提取，聚焦 crimsonfront 游戏层决策（卡池/效果/主题/FX/预设/入口接线），非框架骨架决策。

3. 跨功能重复的通用经验合并到 docs/PROJECT_EXPERIENCES.md 第一部分去重。

4. 将游戏切片条目追加到 docs/PROJECT_EXPERIENCES.md 对应编号条目。

5. 删除已归档的原始文件。

6. 更新 AGENTS.md 历史记录 + MODULE_INDEX.md + 死链核查。
```

### 完成后自查清单

- [ ] 总结条目含四要素、无占位符（TBD/TODO）
- [ ] 原始 plan/spec/sdd 文件已删除
- [ ] `AGENTS.md` 历史记录已追加
- [ ] `MODULE_INDEX.md` 受影响模块已更新
- [ ] 死链已核查
- [ ] `docs/PROJECT_EXPERIENCES.md` 来源计数已更新

### 避坑清单

- **区分框架级 vs 游戏级**：框架骨架决策（引擎参数化/配置装载/UI 外壳/工具链）归 `FRAMEWORK_DESIGN_PROMPT.md §A.4`；游戏专属决策（卡池/效果/主题/FX/预设）归本节。同一批归档可能同时涉及两者，分别提炼。
- **未来新游戏**：新增游戏的 `<GAME>_DESIGN_PROMPT.md` 按本节同模式加 §9。
