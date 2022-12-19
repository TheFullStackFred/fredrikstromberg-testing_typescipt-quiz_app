import { useNavigate } from 'react-router-dom'
import { NameInput } from '../components/NameInput/NameInput'
import '../'
export const Home = () => {
  const navigate = useNavigate()

  const nextPage = () => navigate('/quiz')

  return (
    <div className='container'>
      <h1>Welcome!</h1>
      <p>Enter your name or just click next</p>
      <NameInput />
      <button onClick={nextPage}>Next</button>
    </div>
  )
}
