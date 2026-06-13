"use client";

import { deleteProduct } from "@/app/admin/products/actions";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useTransition } from "react";

export function DeleteProductButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this product?")) {
      startTransition(() => {
        deleteProduct(id);
      });
    }
  };

  return (
    <Button 
      onClick={handleDelete}
      disabled={isPending}
      variant="ghost" 
      size="icon" 
      className="h-8 w-8 text-gray-500 hover:text-red-600 hover:bg-red-50"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}
