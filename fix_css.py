import re

path = r'C:\Users\rajpa\OneDrive\Desktop\ojix\Ojix 1.0 Modification\app\cinematic\globals-cinematic.css'
with open(path, 'r', encoding='utf-8') as f:
 content = f.read()

old = '.tech-stack-3d-container {\n width: 100%;\n height: 600px;\n position: relative;\n border: 1px solid var(--color-border);\n border-radius: var(--radius-sm);\n overflow: hidden;\n }\n'

new = '.tech-stack-3d-container {\n width: 100%;\n height: 600px;\n position: relative;\n border: 1px solid var(--color-border);\n border-radius: var(--radius-sm);\n overflow: hidden;\n background: rgba(18, 20, 24, 0.45);\n backdrop-filter: blur(12px);\n -webkit-backdrop-filter: blur(12px);\n }\n'

if old in content:
 content = content.replace(old, new)
 with open(path, 'w', encoding='utf-8') as f:
 f.write(content)
 print("Success!")
else:
 print("Not found")
