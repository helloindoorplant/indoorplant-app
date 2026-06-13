// @ts-nocheck
import Database from 'better-sqlite3';
import { PrismaClient } from '@prisma/client';
import path from 'path';

const prisma = new PrismaClient();

async function migrateData() {
  console.log('Connecting to prisma/dev.db (SQLite)...');
  const db = new Database(path.join(process.cwd(), 'prisma', 'dev.db'));

  console.log('Connected to local SQLite database.');

  try {
    // 1. Migrate Categories
    console.log('--- Migrating Categories ---');
    const categories = db.prepare('SELECT * FROM Category').all() as any[];
    for (const cat of categories) {
      const exists = await prisma.category.findUnique({ where: { slug: cat.slug } });
      if (!exists) {
        await prisma.category.create({
          data: {
            id: cat.id,
            name: cat.name,
            slug: cat.slug,
            description: cat.description,
            image: cat.image,
            createdAt: new Date(cat.createdAt),
            updatedAt: new Date(cat.updatedAt),
          }
        });
        console.log(`Inserted Category: ${cat.name}`);
      } else {
        console.log(`Skipped Category (Already Exists): ${cat.name}`);
      }
    }

    // 2. Migrate Products
    console.log('--- Migrating Products ---');
    const products = db.prepare('SELECT * FROM Product').all() as any[];
    for (const prod of products) {
      const exists = await prisma.product.findUnique({ where: { slug: prod.slug } });
      if (!exists) {
        await prisma.product.create({
          data: {
            id: prod.id,
            name: prod.name,
            slug: prod.slug,
            description: prod.description + (prod.shortDescription ? '\\n\\n' + prod.shortDescription : ''),
            price: prod.price,
            salePrice: prod.discountPrice || null,
            stock: prod.stock,
            images: prod.images || '[]',
            isFeatured: prod.isFeatured === 1,
            // connect category
            categories: prod.categoryId ? { connect: [{ id: prod.categoryId }] } : undefined,
            createdAt: new Date(prod.createdAt),
            updatedAt: new Date(prod.updatedAt),
          }
        });
        console.log(`Inserted Product: ${prod.name}`);
      } else {
        console.log(`Skipped Product (Already Exists): ${prod.name}`);
      }
    }

    // 3. Migrate Users
    console.log('--- Migrating Users ---');
    const users = db.prepare('SELECT * FROM User').all() as any[];
    for (const user of users) {
      if (!user.email) continue;
      const exists = await prisma.user.findUnique({ where: { email: user.email } });
      if (!exists) {
        await prisma.user.create({
          data: {
            id: user.id,
            name: user.name,
            email: user.email,
            emailVerified: user.emailVerified ? new Date(user.emailVerified) : null,
            image: user.image,
            password: user.password,
            role: user.role,
            createdAt: new Date(user.createdAt),
            updatedAt: new Date(user.updatedAt),
          }
        });
        console.log(`Inserted User: ${user.email}`);
      } else {
        console.log(`Skipped User (Already Exists): ${user.email}`);
      }
    }

    // 4. Migrate Reviews
    console.log('--- Migrating Reviews ---');
    const reviews = db.prepare('SELECT * FROM Review').all() as any[];
    for (const review of reviews) {
      const exists = await prisma.review.findUnique({ where: { id: review.id } });
      if (!exists) {
        await prisma.review.create({
          data: {
            id: review.id,
            rating: review.rating,
            comment: review.comment,
            productId: review.productId,
            userId: review.userId,
            createdAt: (review.createdAt && !isNaN(new Date(review.createdAt).getTime())) ? new Date(review.createdAt) : new Date(),
          }
        });
        console.log(`Inserted Review for product: ${review.productId}`);
      }
    }

    // 5. Migrate Orders
    console.log('--- Migrating Orders ---');
    const orders = db.prepare('SELECT * FROM "Order"').all() as any[];
    for (const order of orders) {
      const exists = await prisma.order.findUnique({ where: { id: order.id } });
      if (!exists) {
        await prisma.order.create({
          data: {
            id: order.id,
            userId: order.userId,
            status: order.status,
            totalAmount: order.totalAmount,
            paymentId: order.paymentId,
            orderId: order.orderId,
            signature: order.signature,
            shippingAddr: order.shippingAddr || '{}',
          }
        });
        console.log(`Inserted Order: ${order.id}`);
      }
    }

    // 6. Migrate OrderItems
    console.log('--- Migrating OrderItems ---');
    const orderItems = db.prepare('SELECT * FROM OrderItem').all() as any[];
    for (const item of orderItems) {
      const exists = await prisma.orderItem.findUnique({ where: { id: item.id } });
      if (!exists) {
        await prisma.orderItem.create({
          data: {
            id: item.id,
            orderId: item.orderId,
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          }
        });
        console.log(`Inserted OrderItem: ${item.id}`);
      }
    }

    console.log('--- Migration Completed Successfully! ---');
  } catch (error) {
    console.error('Error during migration:', error);
  } finally {
    db.close();
    await prisma.$disconnect();
  }
}

migrateData();
