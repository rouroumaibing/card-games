// card-games/crimsonfront/config/presetDecks.mjs — 10 套预设（照搬源仓 modules/engine/presetDecks.js）。配置层，允许游戏字符串。
const COALITION = [
  'weather', 'barracks', 'radar', 'war_factory', 'engineer', 'engineer',
  'attack_dog', 'attack_dog', 'war_cry', 'war_cry', 'rifleman', 'rifleman',
  'jet_trooper', 'jet_trooper', 'satellite', 'satellite', 'phase_legion', 'phase_legion',
  'tank_destroyer', 'tank_destroyer', 'sniper', 'sniper', 'airborne', 'airborne',
  'phantom_tank', 'phantom_tank', 'seal', 'seal', 'spy', 'spy',
];
const FRANCE = [
  'bastion_cannon', 'weather', 'barracks', 'radar', 'war_factory', 'engineer', 'engineer',
  'attack_dog', 'attack_dog', 'war_cry', 'war_cry', 'rifleman', 'rifleman',
  'jet_trooper', 'jet_trooper', 'satellite', 'satellite', 'phase_legion', 'phase_legion',
  'tank_destroyer', 'tank_destroyer', 'sniper', 'sniper', 'airborne', 'airborne',
  'phantom_tank', 'phantom_tank', 'seal', 'seal', 'spy',
];
const BRITAIN = [
  'sniper', 'weather', 'barracks', 'radar', 'war_factory', 'engineer', 'engineer',
  'attack_dog', 'attack_dog', 'war_cry', 'war_cry', 'rifleman', 'rifleman',
  'jet_trooper', 'jet_trooper', 'satellite', 'satellite', 'phase_legion', 'phase_legion',
  'tank_destroyer', 'tank_destroyer', 'sniper', 'airborne', 'airborne',
  'phantom_tank', 'phantom_tank', 'seal', 'seal', 'spy', 'spy',
];
const CRIMSON = [
  'nuke', 'barracks', 'radar', 'war_factory', 'engineer', 'engineer',
  'attack_dog', 'attack_dog', 'war_cry', 'war_cry', 'conscript', 'conscript',
  'sabotage_drone', 'sabotage_drone', 'mad_bomb', 'mad_bomb', 'arc_trooper', 'arc_trooper',
  'mad_bomber', 'mad_bomber', 'heavy_tank', 'heavy_tank', 'arc_tower', 'arc_tower',
  'demo_truck', 'demo_truck', 'arc_overload', 'arc_overload', 'rocket_truck', 'rocket_truck',
];
const PSILORD = [
  'barracks', 'radar', 'war_factory', 'engineer', 'engineer', 'attack_dog', 'attack_dog',
  'war_cry', 'war_cry', 'psi_initiate', 'psi_initiate', 'berserk', 'berserk',
  'psi_clone', 'psi_clone', 'thrall_miner', 'thrall_miner', 'savage', 'savage',
  'mag_tank', 'mag_tank', 'psi_master', 'psi_master', 'psi_tower', 'psi_tower',
  'psi_control', 'psi_control', 'thunder_sub', 'thunder_sub', 'gene_mut',
];

export default [
  { id: 'usa', name: '美国铁流', shortName: '美国', cardIds: [...COALITION] },
  { id: 'korea', name: '韩国精锐', shortName: '韩国', cardIds: [...COALITION] },
  { id: 'france', name: '法国要塞', shortName: '法国', cardIds: [...FRANCE] },
  { id: 'germany', name: '德国装甲', shortName: '德国', cardIds: [...COALITION] },
  { id: 'britain', name: '英国狙击', shortName: '英国', cardIds: [...BRITAIN] },
  { id: 'russia', name: '苏俄钢潮', shortName: '苏俄', cardIds: [...CRIMSON] },
  { id: 'libya', name: '利比亚爆破', shortName: '利比亚', cardIds: [...CRIMSON] },
  { id: 'iraq', name: '伊拉克辐射', shortName: '伊拉克', cardIds: [...CRIMSON] },
  { id: 'cuba', name: '古巴游击', shortName: '古巴', cardIds: [...CRIMSON] },
  { id: 'psilord', name: '灵主异能', shortName: '灵主', cardIds: [...PSILORD] },
];
