import fs from 'fs';
import path from 'path';

const SCHEMA_DIR = path.join(process.cwd(), 'prisma/schema');
const OUTPUT = path.join(process.cwd(), 'prisma/schema.prisma');

const files = fs
  .readdirSync(SCHEMA_DIR)
  .filter((f) => f.endsWith('.prisma'))
  .sort(); // đảm bảo thứ tự

const content = files
  .map((file) => fs.readFileSync(path.join(SCHEMA_DIR, file), 'utf8'))
  .join('\n\n');

fs.writeFileSync(OUTPUT, content);

console.log('✅ Prisma schema built from:', files);
