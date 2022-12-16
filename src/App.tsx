import { useState } from 'react'
import { Router } from './components/Router'
import Context from './context/Context'
import { Greeting } from './components/greeting/Greeting'
import './App.css'

export const App = () => {
  const [userName, setUserName] = useState<string>('Anonymous')

  return (
    <div className='App'>
      <Greeting />
      <Context.Provider value={{ userName, setUserName }}>
        <Router />
      </Context.Provider>
    </div>
  )
}
