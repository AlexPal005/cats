import axiosInstance from '../../../app/axios/axiosInstance.ts'
import { Cat } from '../types/catTypes.ts'
import { useQuery } from '@tanstack/react-query'

const getCats = async (
  countOfCats: number,
  breedId?: string
): Promise<Cat[]> => {
  const url = `api/images/search?limit=${countOfCats}&has_breeds=1${
    breedId ? `&breed_ids=${breedId}` : ''
  }`

  const res = await axiosInstance.get(url)
  console.log(res.data)
  return res.data
}

export const useGetCats = (countOfCats?: number, breedId?: string) => {
  return useQuery({
    queryKey: ['cats', countOfCats, breedId],
    queryFn: () => getCats(countOfCats || 10, breedId),
  })
}
