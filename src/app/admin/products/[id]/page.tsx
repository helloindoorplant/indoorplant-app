import prisma from '@/lib/prisma';
import { ProductForm } from "@/components/admin/ProductForm";
import { notFound } from "next/navigation";



export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const product = await prisma.product.findUnique({
    where: { id: resolvedParams.id }
  });

  if (!product) {
    notFound();
  }

  const categories = await prisma.category.findMany();
  
  return (
    <div className="py-6">
      <ProductForm product={product} categories={categories} />
    </div>
  );
}
