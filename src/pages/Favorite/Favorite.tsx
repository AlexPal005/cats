import { useGetCatsByListIds } from '../../entities/cat/api/getCatsByListIds.ts'
import { CatsList } from '../../features/catsList/ui/CatsList.tsx'
import useFavoriteCats from './model/useFavoriteCats.ts'

export const Favorite = () => {
  const { likedCats } = useFavoriteCats()

  //get favorite cats
  const catsData = useGetCatsByListIds(likedCats)

  return (
    <div>
      <h1 className="text-4xl font-extrabold text-center text-purple-500 my-6">
        Your Favorite Cats
      </h1>
      <p className="text-lg text-center text-gray-600 mb-6">
        To remove a cat from the list, click the heart icon.
      </p>
      <CatsList catsData={catsData} />
    </div>
  )
}
