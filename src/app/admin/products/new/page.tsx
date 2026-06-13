import { ProductForm } from "@/components/admin/ProductForm";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function NewProductPage() {
  const categories = await prisma.category.findMany();
  
  return (
    <div className="py-6">
      <ProductForm categories={categories} />
    </div>
  );
}
