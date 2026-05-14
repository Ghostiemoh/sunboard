$shell = New-Object -ComObject Shell.Application
$folder = $shell.NameSpace('C:\Users\Muhammad\Documents\AntiGravity\marketing-video\public\raw_pitch')
$file = $folder.ParseName('IMG_9274.MOV')
for ($i = 0; $i -lt 320; $i++) {
    $name = $folder.GetDetailsOf($null, $i)
    $val = $folder.GetDetailsOf($file, $i)
    if ($val) {
        Write-Host "$($i) - $($name): $($val)"
    }
}
