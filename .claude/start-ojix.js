const { spawn } = require("child_process");
process.chdir("C:\\Users\\rajpa\\OneDrive\\Desktop\\ojix\\Ojix 1.0 Modification");
const child = spawn("cmd", ["/c", "npx", "next", "dev", "-p", "3000"], { stdio: "inherit", shell: false });
child.on("error", (err) => { console.error("Spawn error:", err); process.exit(1); });
child.on("exit", (code) => process.exit(code || 0));
