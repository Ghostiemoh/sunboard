$lines = @(
    "The market moves at 400 milliseconds. Your research takes minutes.",
    "Missed opportunities are the cost of fragmented data.",
    "Meet Sunboard. The intelligence terminal for the Sunrise ecosystem.",
    "Proprietary algorithmic scoring. Price velocity. Liquidity depth. On-chain flow.",
    "From intel to execution. Sunboard Terminal. Precision data. Zero friction."
)

Add-Type -AssemblyName System.Speech
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
# Try to find a good voice
$synth.SelectVoiceByHints('Male')
$synth.Rate = 0 # Normal speed

for ($i = 0; $i -lt $lines.Length; $i++) {
    $outFile = "c:\Users\Muhammad\Documents\AntiGravity\marketing-video\public\sunboard_vo_$i.wav"
    $synth.SetOutputToWaveFile($outFile)
    $synth.Speak($lines[$i])
}

$synth.Dispose()
Write-Host "Generated Sunboard TTS chunks."
