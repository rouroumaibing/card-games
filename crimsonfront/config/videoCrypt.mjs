export const VIDEO_XOR_KEY = 'cf-tactical-video-xor-2026-key!!';

export const SPELL_VIDEO = {
  airborne: 'paratroops.bin',
  arc_overload: 'lightning-chain.bin',
  nuke: 'nuclear-detonation.bin',
};

export function xorBytes(bytes, key = VIDEO_XOR_KEY) {
  const kb = typeof key === 'string' ? new TextEncoder().encode(key) : key;
  const out = new Uint8Array(bytes.length);
  const klen = kb.length;
  for (let i = 0; i < bytes.length; i++) out[i] = bytes[i] ^ kb[i % klen];
  return out;
}