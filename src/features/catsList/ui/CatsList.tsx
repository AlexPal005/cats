import { CatCard } from '../../../entities/cat/ui/CatCard.tsx'
import { ErrorInfo } from '../../error/ErrorInfo.tsx'
import { Preloader } from '../../preloader/Preloader.tsx'
import { Cat } from '../../../entities/cat/types/catTypes.ts'

export interface CatsListProps {
  catsData: {
    data: Cat[] | undefined
    isLoading: boolean
    error: unknown
  }
}

export const CatsList = ({ catsData }: CatsListProps) => {
  const { data: cats, isLoading, error } = catsData

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-150px)]">
        <Preloader />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-150px)]">
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

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-150px)]">
      <p>No cats found</p>
    </div>
  )
}
