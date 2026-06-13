import prisma from '@/lib/prisma';
import { ProductForm } from "@/components/admin/ProductForm";



export default async function NewProductPage() {
  const categories = await prisma.category.findMany();
  
  return (
    <div className="py-6">
      <ProductForm categories={categories} />
    </div>
  );
}
