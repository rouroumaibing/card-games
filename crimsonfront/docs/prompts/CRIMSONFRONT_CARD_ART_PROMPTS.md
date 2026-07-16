# 赤焦前线卡牌游戏 — 卡牌插画提示词

> 何时读我：生成/调整卡牌插画时 ｜ 依赖：CRIMSONFRONT_DESIGN.md（卡牌定义） ｜ 完整索引见根 AGENTS.md

> 每张卡牌独立提示词，确保视觉差异化
> **每张卡主体描述中明确阵营标识，光影标记强化阵营色**

---

## 生成尺寸约定

**生成参数**：
- 底部水印带：豆包出图会在底部附加约 150px 的"AI生成"水印带
- 处理流程：`scripts/remove_watermark.py` 固定裁剪底部 150px 去除水印（`CROP_HEIGHT=150`）
- 出图建议：主体内容画在上部，底部约 150px 留给可丢弃的水印带；正方形图（如 app_icon）裁剪后会自动垂直拉伸回正方形
- 格式：PNG

---

## 通用风格锁

**风格前缀（所有卡牌共用）：**
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
```

**构图后缀（所有卡牌共用）：**
```
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

**阵营标识规则（主体描述中必须包含）：**
- 同盟：描述中包含 `Coalition forces` + 具体阵营徽记（蓝色三角盾臂章/交叉箭头肩章/同盟旗帜）
- 赤潮：描述中包含 `Crimson Tide army` + 具体阵营徽记（火焰浪潮帽徽/双刃纹章/赤潮旗帜）
- 灵能：描述中包含 `Psion order` + 具体阵营徽记（紫色裂瞳符文/灵能主教标志/裂瞳纹章）
- 中立：描述中包含 `neutral military` + 无阵营徽记（通用军事设计）

**阵营光影标记：**
- 同盟：`cool blue ambient light, Coalition blue shield insignia glow`
- 赤潮：`warm red ambient light, Crimson flame emblem glow`
- 灵能：`mystic purple ambient light, Psion split-pupil rune glow`
- 中立：`neutral gray-green ambient light`


## 阵营标识汇总

| 阵营 | 主体描述标识 | 具体徽记 | 光影标记 |
|------|-------------|----------|----------|
| 同盟 | `Coalition forces` | 蓝色三角盾臂章/交叉箭头肩章/同盟旗帜 | `cool blue ambient light, Coalition blue shield insignia glow` |
| 赤潮 | `Crimson Tide army` | 火焰浪潮帽徽/双刃纹章/赤潮旗帜 | `warm red ambient light, Crimson flame emblem glow` |
| 灵能 | `Psion order` | 紫色裂瞳符文/灵能主教标志/裂瞳纹章 | `mystic purple ambient light, Psion split-pupil rune glow` |
| 中立 | `neutral military` | 无阵营徽记/通用军事设计 | `neutral gray-green ambient light` |

## 防重复差异化策略

| 维度 | 差异化手段 |
|------|-----------|
| 阵营标识 | 同盟蓝盾/赤潮火焰/灵能裂瞳/中立无徽 — 每阵营固定 |
| 姿态 | 站立/蹲伏/飞行/冲锋/潜伏/施法 — 每张卡不同 |
| 视角 | 平视/仰视/俯视/侧面/背面 — 避免重复 |
| 光效 | 同盟蓝光/赤潮红光/灵能紫光/中立灰光 |
| 环境 | 沙地/雪地/水面/工厂/天空/地下 — 按单位类型分配 |
| 动作 | 攻击/防御/行军/建造/施法/潜行 — 按关键词分配 |
| 尺度 | 步兵近景/载具中景/建筑远景/法术抽象 — 按类型分配 |


---

## 同盟单位（12张）

### 1. rifleman — 步枪兵
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
a Coalition forces rifleman infantry soldier crouching behind sandbags, blue triangular shield patch on shoulder, M16 rifle at ready, determined expression under steel helmet with Coalition crossed-arrows emblem, sandbag fortification with Coalition flag waving behind, taking cover stance,
cool blue ambient light, Coalition blue shield insignia glow,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

### 2. jet_trooper — 喷射飞兵
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
a Coalition forces jet trooper flying upward with jetpack, Coalition blue shield on flight helmet, rocket flames trailing below, arms spread for balance, goggles reflecting sky, wind whipping Coalition-issue flight suit, ascending through clouds, dynamic upward perspective,
cool blue ambient light, Coalition blue shield insignia glow,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

### 3. phantom_tank — 蜃影坦克
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
a Coalition forces phantom tank partially dissolving into forest background, Coalition blue shield emblem on turret fading with camouflage, tree-pattern shimmering with distortion waves, only cannon barrel clearly visible emerging from the phantom shimmer, heat haze distortion around hull, mysterious stealth predator of Coalition armor,
cool blue ambient light, Coalition blue shield insignia glow,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

### 4. beam_tank — 光束坦克
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
a Coalition forces beam tank with massive crystalline focusing cannon firing a blinding white light beam, Coalition crossed-arrows emblem etched on crystal housing, rainbow refraction splitting from main beam into side rays, faceted crystal array on turret glowing with spectral colors, energy discharge crackling around barrel, devastating Coalition focused light weapon,
cool blue ambient light, Coalition blue shield insignia glow,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

### 5. phase_legion — 相位军团兵
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
a Coalition forces phase legionnaire in chrome-plated phase suit with Coalition blue shield on chest plate, glowing blue phase-shift device on back, body partially phasing in and out of existence, time distortion ripples around hands, reality warping effect, one arm dissolving into blue particles, Coalition phase-shifting warrior,
cool blue ambient light, Coalition blue shield insignia glow,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

### 6. seal — 海豹部队
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
a Coalition forces Navy SEAL commando in tactical wetsuit emerging from water, Coalition flag patch on shoulder, night-vision goggles pushed up on helmet, suppressed pistol raised, C4 explosive charge visible on belt, water droplets on face, stealthy amphibious assault pose,
cool blue ambient light, Coalition blue shield insignia glow,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

### 7. tank_destroyer — 坦克杀手
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
a Coalition forces Tank Destroyer with oversized anti-tank cannon, Coalition blue shield painted on angular hull, long barrel protruding, parked in ambush position among rubble, reinforced frontal armor plates, specialized armor-piercing rounds stacked beside turret, Coalition anti-armor hunter,
cool blue ambient light, Coalition blue shield insignia glow,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

### 8. battalion — 装甲堡垒
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
a Coalition forces armored fortress massive armored vehicle on tracks, Coalition crossed-arrows emblem on bunker-like superstructure, multiple firing ports with Coalition soldiers visible inside, heavy machine gun on top, rolling bunker advancing through battlefield, impenetrable Coalition mobile stronghold,
cool blue ambient light, Coalition blue shield insignia glow,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

### 9. spy — 间谍
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
a Coalition forces spy in tailored suit adjusting cufflinks with hidden Coalition micro-transmitter, half-face hidden in shadow, holding dossier folder with Coalition intelligence seal, deceptive charming smile, one hand behind back concealing silenced pistol, mirror sunglasses reflecting enemy base, Coalition master of disguise,
cool blue ambient light, Coalition blue shield insignia glow,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

### 10. sniper — 狙击手（英国专属）
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
a Coalition British SAS sniper in ghillie suit prone position, Union Jack and Coalition blue shield patch on shoulder, one eye closed peering through scope, finger on trigger, breath held steady, target in crosshairs visible in scope reflection, absolute stillness and precision, Coalition long-range death dealer,
cool blue ambient light, Coalition blue shield insignia glow,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

### 11. bastion_cannon — 要塞巨炮（法国专属）
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
a Coalition French bastion cannon artillery emplacement, French tricolor and Coalition blue shield on concrete fortification, massive barrel angled upward, shell ejecting after firing, muzzle flash illuminating coastal cliff, defensive Coalition fortress weapon, intimidating scale,
cool blue ambient light, Coalition blue shield insignia glow,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

### 12. weather — 气象风暴
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
a Coalition forces Weather Storm device with satellite dish array, Coalition blue shield emblem on control tower, lightning bolts arcing between antenna towers, storm clouds swirling above, freezing rain and ice crystals forming around the device, Coalition atmospheric domination weapon, godlike weather manipulation,
cool blue ambient light, Coalition blue shield insignia glow,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

---

## 同盟战术（4张）

### 13. airborne — 空降部队
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
three Coalition forces paratroopers descending from night sky, Coalition flag patches on shoulders, parachutes billowing above, tracers and flares in background, one soldier aiming rifle mid-descent, dramatic Coalition aerial deployment, airborne assault from above,
cool blue ambient light, Coalition blue shield insignia glow,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

### 14. phaseshift_spell — 相位传送
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
a Coalition tank being teleported in a blue phase-shift energy field, Coalition blue shield visible on tank turret, half materialized at destination, space-time portal swirling with clockwork gears and temporal energy, Coalition warping reality, teleportation vortex,
cool blue ambient light, Coalition blue shield insignia glow,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

### 15. satellite — 间谍卫星
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
a Coalition forces spy satellite orbiting Earth, Coalition blue shield emblem on satellite body, solar panels extended, camera lens pointed downward, Earth curvature visible below, data streams and surveillance feeds projecting from dish, Coalition all-seeing eye in orbit,
cool blue ambient light, Coalition blue shield insignia glow,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

### 16. industrial — 工业时代
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
a massive Coalition wartime factory assembly line with tanks rolling off production, Coalition blue shield on factory wall banner, sparks flying from welding, workers in overalls, conveyor belts and cranes, Coalition industrial war machine at full capacity, wartime production miracle,
cool blue ambient light, Coalition blue shield insignia glow,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

---

## 赤潮单位（12张）

### 17. conscript — 动员兵
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
a Crimson Tide army conscript in greatcoat standing at attention, crimson flame emblem on fur ushanka hat, twin-blade crest badge on chest, bolt-action rifle shouldered, determined but weary expression, snow on shoulders, two identical soldiers flanking in formation, patriotic Crimson duty,
warm red ambient light, Crimson flame emblem glow,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

### 18. arc_trooper — 电弧步兵
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
a Crimson Tide army arc trooper in heavy rubber insulated suit, crimson flame emblem on helmet visor, twin-blade crest on chest plate, arc coil gauntlets crackling with electric arcs between fingertips, blue-white lightning dancing along arms, insulated visor glowing, Crimson electromagnetic warrior, walking lightning rod,
warm red ambient light, Crimson flame emblem glow,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

### 19. doom_tank — 末日坦克
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
a Crimson Tide army doom tank, colossal double-barreled heavy tank with crimson flame emblem on turret, twin-blade crest on hull side, crushing wreckage beneath treads, both cannons firing simultaneously, muzzle flash and smoke, depleted uranium shells ejecting, armor plates scarred but unbroken, unstoppable Crimson war machine, battlefield dominator,
warm red ambient light, Crimson flame emblem glow,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

### 20. leviathan — 巨鲸飞艇
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
a Crimson Tide army leviathan airship looming overhead, enormous crimson flame emblem and twin-blade crest on silver envelope, bomb bay doors opening, payload of bombs visible inside, searchlights below, casting massive shadow on ground, terrifying Crimson aerial dreadnought,
warm red ambient light, Crimson flame emblem glow,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

### 21. mad_bomber — 疯狂炸弹客
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
a Crimson Tide army mad bomber demolitions expert, crimson flame emblem on beret, twin-blade crest on sleeve, wild eyes and manic grin, holding ticking time bomb with visible countdown timer, dynamite sticks strapped to chest, one finger on detonator, unhinged Crimson laughter, explosive madness personified,
warm red ambient light, Crimson flame emblem glow,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

### 22. sabotage_drone — 破坏机器人
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
a Crimson Tide army sabotage drone, spider-like mechanical drone with crimson flame optical sensor, twin-blade crest etched on carapace, razor metal legs, drill appendage extended, leaping onto tank armor, metallic limbs piercing through steel, Crimson parasitic war machine, mechanical terror,
warm red ambient light, Crimson flame emblem glow,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

### 23. heavy_tank — 重型坦克
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
a Crimson Tide army heavy tank in desert terrain, crimson flame emblem on turret, twin-blade crest on hull, single powerful cannon aimed forward, angular sloped armor design, engine exhaust smoking, treads churning sand, reliable workhorse of Crimson armor, no-nonsense Crimson war machine,
warm red ambient light, Crimson flame emblem glow,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

### 24. rocket_truck — 火箭车
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
a Crimson Tide army rocket launcher truck, crimson flame emblem on cab door, twin-blade crest on missile body, raised launch rail, massive ballistic missile loaded and ready, flames igniting at rocket base, launch sequence initiated, Crimson long-range artillery platform, devastating strategic bombardment,
warm red ambient light, Crimson flame emblem glow,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

### 25. irradiator — 辐射兵
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
a Crimson Tide army irradiator in heavy radiation suit, crimson flame emblem on helmet, twin-blade crest on chest plate, deployable radiation cannon, green radioactive glow emanating from weapon, hazard symbols on armor, deploying rad-beam in sweeping arc, toxic wasteland spreading beneath feet, Crimson radioactive death dealer,
warm red ambient light, Crimson flame emblem glow,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

### 26. arc_tower — 电弧塔
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
a Crimson Tide army arc tower defense installation, crimson flame emblem on concrete base, twin-blade crest on coil housing, electricity arcing between coil rings, blue-white lightning bolt discharging from top, hazard warning signs, Crimson electromagnetic defense installation, crackling energy weapon,
warm red ambient light, Crimson flame emblem glow,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

### 27. demo_truck — 自爆卡车
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
a Crimson Tide army Demolition Truck packed with explosives, crimson flame emblem on cab, twin-blade crest on cargo cover, dynamite and fuel barrels visible in open cargo, driver grinning maniacally, vehicle speeding toward target, sparks and flames already igniting, Crimson mobile bomb on wheels, kamikaze delivery,
warm red ambient light, Crimson flame emblem glow,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

### 28. armored_harvester — 装甲矿车
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
a Crimson Tide army armored harvester vehicle, crimson flame emblem on hull, twin-blade crest on ore scoop, mounted machine gun on top, ore scoop raised carrying glowing blue ore crystals, armored transport bed full of resources, treads in mining quarry, Crimson resource harvester with teeth, armed economic engine,
warm red ambient light, Crimson flame emblem glow,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

---

## 赤潮战术（4张）

### 29. mad_bomb — 定时炸弹
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
a Crimson Tide army timed bomb, ticking time bomb with twin-blade crest stamped on casing, crimson flame emblem on detonator, multiple dynamite sticks bundled together, countdown timer showing 3 seconds, fuse sparking, wires snaking outward, Crimson explosive charge ready to detonate, imminent destruction,
warm red ambient light, Crimson flame emblem glow,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

### 30. arc_overload — 电弧过载
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
a Crimson Tide army arc tower overloading with chain lightning, crimson flame emblem on reactor core, twin-blade crest on control panel, multiple bolts striking in all directions, electrical storm erupting from reactor core, blue-white energy cascade, Crimson power grid meltdown, devastating electromagnetic pulse,
warm red ambient light, Crimson flame emblem glow,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

### 31. aegis_field — 无敌力场
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
the Crimson Tide army aegis field device activating, crimson flame emblem and twin-blade crest on generator housing, shimmering red invulnerability field enveloping a Crimson tank, energy shield deflecting incoming shells, impenetrable force barrier, Crimson superweapon glow, invincible protection aura,
warm red ambient light, Crimson flame emblem glow,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

### 32. nuke — 核弹
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
a Crimson Tide army nuclear missile launch, crimson flame emblem on warhead, twin-blade crest on launch tower, mushroom cloud rising over devastated cityscape, blinding white flash at base, shockwave ring expanding outward, orange fireball, cataclysmic destruction, Crimson nuclear supremacy, total annihilation from above,
warm red ambient light, Crimson flame emblem glow,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

---

## 灵能单位（9张）

### 33. psi_initiate — 灵能新兵
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
a Psion order initiate in purple robes with Psion split-pupil rune on chest, glowing psi-blaster in hand, brainwaves visible as purple energy emanating from forehead, psychic focus pose, mind power radiating outward, disciple of the Psion order, psychic warrior in training,
mystic purple ambient light, Psion split-pupil rune glow,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

### 34. savage — 狂暴巨兽
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
a Psion order savage, massive hulking figure with Psion split-pupil rune branded on forehead, overgrown muscles, fists raised to smash, veins pulsing with purple genetic enhancement, torn purple uniform with Psion rune, primal rage expression, ground cracking under feet, Psion order genetically modified berserker,
mystic purple ambient light, Psion split-pupil rune glow,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

### 35. psi_master — 灵能操纵者
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
a Psion order psi master unit with massive brain-exposing helmet, Psion split-pupil rune on helmet crest, psychic tendrils extending from head controlling enemy soldier, victim's eyes glowing purple in trance, Psion mind domination in action, puppet master of minds,
mystic purple ambient light, Psion split-pupil rune glow,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

### 36. mag_tank — 磁力坦克
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
a Psion order magnetic hover tank, Psion split-pupil rune on chassis, levitating enemy vehicle with magnetic beam, purple energy field lifting target off ground, anti-gravity tractor beam, hovering chassis with no treads, Psion electromagnetic levitation weapon,
mystic purple ambient light, Psion split-pupil rune glow,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

### 37. psi_clone — 灵能复制体
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
a Psion order clone with identical bald head and goatee, Psion split-pupil rune tattoo on forehead, two copies standing side by side, both with hands on temples projecting psychic energy, mirror-image duplication, psychic resonance between clones, uncanny resemblance to the Psion overlord,
mystic purple ambient light, Psion split-pupil rune glow,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

### 38. thunder_sub — 雷鸣潜艇
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
a Psion order stealth deep-sea submarine surfacing from dark ocean, Psion split-pupil rune on conning tower, missile hatches opening on deck, underwater ordnance launching from bow, water cascading off hull, periscope extended, covert sea combat vessel, deep sea assault warship,
mystic purple ambient light, Psion split-pupil rune glow,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

### 39. thrall_miner — 苦工矿场
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
a Psion order mobile mining outpost, Psion split-pupil rune on mining platform, large-scale mining mechanical facility with coordinated staff gathering mineral resources, unified energy adjustment equipment, complete ore processing machinery, mobile resource production base, psychic energy coordinated mining station,
mystic purple ambient light, Psion split-pupil rune glow,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

### 40. psi_tower — 灵能塔
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
a Psion order psychic dominator tower, Psion split-pupil rune on obsidian base, spiraling obsidian structure with giant brain on top, psychic waves pulsing outward in rings, enemy soldiers approaching with blank purple-glowing eyes, Psion mind-control beacon, psychic fortress,
mystic purple ambient light, Psion split-pupil rune glow,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

### 41. psi_avatar — 灵能化身
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
the Psion overlord of the Psion order in a command chair on a floating platform, bald head with psi-amplifier crown bearing the Psion split-pupil rune, eyes glowing with supreme psychic power, entire battlefield visible in mind's eye projection behind him, absolute mental dominator, master of the Psion order's mind-control army,
mystic purple ambient light, Psion split-pupil rune glow,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

---

## 灵能战术（3张）

### 42. gene_mut — 基因突变
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
a Psion order genetic mutation experiment, Psion split-pupil rune glowing on vats of glowing green bio-agent, DNA helix strands spiraling with purple psychic energy, test subject transforming with muscles swelling and bones reshaping, bio-containment chamber cracking under pressure, mutagenic gas billowing, gene-splicing apparatus with syringes and tubes, Psion order twisted evolution project, body horror transformation,
mystic purple ambient light, Psion split-pupil rune glow,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

### 43. psi_control — 灵能操控
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
a Psion order mind control spell, Psion split-pupil rune glowing in center of spell circle, purple energy tendrils wrapping around enemy soldier's head, victim's eyes turning from normal to glowing purple, consciousness being overwritten, Psion mental domination spell, psychic possession,
mystic purple ambient light, Psion split-pupil rune glow,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

### 44. berserk — 狂暴
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
a soldier driven to berserk rage by the Psion order, Psion split-pupil rune burning on forehead, veins bulging with purple energy, muscles swelling beyond natural limits, eyes wild with fury, frothing at mouth, fists clenched so hard they bleed, Psion uncontrollable combat frenzy, psychotic battle rage,
mystic purple ambient light, Psion split-pupil rune glow,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

---

## 建筑（9张）

### 45. barracks — 兵营
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
a neutral military barracks building with soldiers marching in formation outside, no faction insignia on structure, universal military design, boot camp training ground, obstacle course and firing range visible, regimental flag flying, military training facility, soldier production center,
neutral gray-green ambient light,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

### 46. war_factory — 战车工厂
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
a neutral military war factory assembly line with tanks under construction, no faction insignia on factory, universal industrial design, robotic arms welding armor plates, sparks flying, half-built vehicles on production line, industrial manufacturing might, armored vehicle production plant,
neutral gray-green ambient light,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

### 47. ore_refinery — 矿厂
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
a neutral military ore refinery with smelting furnaces glowing orange, no faction insignia on facility, universal resource design, conveyor belts carrying ore, smokestacks billowing, resource processing machinery, molten metal flowing, economic engine of war, mineral processing facility,
neutral gray-green ambient light,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

### 48. radar — 雷达
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
a neutral military radar installation with rotating dish antenna, no faction insignia on tower, universal surveillance design, radar screen showing blips inside control room, communication tower with blinking lights, surveillance outpost, early warning system, intelligence gathering station,
neutral gray-green ambient light,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

### 49. repair — 修理厂
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
a neutral military vehicle repair bay with damaged tank on lift, no faction insignia on facility, universal maintenance design, mechanics welding and hammering, spare parts and tools scattered, sparks from angle grinder, hydraulic repair arms, field maintenance facility, battlefield repair station,
neutral gray-green ambient light,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

### 50. battle_lab — 作战实验室
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
a neutral military high-tech battle laboratory, no faction insignia on building, universal research design, scientists in white coats, holographic weapon displays, prototype weapons on test benches, advanced research equipment, classified technology development, military science facility,
neutral gray-green ambient light,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

### 51. nuke_silo — 核弹发射井
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
a neutral military nuclear missile silo deep underground, no faction insignia on facility, universal superweapon design, massive ICBM in launch tube, countdown display on wall, reinforced blast doors, launch control console with red button, silo cover retracting, apocalyptic weapon ready to fire,
neutral gray-green ambient light,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

### 52. aegis_device — 力场装置
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
a neutral military aegis field superweapon device, no faction insignia on generator, universal defense design, massive cylindrical generator with arc coils, red energy field emanating outward, force field projection array, invulnerability machine, impenetrable defense system,
neutral gray-green ambient light,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

### 53. psi_sensor — 灵能探测器
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
a neutral military psi sensor device, no faction insignia on equipment, universal intelligence design, brain-wave detection array, purple scanning beams projecting outward, enemy intentions revealed on display screen, mind-reading surveillance equipment, psychic intelligence apparatus,
neutral gray-green ambient light,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

---

## 中立（3张）

### 54. engineer — 工程师
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
a neutral military engineer in hard hat with toolbox, no faction insignia on uniform, universal military design, wrench in one hand and blueprints in other, repair drone hovering nearby, construction scaffolding behind, resourceful builder, battlefield mechanic and fixer,
neutral gray-green ambient light,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

### 55. attack_dog — 警犬
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
a neutral military attack dog lunging forward, no faction insignia on collar, universal military design, fangs bared, spiked collar, muscles tense for the kill, handler's leash taut, ears pinned back, predator's focus in eyes, trained combat canine,
neutral gray-green ambient light,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

### 56. war_cry — 战争号令
```
Realistic fantasy thick-painting style, Hearthstone card illustration quality, thick oil painting brushstrokes, high saturation colors,
a neutral military battlefield war-cry siren blaring, no faction insignia on installation, universal military design, red warning lights flashing, soldiers rushing to battle stations, alarm klaxon sounding, urgent mobilization scene, full battle alert, all hands to combat,
neutral gray-green ambient light,
dramatic left-side warm yellow lighting, dark gradient background, metallic texture details, oil painting thick brushstroke texture, game card vertical illustration, no text, no watermark, vertical composition, 3:4 ratio
```

---

## 安装包 / 应用 Logo 提示词

> 用途：桌面应用 & 安装包图标、启动/标题品牌图。与卡牌插画区分——logo 采用**金属徽章风**（非厚涂油画），核心诉求是缩到 16px 仍可辨认。
> 母题：**赤焦战争纹章** —— 一枚焊化/烧灼过的金属战争纹章，赤潮火红为主色，纹章缝隙透出蓝(同盟)/紫(灵能)能量微光，居中强剪影，暗示三阵营对撞。
> 依赖：图标最终由 `electron/icon-gen.py` 裁成 16/32/48/64/128/256 各尺寸的 .ico/.icns（当前源图为 battle_start.jpg，可用本方案替换为专属 logo）。

**图标注意事项：**
- 图标条**不放文字**（`no text`）——文字缩到 16px 必糊；辨识度靠 `bold heavy silhouette` + 居中纹章。
- 标题图才放英文 `CRIMSONFRONT`（SDXL 出英文比中文可靠）；若需中文「赤焦前线」，建议出图后叠字更稳。
- 两条共用"焦化金属纹章 + 火红主色 + 蓝/紫能量缝"母题，保证与卡牌同属"写实军事奇幻"大调性。

### L1. app_icon — 方形应用/安装包图标（1:1）
```
Video game app icon, emblematic logo design, a scorched battle-worn metallic war crest centered on dark background, crimson-red molten glowing core, edges rimmed with faint blue and purple energy cracks, bold heavy silhouette, symmetrical heraldic composition, thick embossed metal with scorch marks and battle scratches, dramatic rim lighting, high contrast, clean dark radial-gradient background, no text, no watermark, centered, readable at small sizes, 1:1 square ratio
```

### L2. title_splash — 宽幅启动/标题品牌图（16:9，以 L1 图标为参考图）

> **不要独立出图。** title_splash 必须复用 L1 产出的纹章，保证两图同源。纯文字 prompt 各出各的会画出完全不同的纹章。

**工作流（方案 B：图生图 / 扩图）：**
1. 先用 L1 出方形图标图，存为 `icon_source.png`（1:1）。这是纹章的唯一来源。
2. 将 `icon_source.png` 放入 16:9 画布**居中**，用**扩图 (outpainting)** 向左右（及上下）补全周围战场背景，**锁定中心纹章区不重绘** → 纹章像素级一致。
3. `CRIMSONFRONT` 标题文字**出图后期叠加**（不让模型画），保证清晰、可随时换中文「赤焦前线」。

> 需支持图生图/扩图的工具（SD WebUI / ComfyUI / 带 init image 的 API）。若不支持扩图，退用 **img2img / IP-Adapter**：以 `icon_source.png` 为 init/参考图，denoise 强度 `0.35–0.5`（或 IP-Adapter 权重 `~0.7`），纹章造型被参考图约束，prompt 只补全宽幅背景。

**参考图 prompt（正向，配合 init image 使用；末尾 `no text` 因标题走后期合成）：**
```
(img2img / outpaint, init image = app_icon crest, keep center crest unchanged)
scorched metallic war crest at center (from reference), crimson-red molten glow, blue and purple energy cracks, expand outward into a smoky dark battlefront horizon with drifting embers, dramatic cinematic lighting, epic war-game key art mood, seamless blend with the central crest, high saturation, 16:9 ratio, no text
```

---
