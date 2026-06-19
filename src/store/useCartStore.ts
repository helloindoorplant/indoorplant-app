import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string; // The product ID
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  potType?: string;
  potColor?: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string, size?: string, potType?: string, potColor?: string) => void;
  updateQuantity: (id: string, size: string | undefined, potType: string | undefined, potColor: string | undefined, quantity: number) => void;
  clearCart: () => void;
  
  // Computed values that we will evaluate inside components or as part of the state
  subtotal: () => number;
  totalItems: () => number;

  isDrawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (newItem) => set((state) => {
        // check if item already exists (matching id and variations if applicable)
        const existingItem = state.items.find(item => item.id === newItem.id && item.size === newItem.size && item.potType === newItem.potType && item.potColor === newItem.potColor);
        
        if (existingItem) {
          return {
            items: state.items.map(item => 
              (item.id === newItem.id && item.size === newItem.size && item.potType === newItem.potType && item.potColor === newItem.potColor)
              ? { ...item, quantity: item.quantity + newItem.quantity }
              : item
            )
          };
        } else {
          return { items: [...state.items, newItem] };
        }
      }),
      removeItem: (id, size, potType, potColor) => set((state) => ({
        items: state.items.filter(item => !(item.id === id && item.size === size && item.potType === potType && item.potColor === potColor))
      })),
      updateQuantity: (id, size, potType, potColor, quantity) => set((state) => ({
        items: state.items.map(item => 
          (item.id === id && item.size === size && item.potType === potType && item.potColor === potColor) 
            ? { ...item, quantity: Math.max(1, quantity) } 
            : item
        )
      })),
      clearCart: () => set({ items: [] }),
      
      subtotal: () => get().items.reduce((total, item) => total + item.price * item.quantity, 0),
      totalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),

      isDrawerOpen: false,
      setDrawerOpen: (open) => set({ isDrawerOpen: open }),
    }),
    {
      name: 'indoorplant-cart-storage',
    }
  )
);
