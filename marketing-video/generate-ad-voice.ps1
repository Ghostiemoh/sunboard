$lines = @(
    "The global financial system is fragmented. Slow. Unpredictable.",
    "Enter Vertex. The definitive Layer-zero settlement protocol.",
    "Surgical execution. Sub-second finality. Zero friction.",
    "Create, sign, and settle cross-chain invoices with cryptographic certainty.",
    "Vertex. Architect the future of commerce. Start building today."
)

Add-Type -AssemblyName System.Speech
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
$synth.SelectVoiceByHints('Male')
$synth.Rate = -1 # slightly slower, cinematic

for ($i = 0; $i -lt $lines.Length; $i++) {
    $outFile = "c:\Users\Muhammad\Documents\AntiGravity\marketing-video\public\vo_$i.wav"
    $synth.SetOutputToWaveFile($outFile)
    $synth.Speak($lines[$i])
}

$synth.Dispose()
Write-Host "Generated TTS chunks."
