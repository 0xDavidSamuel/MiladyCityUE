import { create } from 'zustand'

export const useStore = create((set) => ({
  categories: {
    hair: ['hair-0', 'hair-1', 'hair-2'],
    eyes: ['eyes-0', 'eyes-1', 'eyes-2'],
    top: ['top-0', 'top-1', 'top-2'],
    bottom: ['bottom-0', 'bottom-1', 'bottom-2'],
    shoes: ['shoes-0', 'shoes-1', 'shoes-2'],
    accessory: ['acc-0', 'acc-1', 'acc-2']
  },
  
  selections: {
    hair: null,
    eyes: null,
    top: null,
    bottom: null,
    shoes: null,
    accessory: null
  },
  
  wallet: null,
  
  setSelection: (category, asset) =>
    set((state) => ({
      selections: { ...state.selections, [category]: asset }
    })),
  
  setWallet: (wallet) => set({ wallet }),
  
  resetSelections: () =>
    set({
      selections: {
        hair: null,
        eyes: null,
        top: null,
        bottom: null,
        shoes: null,
        accessory: null
      }
    })
}))
