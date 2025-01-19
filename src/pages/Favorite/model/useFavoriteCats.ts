import { useLocalStorage } from 'usehooks-ts'

const useFavoriteCats = () => {
  const [likedCats, setLikedCats] = useLocalStorage<string[]>('likedCats', [])

  const addCatToFavorites = (catId: string) => {
    if (!likedCats.includes(catId)) {
      setLikedCats([...likedCats, catId])
    }
  }

  const removeCatFromFavorites = (catId: string) => {
    setLikedCats(likedCats.filter((id) => id !== catId))
  }

  const isLiked = (catId: string) => likedCats.includes(catId)

  return { isLiked, addCatToFavorites, removeCatFromFavorites, likedCats }
}

export default useFavoriteCats
