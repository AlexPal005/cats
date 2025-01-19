import axiosInstance from '../../../app/axios/axiosInstance.ts'
import { Cat } from '../types/catTypes.ts'
import { useQuery } from '@tanstack/react-query'

const getCats = async (
  countOfCats: number,
  breedId?: string
): Promise<Cat[]> => {
  const params: { [key: string]: string | number } = {
    limit: countOfCats,
    has_breeds: 1,
  }

  if (breedId) {
    params.breed_ids = breedId
  }

  const res = await axiosInstance.get('api/images/search', { params })
  return res.data
}

export const useGetCats = (countOfCats?: number, breedId?: string) => {
  return useQuery({
    queryKey: ['cats', countOfCats, breedId],
    queryFn: () => getCats(countOfCats || 10, breedId),
    staleTime: 5 * 60 * 1000, //5 minutes
  })
}
