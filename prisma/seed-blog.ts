import { PrismaClient } from '@prisma/client';
import { BLOG_POSTS } from '../src/lib/blog-data';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting blog data migration...');

  for (const post of BLOG_POSTS) {
    console.log(`Processing: ${post.title}`);

    // Create or find Author
    const authorSlug = post.author.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const author = await prisma.author.upsert({
      where: { slug: authorSlug },
      update: {},
      create: {
        slug: authorSlug,
        name: post.author.name,
        role: post.author.role,
        avatar: post.author.avatar,
      },
    });

    // Create or find Category
    const categorySlug = post.category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const category = await prisma.blogCategory.upsert({
      where: { slug: categorySlug },
      update: {},
      create: {
        slug: categorySlug,
        name: post.category,
      },
    });

    // Create Article
    await prisma.article.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        image: post.image,
        readTime: post.readTime,
        featured: post.featured ?? false,
        metaTitle: post.metaTitle,
        metaDescription: post.metaDescription,
        keywords: JSON.stringify(post.keywords),
        faqSchema: post.faqSchema ? JSON.stringify(post.faqSchema) : null,
        categoryId: category.id,
        authorId: author.id,
      },
      create: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        image: post.image,
        readTime: post.readTime,
        featured: post.featured ?? false,
        metaTitle: post.metaTitle,
        metaDescription: post.metaDescription,
        keywords: JSON.stringify(post.keywords),
        faqSchema: post.faqSchema ? JSON.stringify(post.faqSchema) : null,
        categoryId: category.id,
        authorId: author.id,
        isActive: true,
        isIndexed: true,
      },
    });
  }

  console.log('✅ Blog data migration completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
