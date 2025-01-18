import { useEffect } from 'react'
import { useGetCats } from '../../queries/cat.ts'

export const Main = () => {
  const { data: cats, isLoading, error } = useGetCats()

  useEffect(() => {
    console.log(cats)
  }, [cats])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (cats) {
    return (
      <div>
        {cats.map((cat) => (
          <img src={cat.url} alt={cat.breeds[0].name} />
        ))}
      </div>
    )
  }
}
