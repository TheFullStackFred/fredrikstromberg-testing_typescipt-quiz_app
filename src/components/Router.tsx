import { Routes, Route } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Quiz } from '../pages/quiz/Quiz'

export const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='Quiz' element={<Quiz />} />
      <Route path='*' element={<h1>404 error</h1>} />
    </Routes>
  )
}
