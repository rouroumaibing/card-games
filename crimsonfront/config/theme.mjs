// card-games/crimsonfront/config/theme.mjs — CrimsonFront 观感（深蓝/红/金）。
export default {
  meta: { id: 'crimsonfront', title: '赤焦前线：卡牌战争', version: 'v0.1.0' },
  tokens: {
    '--bg-0': '#060912', '--bg-1': '#0d1524', '--bg-panel': '#0a0f1dcc',
    '--text-0': '#e6f1ff', '--text-1': '#6b86a8',
    '--accent': '#ff2e4c', '--accent-2': '#21e6ff', '--accent-contrast': '#060912',
    '--glow': '#ff2e4caa', '--hud-line': '#21e6ff55',
    '--danger': '#ff2e4c', '--ok': '#35e08a', '--neutral': '#5c7291',
  },
  fonts: {
    '--font-title': "Orbitron, 'Microsoft YaHei', sans-serif",
    '--font-body': "'Segoe UI', 'Microsoft YaHei', Arial, sans-serif",
    '--font-number': "'Share Tech Mono', ui-monospace, monospace",
  },
  factions: { coalition: '#4a90d9', crimson: '#d94a4a', psion: '#9b59b6' },
  tabs: [
    { id: 'home', label: '主页', icon: '🏠' },
    { id: 'match', label: '对战', icon: '⚔' },
    { id: 'gallery', label: '图鉴', icon: '📖' },
    { id: 'deck', label: '卡组', icon: '🃏' },
    { id: 'settings', label: '设置', icon: '⚙' },
    { id: 'profile', label: '个人', icon: '👤' },
  ],
  home: {
    logo: '赤焦前线', subtitle: '卡牌战争',
    background: '/card-games/crimsonfront/config/assets/title_splash.png',
    buttons: [
      { id: 'btn-pve', label: '⚔ 人机对战', route: 'match', params: { mode: 'pve' } },
      { id: 'btn-online', label: '🌐 联网对战', route: 'onlineLobby' },
    ],
  },
  gallery: {
    title: '卡牌图鉴',
    artBasePath: '/card-games/crimsonfront/config/assets/cards',
    artEnabled: true,
    factionLabels: { coalition: '同盟', crimson: '赤潮', psion: '灵能', neutral: '中立' },
    rarities: [
      { id: 'common', label: '普通' },
      { id: 'rare', label: '稀有' },
      { id: 'epic', label: '史诗' },
      { id: 'legendary', label: '传说' },
    ],
  },
  deck: {
    title: '卡组管理',
    rules: {
      size: 30, maxCopies: 2,
      groups: [
        { key: 'building', label: '建筑', max: 3, match: { field: 'type', eq: 'building' } },
        { key: 'superweapon', label: '超级武器', max: 1, match: { all: [{ field: 'type', eq: 'spell' }, { field: 'rarity', eq: 'legendary' }] } },
      ],
    },
  },
  settings: {
    title: '游戏设置',
    labels: {
      difficulty: { easy: '新兵', medium: '老兵', hard: '指挥官' },
      animSpeed: { slow: '慢', normal: '中', fast: '快' },
    },
  },
  profile: { title: '个人中心', defaultUsername: '指挥官' },
  battle: {
    labels: {
      yourTurn: '你的回合', enemyTurn: '敌方回合', endTurn: '结束回合',
      concede: '投降', concedeConfirm: '确认撤退？此战判负。',
      win: '战役胜利', lose: '战役失败', draw: '两败俱伤',
      rematch: '再战一局', backHome: '返回基地',
    },
    base: { playerAvatar: null, opponentAvatar: null },
    card: { artBasePath: '../config/assets/cards', artEnabled: true },
  },
  match: {
    labels: {
      title: '出击部署', selectDeck: '选择卡组', selectOpponent: '选择对手',
      selectDifficulty: '选择难度', start: '开战',
    },
  },
  online: {
    serverUrl: 'ws://localhost:8099',
    lobby: {
      title: '联网前线',
      backLabel: '返回基地',
      quickMatchLabel: '快速匹配',
      createRoomLabel: '创建房间',
      joinRoomLabel: '加入',
      roomIdPlaceholder: '房间号',
      waitingLabel: '正在搜索对手…',
      cancelLabel: '取消',
    },
    disconnect: {
      graceMs: 180000,
      reconnectWindowMs: 170000,
      toastText: '对手断线，等待重连…',
      timeoutText: '对手已撤离战场',
    },
  },
  chat: {
    maxLen: 200,
    rateLimit: { window: 3000, max: 5 },
    maxBuffer: 100,
    presets: {
      lobby: ['你好，指挥官', '准备就绪', '稍等片刻', '开战吧'],
      battle: ['好牌！', '稍等', 'GG', '打得漂亮', '再战一局'],
    },
    labels: {
      title: '战地通讯',
      placeholder: '输入消息…',
      send: '发送',
      collapse: '折叠',
    },
  },
};
