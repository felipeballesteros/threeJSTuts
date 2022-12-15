import Clicker from "./Clicker"
import { useState } from 'react'

export default function App({ children }){

  const [ hasClicker, setHasClicker ] = useState(true)

  const toggleClickerClick = () => {
    setHasClicker(!hasClicker)
  }

  return (
    <>
      { children }
      <button onClick={ toggleClickerClick }>{ hasClicker ? 'Hide' : 'Show' } Clicker</button>
      { hasClicker &&
        <>
          <Clicker keyName='countA' color='red'/>
          <Clicker keyName='countB' color='green'/>
          <Clicker keyName='countC' color='yellow'/>
        </>
      }
    </>
  )
}