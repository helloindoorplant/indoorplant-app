"use client";

import { saveProduct } from "@/app/admin/products/actions";
import { Button } from "@/components/ui/button";
import { Product } from "@prisma/client";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="h-11 px-8 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors">
      <Save className="w-4 h-4 mr-2" />
      {pending ? "Saving..." : "Save Product"}
    </Button>
  );
}

export function ProductForm({ product, categories }: { product?: any | null, categories: any[] }) {
  const images = product ? JSON.parse(product.images as string) : [];
  const potColorImages = product?.potColorImages ? JSON.parse(product.potColorImages) : {};

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/products" className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-primary transition-colors shadow-sm">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{product ? "Edit Product" : "Add New Product"}</h1>
            <p className="text-sm text-gray-500 mt-1">{product ? "Update the details of your plant." : "Fill in the details to add a new plant to the catalog."}</p>
          </div>
        </div>
      </div>

      <form action={saveProduct} className="space-y-6">
        {product && <input type="hidden" name="id" value={product.id} />}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-4">Basic Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                  <input required type="text" name="name" defaultValue={product?.name} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" placeholder="e.g. Monstera Deliciosa" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL friendly) *</label>
                  <input required type="text" name="slug" defaultValue={product?.slug} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" placeholder="e.g. monstera-deliciosa" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <textarea required name="description" defaultValue={product?.description} rows={5} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" placeholder="Detailed product description..."></textarea>
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-4">Media</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URLs (comma separated) *</label>
                <textarea required name="images" defaultValue={images.join(", ")} rows={3} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" placeholder="https://image1.jpg, https://image2.jpg"></textarea>
                <p className="text-xs text-gray-500 mt-2">For this version, please provide direct image URLs separated by commas.</p>
              </div>
            </div>

            {/* Pot Color Images */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-4">Pot Color Variants</h3>
              <p className="text-sm text-gray-500">Provide an image URL for each pot color. When a customer selects this color on the product page, the main image will change to the URL provided here.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Green Pot URL</label>
                  <input type="text" name="potColorGreen" defaultValue={potColorImages.Green || ""} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" placeholder="https://..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Blue Pot URL</label>
                  <input type="text" name="potColorBlue" defaultValue={potColorImages.Blue || ""} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" placeholder="https://..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">White Pot URL</label>
                  <input type="text" name="potColorWhite" defaultValue={potColorImages.White || ""} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" placeholder="https://..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Yellow Pot URL</label>
                  <input type="text" name="potColorYellow" defaultValue={potColorImages.Yellow || ""} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" placeholder="https://..." />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Pricing & Inventory */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-4">Pricing & Inventory</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Regular Price (₹) *</label>
                  <input required type="number" step="0.01" name="price" defaultValue={product?.price} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sale Price (₹)</label>
                  <input type="number" step="0.01" name="salePrice" defaultValue={product?.salePrice || ""} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity *</label>
                  <input required type="number" name="stock" defaultValue={product?.stock ?? 10} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
              </div>
            </div>

            {/* Classification */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-4">Classification</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Categories *</label>
                  <div className="space-y-3 border border-gray-200 rounded-lg p-4 bg-gray-50 max-h-48 overflow-y-auto">
                    {categories.map(c => {
                      const isSelected = product?.categories?.some((pc: any) => pc.id === c.id);
                      return (
                        <label key={c.id} className="flex items-center gap-3 cursor-pointer">
                          <input 
                            type="checkbox" 
                            name="categoryIds" 
                            value={c.id} 
                            defaultChecked={isSelected}
                            className="rounded border-gray-300 text-primary focus:ring-primary w-4 h-4"
                          />
                          <span className="text-sm text-gray-700 font-medium">{c.name}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Care Level</label>
                  <select name="careLevel" defaultValue={product?.careLevel || "EASY"} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white">
                    <option value="EASY">Easy</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HARD">Hard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Light Requirement</label>
                  <select name="lightReq" defaultValue={product?.lightReq || "MEDIUM"} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white">
                    <option value="LOW">Low Light</option>
                    <option value="MEDIUM">Medium/Indirect</option>
                    <option value="HIGH">Bright/Direct</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Water Requirement</label>
                  <input type="text" name="waterReq" defaultValue={product?.waterReq || "Water once a week"} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>

                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" name="isFeatured" defaultChecked={product?.isFeatured} className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                    <span className="text-sm font-medium text-gray-700">Featured Product</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" name="petFriendly" defaultChecked={product?.petFriendly} className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                    <span className="text-sm font-medium text-gray-700">Pet Friendly</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" name="airPurifier" defaultChecked={product?.airPurifier} className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                    <span className="text-sm font-medium text-gray-700">Air Purifier</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-gray-200">
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
