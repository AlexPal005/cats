import { Cat } from '../types/catTypes.ts'
import axiosInstance from '../../../app/axios/axiosInstance.ts'
import { useQuery } from '@tanstack/react-query'

/* The Cat Api doesn't have an endpoint for get cats by a list of ids,
 so we need to get each cat by its id*/

const getCatsByListIds = async (ids: string[]): Promise<Cat[]> => {
  const requests = ids.map((id) => {
    return axiosInstance.get(`api/images/${id}`)
  })
  const responses = await Promise.all(requests)
  return responses.map((response) => response.data)
}

export const useGetCatsByListIds = (ids: string[]) => {
  return useQuery({
    queryKey: ['cats', ids],
    queryFn: () => getCatsByListIds(ids),
  })
}
