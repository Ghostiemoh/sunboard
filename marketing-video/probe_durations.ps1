$shell = New-Object -ComObject Shell.Application
$folder = $shell.NameSpace('C:\Users\Muhammad\Documents\AntiGravity\marketing-video\public\raw_pitch')
foreach ($item in $folder.Items()) {
    if ($item.Name -like "*.MOV") {
        $duration = $folder.GetDetailsOf($item, 27)
        "$($item.Name): $duration" | Out-File -Append out.txt
    }
}
