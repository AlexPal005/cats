import { Breed } from '../types/catTypes.ts'
import axiosInstance from '../../../app/axios/axiosInstance.ts'
import { useQuery } from '@tanstack/react-query'

const searchBreeds = async (searchName: string): Promise<Breed[]> => {
  const res = await axiosInstance.get(
    `api/breeds/search?q=${searchName}&attach_image=1`
  )
  return res.data
}

export const useSearchBreeds = (searchName: string) => {
  return useQuery({
    queryKey: ['breeds', searchName],
    queryFn: () => searchBreeds(searchName || ''),
  })
}
