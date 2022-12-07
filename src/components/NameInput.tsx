import { ChangeEvent, useContext } from 'react'
import Context from '../context/Context'

export const NameInput = () => {
  const { setUserName } = useContext(Context)

  const addName = (e: ChangeEvent<HTMLInputElement>) =>
    setUserName(e.target.value)

  return (
    <>
      <input type='text' placeholder='Name...' onChange={addName} />
    </>
  )
}
