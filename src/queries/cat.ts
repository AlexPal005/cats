import axiosInstance from '../axiosInstance.ts'
import { Cat } from './catTypes.ts'
import { useQuery } from '@tanstack/react-query'

const getCats = async (countOfCats: number): Promise<Cat[]> => {
  const res = await axiosInstance.get(
    `api/images/search?limit=${countOfCats}&has_breeds=1`
  )
  return res.data
}

export const useGetCats = (countOfCats: number = 10) => {
  return useQuery({
    queryKey: ['cats', countOfCats],
    queryFn: () => getCats(countOfCats),
  })
}
