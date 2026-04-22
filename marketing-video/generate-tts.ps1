Add-Type -AssemblyName System.Speech
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
$synth.SelectVoiceByHints('Male')
$synth.SetOutputToWaveFile("c:\Users\Muhammad\Documents\AntiGravity\marketing-video\public\vo_test.wav")
$synth.Speak('Testing voice over generation. Vertex. The definitive Web3 settlement protocol.')
$synth.Dispose()
