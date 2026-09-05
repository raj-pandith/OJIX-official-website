import os

path = r'C:\Users\rajpa\OneDrive\Desktop\ojix\Ojix 1.0 Modification\app\globals.css'
with open(path, 'r') as f:
	content = f.read()

old_block = """@media (max-width: 620px) {
 .svc-grid, .ind-grid, .frow { grid-template-columns: 1fr; }
 .hero-ticks { gap: 24px; }
 .foot-grid { grid-template-columns: 1fr; }
 .foot-brand { grid-column: 1 / -1; }
 .foot-brand p { max-width: 100%; }
 .foot-cols { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
 .hero h1 { font-size: 40px; }
}"""

new_block = """@media (max-width: 620px) {
 .svc-grid, .ind-grid, .frow { grid-template-columns: 1fr; }
 .hero-ticks { gap: 24px; }
 .foot-grid { grid-template-columns: 1fr; }
 .foot-brand { grid-column: 1 / -1; }
 .foot-brand p { max-width: 100%; }
 .foot-cols { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
 .hero h1 { font-size: 40px; }
 .cform { padding: 24px 16px; }
 .ff input, .ff select, .ff textarea { padding: 10px 14px; font-size: 14px; }
 .ff select { background-position: right 12px center; padding-right: 36px; }
}"""

if old_block in content:
	content = content.replace(old_block, new_block)
	print('Replaced')
else:
	print('Old block not found, trying line-by-line')
	lines = content.split('\n')
	new_lines = []
	i = 0
	while i < len(lines):
		if '@media (max-width: 620px)' in lines[i]:
			new_lines.append(lines[i])
			i += 1
			# Copy until closing brace
			while i < len(lines) and lines[i].strip() != '}':
				new_lines.append(lines[i])
				i += 1
			# Add closing brace
			if i < len(lines):
				new_lines.append(lines[i])
				i += 1
			# Add mobile form styles
			new_lines.append(' .cform { padding: 24px 16px; }')
			new_lines.append(' .ff input, .ff select, .ff textarea { padding: 10px 14px; font-size: 14px; }')
			new_lines.append(' .ff select { background-position: right 12px center; padding-right: 36px; }')
			new_lines.append('}')
			continue
		new_lines.append(lines[i])
		i += 1
	content = '\n'.join(new_lines)

with open(path, 'w') as f:
	f.write(content)
print('Done')
