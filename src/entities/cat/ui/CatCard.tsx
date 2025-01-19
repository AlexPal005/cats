import { Cat } from '../types/catTypes.ts'
import { FaHeart } from 'react-icons/fa'
import useFavoriteCats from '../../../pages/Favorite/model/useFavoriteCats.ts'

interface CatCardProps {
  cat: Cat
}

export const CatCard = ({ cat }: CatCardProps) => {
  const { isLiked, addCatToFavorites, removeCatFromFavorites } =
    useFavoriteCats()

  const handleLike = () => {
    if (isLiked(cat.id)) {
      removeCatFromFavorites(cat.id)
    } else {
      addCatToFavorites(cat.id)
    }
  }
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={cat.url}
        alt={cat.breeds[0]?.name || 'Cat'}
        className="w-full h-64 object-cover"
      />
      <div className="p-4 flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-800">
          {cat.breeds[0]?.name}
        </h3>
        <FaHeart
          onClick={handleLike}
          className={`cursor-pointer ${isLiked(cat.id) ? 'text-red-500' : 'text-gray-500'}`}
        />
      </div>
    </div>
  )
}
