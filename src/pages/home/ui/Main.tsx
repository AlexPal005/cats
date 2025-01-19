import { CatsList } from '../../../features/catsList/ui/CatsList.tsx'
import { CatsFilter } from '../../../features/cats-filter/ui/CatsFilter.tsx'
import { useGetCats } from '../../../entities/cat/api/getCats.ts'
import { useSelectedBreedStore } from '../../../features/cats-filter/model/useSelectedBreedStore.ts'
import { Link } from 'react-router-dom'

export const Main = () => {
  const { selectedBreed } = useSelectedBreedStore()

  const catsData = useGetCats(undefined, selectedBreed?.id)

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4 relative">
      <div className="w-full max-w-2xl mb-4 flex justify-center">
        <CatsFilter />
      </div>

      <Link
        to="/favorite"
        className="bg-red-500 text-white rounded-md shadow-lg hover:bg-red-400 p-2 md:absolute md:top-4 md:right-8 "
      >
        Favorite
      </Link>

      <CatsList catsData={catsData} />
    </div>
  )
}
