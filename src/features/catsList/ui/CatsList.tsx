import { CatCard } from '../../../entities/cat/ui/CatCard.tsx'
import { useGetCats } from '../../../entities/cat/api/getCats.ts'
import { ErrorInfo } from '../../error/ErrorInfo.tsx'
import { Preloader } from '../../preloader/Preloader.tsx'
import { useSelectedBreedStore } from '../../cats-filter/model/useSelectedBreedStore.ts'

export const CatsList = () => {
  const { selectedBreed } = useSelectedBreedStore()
  const {
    data: cats,
    isLoading,
    error,
  } = useGetCats(undefined, selectedBreed?.id)

  // useEffect(() => {
  //   console.log(cats)
  // }, [cats])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Preloader />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ErrorInfo message="Error while retrieving cats!" />
      </div>
    )
  }

  if (cats && cats.length > 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {cats.map((cat) => (
          <CatCard cat={cat} key={cat.id} />
        ))}
      </div>
    )
  }
}
