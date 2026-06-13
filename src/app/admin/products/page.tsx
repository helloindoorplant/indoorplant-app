import prisma from '@/lib/prisma';
import Image from "next/image";
import Link from "next/link";
import { Plus, Search, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteProductButton } from "@/components/admin/DeleteProductButton";



export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  const PRODUCTS = await prisma.product.findMany({
    include: { categories: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your plant catalog and inventory.</p>
        </div>
        <Link href="/admin/products/new">
          <Button className="flex items-center px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {PRODUCTS.map((product) => {
                const images = JSON.parse(product.images as string);
                return (
                  <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 relative border border-gray-100">
                          <Image 
                            src={images[0]} 
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {product.categories && product.categories.length > 0 ? (
                          <>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                              {product.categories[0].name}
                            </span>
                            {product.categories.length > 1 && (
                              <span 
                                className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-600 border border-gray-200 cursor-help" 
                                title={product.categories.slice(1).map((c: any) => c.name).join(', ')}
                              >
                                +{product.categories.length - 1}
                              </span>
                            )}
                          </>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                            Uncategorized
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">₹{Number(product.price)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${(product.stock ?? 0) > 10 ? 'bg-green-500' : (product.stock ?? 0) > 0 ? 'bg-amber-500' : 'bg-red-500'}`} />
                        <span className="text-sm text-gray-700">{product.stock} units</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/products/${product.id}`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-primary hover:bg-primary/10">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <DeleteProductButton id={product.id} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
          <p className="text-sm text-gray-500">Showing 1 to {PRODUCTS.length} of {PRODUCTS.length} results</p>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1 border border-gray-200 rounded text-sm text-gray-500 hover:bg-white disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 border border-gray-200 rounded text-sm bg-primary text-white">1</button>
            <button className="px-3 py-1 border border-gray-200 rounded text-sm text-gray-500 hover:bg-white">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
