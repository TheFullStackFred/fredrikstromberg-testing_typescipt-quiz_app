import { Routes, Route } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Quiz } from '../pages/Quiz'

export const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='Quiz' element={<Quiz />} />
    </Routes>
  )
}
