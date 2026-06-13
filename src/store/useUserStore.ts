import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/lib/data';

interface UserAddress {
  id: string;
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pinCode: string;
  phone: string;
  isDefault: boolean;
}

interface PlantJournalEntry {
  id: string;
  productId: string;
  plantName: string;
  purchaseDate: string;
  notes: string;
  lastWatered?: string;
}

interface UserState {
  wishlist: Product[];
  addresses: UserAddress[];
  plantJournal: PlantJournalEntry[];
  recentlyViewed: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  addRecentlyViewed: (product: Product) => void;
  addAddress: (address: Omit<UserAddress, 'id'>) => void;
  removeAddress: (id: string) => void;
  addPlantJournalEntry: (entry: Omit<PlantJournalEntry, 'id'>) => void;
  waterPlant: (journalId: string) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      wishlist: [],
      recentlyViewed: [],
      addresses: [],
      plantJournal: [],

      addToWishlist: (product) => {
        const current = get().wishlist;
        if (!current.some((p) => p.id === product.id)) {
          set({ wishlist: [...current, product] });
        }
      },

      removeFromWishlist: (productId) => {
        set({ wishlist: get().wishlist.filter((p) => p.id !== productId) });
      },

      isInWishlist: (productId) => {
        return get().wishlist.some((p) => p.id === productId);
      },

      addRecentlyViewed: (product) => {
        const current = get().recentlyViewed;
        const filtered = current.filter((p) => p.id !== product.id);
        set({ recentlyViewed: [product, ...filtered].slice(0, 10) });
      },

      addAddress: (address) => {
        const newAddress = { ...address, id: Math.random().toString(36).substring(7) };
        const updated = [...get().addresses, newAddress];
        if (address.isDefault) {
          // Unset other defaults if this is default
          updated.forEach((a) => {
            if (a.id !== newAddress.id) a.isDefault = false;
          });
        }
        set({ addresses: updated });
      },

      removeAddress: (id) => {
        set({ addresses: get().addresses.filter((a) => a.id !== id) });
      },

      addPlantJournalEntry: (entry) => {
        set({
          plantJournal: [
            ...get().plantJournal,
            { ...entry, id: Math.random().toString(36).substring(7) },
          ],
        });
      },

      waterPlant: (journalId) => {
        set({
          plantJournal: get().plantJournal.map((entry) =>
            entry.id === journalId
              ? { ...entry, lastWatered: new Date().toISOString() }
              : entry
          ),
        });
      },
    }),
    {
      name: 'indoorplant-user-storage',
    }
  )
);
