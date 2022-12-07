import { useNavigate } from 'react-router-dom'
import { NameInput } from '../components/NameInput'

export const Home = () => {
  const navigate = useNavigate()

  const nextPage = () => navigate('/quiz')

  return (
    <>
      <h1>Welcome! Enter your name or just click next</h1>
      <NameInput />
      <button onClick={nextPage}>Next</button>
    </>
  )
}
