import { Cat } from '../types/catTypes.ts'
import { FaHeart } from 'react-icons/fa'
import { useState } from 'react'

interface CatCardProps {
  cat: Cat
}

export const CatCard = ({ cat }: CatCardProps) => {
  const [likedCats, setLikedCats] = useState<string[]>(() => {
    const savedLikes = localStorage.getItem('likedCats')
    return savedLikes ? JSON.parse(savedLikes) : []
  })
  const isLiked = likedCats.includes(cat.id)

  const handleLike = () => {
    let updatedLikedCats: string[]

    if (isLiked) {
      updatedLikedCats = likedCats.filter((id) => id !== cat.id)
    } else {
      updatedLikedCats = [...likedCats, cat.id]
    }

    setLikedCats(updatedLikedCats)
    localStorage.setItem('likedCats', JSON.stringify(updatedLikedCats)) // Зберігаємо в локальному сховищі
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
          className={`cursor-pointer ${isLiked ? 'text-red-500' : 'text-gray-500'}`}
        />
      </div>
    </div>
  )
}
