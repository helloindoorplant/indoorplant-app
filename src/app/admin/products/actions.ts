"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function saveProduct(formData: FormData) {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const salePriceStr = formData.get("salePrice") as string;
  const salePrice = salePriceStr ? parseFloat(salePriceStr) : null;
  const stock = parseInt(formData.get("stock") as string, 10);
  const isFeatured = formData.get("isFeatured") === "on";
  
  const categoryIds = formData.getAll("categoryIds") as string[];
  const careLevel = formData.get("careLevel") as string;
  const lightReq = formData.get("lightReq") as string;
  const waterReq = formData.get("waterReq") as string;
  const petFriendly = formData.get("petFriendly") === "on";
  const airPurifier = formData.get("airPurifier") === "on";
  
  const imagesInput = formData.get("images") as string;
  let images = ["https://images.unsplash.com/photo-1416879598555-3850742518fa?auto=format&fit=crop&w=800&q=80"];
  if (imagesInput) {
    images = imagesInput.split(",").map(url => url.trim()).filter(Boolean);
  }

  const potColorGreen = formData.get("potColorGreen") as string;
  const potColorBlue = formData.get("potColorBlue") as string;
  const potColorWhite = formData.get("potColorWhite") as string;
  const potColorYellow = formData.get("potColorYellow") as string;

  const potColorImagesObj: Record<string, string> = {};
  if (potColorGreen) potColorImagesObj.Green = potColorGreen.trim();
  if (potColorBlue) potColorImagesObj.Blue = potColorBlue.trim();
  if (potColorWhite) potColorImagesObj.White = potColorWhite.trim();
  if (potColorYellow) potColorImagesObj.Yellow = potColorYellow.trim();

  const baseData = {
    name,
    slug,
    description,
    price,
    salePrice,
    stock,
    isFeatured,
    careLevel,
    lightReq,
    waterReq,
    petFriendly,
    airPurifier,
    images: JSON.stringify(images),
    potColorImages: Object.keys(potColorImagesObj).length > 0 ? JSON.stringify(potColorImagesObj) : null,
  };

  if (id) {
    await prisma.product.update({
      where: { id },
      data: {
        ...baseData,
        categories: { set: categoryIds.map(id => ({ id })) }
      }
    });
  } else {
    await prisma.product.create({
      data: {
        ...baseData,
        categories: { connect: categoryIds.map(id => ({ id })) }
      }
    });
  }

  revalidatePath("/admin/products");
  revalidatePath("/shop");
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({
    where: { id }
  });
  
  revalidatePath("/admin/products");
  revalidatePath("/shop");
}
