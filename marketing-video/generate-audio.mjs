/**
 * Generate properly formatted audio WAV assets for Remotion.
 * Uses standard PCM WAV format with correct headers.
 */

import { writeFileSync } from "fs";

const SAMPLE_RATE = 44100;
const BITS_PER_SAMPLE = 16;
const NUM_CHANNELS = 1;

function float32ToWav(floatSamples) {
  const numSamples = floatSamples.length;
  const bytesPerSample = BITS_PER_SAMPLE / 8;
  const blockAlign = NUM_CHANNELS * bytesPerSample;
  const byteRate = SAMPLE_RATE * blockAlign;
  const dataSize = numSamples * bytesPerSample;
  const headerSize = 44;
  const buffer = Buffer.alloc(headerSize + dataSize);

  // RIFF chunk descriptor
  buffer.write("RIFF", 0, "ascii");
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write("WAVE", 8, "ascii");

  // fmt sub-chunk
  buffer.write("fmt ", 12, "ascii");
  buffer.writeUInt32LE(16, 16);           // Subchunk1Size (PCM)
  buffer.writeUInt16LE(1, 20);            // AudioFormat: 1 = PCM
  buffer.writeUInt16LE(NUM_CHANNELS, 22); // NumChannels
  buffer.writeUInt32LE(SAMPLE_RATE, 24);  // SampleRate
  buffer.writeUInt32LE(byteRate, 28);     // ByteRate
  buffer.writeUInt16LE(blockAlign, 30);   // BlockAlign
  buffer.writeUInt16LE(BITS_PER_SAMPLE, 32); // BitsPerSample

  // data sub-chunk
  buffer.write("data", 36, "ascii");
  buffer.writeUInt32LE(dataSize, 40);

  // Write samples as signed 16-bit little-endian
  for (let i = 0; i < numSamples; i++) {
    const clamped = Math.max(-1.0, Math.min(1.0, floatSamples[i]));
    const intVal = Math.round(clamped * 32767);
    buffer.writeInt16LE(intVal, headerSize + i * bytesPerSample);
  }

  return buffer;
}

// ── 1. Ambient Drone (45 seconds) ──
function generateDrone(durationSec) {
  const n = SAMPLE_RATE * durationSec;
  const out = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / SAMPLE_RATE;
    const a = Math.sin(2 * Math.PI * 55 * t);
    const b = Math.sin(2 * Math.PI * 55.3 * t);
    const h = Math.sin(2 * Math.PI * 82.5 * t) * 0.3;
    const lfo = 0.7 + 0.3 * Math.sin(2 * Math.PI * 0.08 * t);
    const fadeIn = Math.min(1, t / 3);
    const fadeOut = Math.min(1, (durationSec - t) / 3);
    out[i] = ((a + b) * 0.35 + h) * lfo * fadeIn * fadeOut * 0.12;
  }
  return out;
}

// ── 2. UI Tick (0.1s) ──
function generateTick() {
  const dur = 0.1;
  const n = Math.round(SAMPLE_RATE * dur);
  const out = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / SAMPLE_RATE;
    const env = Math.exp(-t * 50);
    const tone = Math.sin(2 * Math.PI * 2400 * t) * 0.4 + Math.sin(2 * Math.PI * 4800 * t) * 0.2;
    out[i] = tone * env * 0.35;
  }
  return out;
}

// ── 3. Whoosh (0.5s) ──
function generateWhoosh() {
  const dur = 0.5;
  const n = Math.round(SAMPLE_RATE * dur);
  const out = new Float64Array(n);
  // Filtered noise sweep
  let prev = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SAMPLE_RATE;
    const p = t / dur;
    const env = Math.sin(Math.PI * p) * (1 - p * 0.5);
    const noise = Math.random() * 2 - 1;
    // Variable low-pass cutoff
    const alpha = 0.2 + 0.6 * p;
    const filtered = alpha * noise + (1 - alpha) * prev;
    prev = filtered;
    out[i] = filtered * env * 0.3;
  }
  return out;
}

// ── 4. Success Chime (0.6s) – C5 E5 G5 arpeggio ──
function generateChime() {
  const dur = 0.6;
  const n = Math.round(SAMPLE_RATE * dur);
  const out = new Float64Array(n);
  const notes = [523.25, 659.25, 783.99];
  const gap = 0.07;
  for (let ni = 0; ni < notes.length; ni++) {
    const start = Math.round(ni * gap * SAMPLE_RATE);
    for (let i = start; i < n; i++) {
      const t = (i - start) / SAMPLE_RATE;
      const env = Math.exp(-t * 7);
      out[i] += Math.sin(2 * Math.PI * notes[ni] * t) * env * 0.18;
    }
  }
  return out;
}

// Generate and write
writeFileSync("public/drone.wav", float32ToWav(generateDrone(45)));
writeFileSync("public/tick.wav", float32ToWav(generateTick()));
writeFileSync("public/whoosh.wav", float32ToWav(generateWhoosh()));
writeFileSync("public/chime.wav", float32ToWav(generateChime()));

process.stdout.write("Audio assets generated: drone.wav, tick.wav, whoosh.wav, chime.wav\n");
