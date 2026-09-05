const fs = require('fs');
const p = String.raw`C:\Users\rajpa\OneDrive\Desktop\ojix\Ojix 1.0 Modification\app\cinematic\globals-cinematic.css`;
let c = fs.readFileSync(p, 'utf8');

// Use regex to match the overflow: hidden line and insert after it
c = c.replace(
 /(\.tech-stack-3d-container \{[^}]*?)overflow: hidden;\n/,
 `$1overflow: hidden;
 background: rgba(18, 20, 24, 0.45);
 backdrop-filter: blur(12px);
 -webkit-backdrop-filter: blur(12px);
`
);
fs.writeFileSync(p, c);
console.log('Done!');
