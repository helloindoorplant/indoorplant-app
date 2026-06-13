// @ts-nocheck
import fs from 'fs';
import path from 'path';

function walk(dir: string, callback: (filepath: string) => void) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      walk(filepath, callback);
    } else if (filepath.endsWith('.ts') || filepath.endsWith('.tsx')) {
      callback(filepath);
    }
  }
}

function refactorPrisma() {
  let count = 0;
  walk(path.join(process.cwd(), 'src'), (filepath) => {
    let content = fs.readFileSync(filepath, 'utf8');
    
    // Check if the file instantiates PrismaClient
    if (content.includes('new PrismaClient()')) {
      // Remove import { PrismaClient } from '@prisma/client' if present
      content = content.replace(/import\s*\{\s*PrismaClient\s*\}\s*from\s*['"]@prisma\/client['"];?\n?/g, '');
      
      // Replace const prisma = new PrismaClient(); with import prisma from '@/lib/prisma';
      // Wait, we should put the import at the top.
      content = content.replace(/(export\s+)?const\s+prisma\s*=\s*new\s+PrismaClient\([^)]*\);?/g, '');
      
      // Also remove local instances inside functions like in api/chat/route.ts
      content = content.replace(/const\s+prisma\s*=\s*new\s+PrismaClient\([^)]*\);?/g, '');
      content = content.replace(/await\s+prisma\.\$disconnect\(\);?/g, '');
      
      // Add import to top
      const importStmt = `import prisma from '@/lib/prisma';\n`;
      content = importStmt + content;
      
      fs.writeFileSync(filepath, content, 'utf8');
      console.log('Refactored', filepath);
      count++;
    }
  });
  console.log(`Refactored ${count} files.`);
}

refactorPrisma();
