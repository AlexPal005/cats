import { useEffect, useRef, useState } from 'react'
import { useSearchBreeds } from '../../../entities/cat/api/searchBreeds.ts'
import { Preloader } from '../../preloader/Preloader.tsx'
import { Breed } from '../../../entities/cat/types/catTypes.ts'
import { useSelectedBreedStore } from '../model/useSelectedBreedStore.ts'
import useClickOutside from '../model/useClickOutside.ts'
import { ErrorInfo } from '../../error/ErrorInfo.tsx'

export const CatsFilter = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
  const [searchBreed, setSearchBreed] = useState<string>('')
  const [debouncedSearchBreed, setDebouncedSearchBreed] = useState<string>('')
  const {
    data: breeds,
    isLoading,
    error,
  } = useSearchBreeds(debouncedSearchBreed)
  const dropdownRef = useRef<HTMLDivElement>(null)
  useClickOutside(dropdownRef, () => setIsDropdownOpen(false))
  const { selectedBreed, setSelectedBreed, clearSelectedBreed } =
    useSelectedBreedStore()

  useEffect(() => {
    clearSelectedBreed()
  }, [clearSelectedBreed])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchBreed(searchBreed)
    }, 1000)

    return () => clearTimeout(timer)
  }, [searchBreed])

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

  return (
    <div className="relative w-full max-w-md" ref={dropdownRef}>
      <div className="flex items-center">
        <input
          type="text"
          value={searchBreed}
          onChange={handleSearchChange}
          className="w-full p-2 border rounded-md pr-12"
          placeholder="Search for cat breed..."
          onFocus={() => setIsDropdownOpen(true)}
        />
      </div>

      {isDropdownOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white shadow-lg rounded-md border max-h-64 overflow-y-auto">
          {isLoading && (
            <div className="text-gray-500 py-2">
              <Preloader size="text-base" />
            </div>
          )}

          {error && <ErrorInfo message={'Error while retrieving cats!'} />}

          {breeds && breeds.length > 0 && (
            <>
              {breeds.map((breed) => (
                <div
                  key={breed.id}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSelectBreed(breed)}
                >
                  {breed.name}
                </div>
              ))}
            </>
          )}
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
    </div>
  )
}
