import { useEffect, useRef, useState } from 'react'
import { useSearchBreeds } from '../../../entities/cat/api/searchBreeds.ts'
import { Preloader } from '../../preloader/Preloader.tsx'
import { Breed } from '../../../entities/cat/types/catTypes.ts'
import { useSelectedBreedStore } from '../model/useSelectedBreedStore.ts'

export const CatsFilter = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
  const [searchBreed, setSearchBreed] = useState<string>('')
  const [debouncedSearchBreed, setDebouncedSearchBreed] = useState<string>('')
  const { data: breeds, isLoading } = useSearchBreeds(debouncedSearchBreed)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { selectedBreed, setSelectedBreed, clearSelectedBreed } =
    useSelectedBreedStore()

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchBreed(searchBreed)
    }, 1000)

    return () => clearTimeout(timer)
  }, [searchBreed])

  useEffect(() => {
    console.log(breeds)
  }, [breeds])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearchChange = (e: { target: { value: string } }) => {
    setSearchBreed(e.target.value)
    setIsDropdownOpen(true)

    if (selectedBreed && e.target.value !== selectedBreed.name) {
      clearSelectedBreed()
    }
  }

  const handleSelectBreed = (breed: Breed) => {
    setSelectedBreed(breed)
    setSearchBreed(breed.name)
    setIsDropdownOpen(false)
  }

  const handleSearchCats = () => {
    if (selectedBreed) {
      console.log(`Searching cats for breed: ${selectedBreed}`)
    }
  }

  return (
    <div className="relative w-full max-w-md">
      <div className="flex items-center">
        <input
          type="text"
          value={searchBreed}
          onChange={handleSearchChange}
          className="w-full p-2 border rounded-md pr-12"
          placeholder="Search for cat breed..."
          onFocus={() => setIsDropdownOpen(true)} // відкриваємо список при фокусі
        />

        {isLoading && (
          <div className="absolute right-2">
            <Preloader size="text-xs" />
          </div>
        )}
      </div>

      {isDropdownOpen && breeds && breeds.length > 0 && !isLoading && (
        <div
          ref={dropdownRef}
          className="absolute z-10 w-full mt-2 bg-white shadow-lg rounded-md border max-h-64 overflow-y-auto"
        >
          {breeds.map((breed) => (
            <div
              key={breed.id}
              className="p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelectBreed(breed)}
            >
              {breed.name}
            </div>
          ))}
        </div>
      )}

      {isDropdownOpen && breeds && breeds.length === 0 && !isLoading && (
        <div
          ref={dropdownRef}
          className="absolute z-10 w-full mt-2 bg-white shadow-lg rounded-md border"
        >
          <div className="p-2 text-gray-500">No breeds found</div>
        </div>
      )}

      {!selectedBreed && (
        <div className="text-gray-500 mt-2">
          Please select a breed to search for cats
        </div>
      )}

      <button
        onClick={handleSearchCats}
        disabled={!selectedBreed}
        className={`mt-4 w-full py-2 px-4 rounded-md ${
          selectedBreed
            ? 'bg-blue-500 text-white'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        Search Cats
      </button>
    </div>
  )
}
