import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const FALLBACK_PLANT_IMAGE = "https://images.unsplash.com/photo-1416879598555-22003c2db724?auto=format&fit=crop&q=80&w=800";
