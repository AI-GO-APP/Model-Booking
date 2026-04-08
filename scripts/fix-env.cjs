const fs = require('fs');
const path = require('path');
const dir = __dirname;

const files = fs.readdirSync(dir).filter(f => f.endsWith('.cjs'));

const fixes = [
  {
    from: /['"]playground-super-admin@ai-go\.app['"]/g,
    to: "process.env.AIGO_SUPER_ADMIN_EMAIL"
  },
  {
    from: /['"]PlaygroundAdmin123!['"]/g,
    to: "process.env.AIGO_SUPER_ADMIN_PASSWORD"
  },
  {
    from: /['"]https:\/\/booking-platform\.staging\.ai-go\.app['"]/g,
    to: "process.env.VITE_SITE_ORIGIN"
  }
];

files.forEach(file => {
  if (file === 'fix-env.cjs') return;
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Add env check logic at the top if it uses AIGO_SUPER_ADMIN_EMAIL
  const requiresAdmin = content.includes('playground-super-admin') || content.includes('process.env.AIGO_SUPER_ADMIN_EMAIL');
  
  fixes.forEach(fix => {
    if (fix.from.test(content)) {
      content = content.replace(fix.from, fix.to);
      changed = true;
    }
  });

  if (changed) {
    if (requiresAdmin && !content.includes('AIGO_SUPER_ADMIN_EMAIL')) {
      // Actually we already replaced it, so it will contain process.env.AIGO_SUPER_ADMIN_EMAIL
    }
    
    // Inject requirement
    if (requiresAdmin && !content.includes('requireEnv')) {
      const inject = `
const requireEnv = (key) => {
  if (!process.env[key]) {
    console.error(\`Fatal Error: \${key} is not set in environment variables.\`);
    process.exit(1);
  }
};
requireEnv('AIGO_SUPER_ADMIN_EMAIL');
requireEnv('AIGO_SUPER_ADMIN_PASSWORD');
\n`;
      content = inject + content;
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed hardcodings in ${file}`);
  }
});
