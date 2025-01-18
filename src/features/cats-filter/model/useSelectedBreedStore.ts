import { create } from 'zustand'
import { Breed } from '../../../entities/cat/types/catTypes.ts'

interface SelectedBreedState {
  selectedBreed: Breed | null
  setSelectedBreed: (breed: Breed) => void
  clearSelectedBreed: () => void
}

export const useSelectedBreedStore = create<SelectedBreedState>()((set) => ({
  selectedBreed: null,
  setSelectedBreed: (breed: Breed) => set({ selectedBreed: breed }),
  clearSelectedBreed: () => set({ selectedBreed: null }),
}))
