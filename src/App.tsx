import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Route, Routes } from 'react-router-dom'
import { Main } from './pages/home/ui/Main.tsx'
import { Favorite } from './pages/Favorite/Favorite.tsx'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/favorite" element={<Favorite />}></Route>
      </Routes>
    </QueryClientProvider>
  )
}

export default App
