with open('components/cinematic/TechStack/TechStack3D.jsx', 'r') as f:
 content = f.read()

old = ('\t<div\n'
 '\tclassName="tech-icon"\n'
 '\tstyle={{\n'
 '\t\twidth: "32px",\n'
 '\t\theight: "32px",\n'
 '\t\tborderRadius: "50%",\n'
 '\t\tbackground: hoveredTech.color || "#00D4FF",\n'
 '\t\tdisplay: "flex",\n'
 '\t\talignItems: "center",\n'
 '\t\tjustifyContent: "center",\n'
 '\t\tcolor: "#fff",\n'
 '\t\tfontSize: "14px",\n'
 '\t\tfontWeight: "bold",\n'
 '\t\tflexShrink: 0\n'
 '\t}}\n'
 '>\n'
 '\t{hoveredTech.name.charAt(0)}\n'
 '</div>')

new = ('\t<img\n'
 '\t\tsrc={hoveredTech.icon}\n'
 '\t\talt={hoveredTech.name}\n'
 '\t\tclassName="tech-icon"\n'
 '\t/>')

if old in content:
	content = content.replace(old, new)
	with open('components/cinematic/TechStack/TechStack3D.jsx', 'w') as f:
		f.write(content)
	print('SUCCESS')
else:
	print('NOT FOUND')
