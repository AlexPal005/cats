import { CatsList } from '../../../features/catsList/ui/CatsList.tsx'
import { CatsFilter } from '../../../features/cats-filter/ui/CatsFilter.tsx'

export const Main = () => {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4">
      <div className="w-full max-w-2xl mb-4 flex justify-center">
        <CatsFilter />
      </div>
      <CatsList />
    </div>
  )
}
