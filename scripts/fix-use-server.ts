// @ts-nocheck
import fs from 'fs';
import path from 'path';

const files = [
  'src/app/actions/reviews.ts',
  'src/app/admin/orders/actions.ts',
  'src/app/admin/products/actions.ts',
  'src/app/admin/settings/actions.ts'
];

for (const file of files) {
  const filepath = path.join(process.cwd(), file);
  let content = fs.readFileSync(filepath, 'utf8');
  
  if (content.includes('"use server"') || content.includes("'use server'")) {
    // Remove it from wherever it is
    content = content.replace(/["']use server["'];?\n?/g, '');
    
    // Add it to the very top
    content = '"use server";\n' + content;
    
    fs.writeFileSync(filepath, content, 'utf8');
    console.log('Fixed', file);
  }
}
