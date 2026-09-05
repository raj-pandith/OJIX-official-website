$path = 'C:\Users\rajpa\OneDrive\Desktop\ojix\Ojix 1.0 Modification\app\cinematic\globals-cinematic.css'
$content = Get-Content $path -Raw
$old = @'
.tech-stack-3d-container {
 width: 100%;
 height: 600px;
 position: relative;
 border: 1px solid var(--color-border);
 border-radius: var(--radius-sm);
 overflow: hidden;
 }
'@
$new = @'
.tech-stack-3d-container {
 width: 100%;
 height: 600px;
 position: relative;
 border: 1px solid var(--color-border);
 border-radius: var(--radius-sm);
 overflow: hidden;
 background: rgba(18, 20, 24, 0.45);
 backdrop-filter: blur(12px);
 -webkit-backdrop-filter: blur(12px);
 }
'@
$content = $content.Replace($old, $new)
Set-Content $path $content
