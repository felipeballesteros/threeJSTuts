import Clicker from "./Clicker"
import { useState } from 'react'

export default function App(){

  const [ hasClicker, setHasClicker ] = useState(true)

  const toggleClickerClick = () => {
    setHasClicker(!hasClicker)
  }

  return (
    <>
      <button onClick={ toggleClickerClick }>{ hasClicker ? 'Hide' : 'Show' } Clicker</button>
      { hasClicker && <Clicker /> }
    </>
  )
}