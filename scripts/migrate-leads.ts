// @ts-nocheck
import { PrismaClient } from '@prisma/client';
import Database from 'better-sqlite3';

const prisma = new PrismaClient();
const db = new Database('prisma/dev.db');

async function migrateLeads() {
  const leads = db.prepare('SELECT * FROM ChatLead').all() as any[];
  for (const lead of leads) {
    const exists = await prisma.chatLead.findUnique({ where: { id: lead.id } });
    if (!exists) {
      await prisma.chatLead.create({
        data: {
          id: lead.id,
          name: lead.name,
          phone: lead.phone,
          createdAt: new Date(lead.createdAt)
        }
      });
      console.log('Inserted ChatLead:', lead.name);
    }
  }
}

migrateLeads().catch(console.error).finally(() => prisma.$disconnect());
