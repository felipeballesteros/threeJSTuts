import Clicker from "./Clicker"
import { useState } from 'react'

export default function App({ children }){

  const [ hasClicker, setHasClicker ] = useState(true)
  const [ count, setCount] = useState(0)

  const toggleClickerClick = () => {
    setHasClicker(!hasClicker)
  }

  const increment = () => {
    setCount(count + 1)
  }

  return (
    <>
      { children }
      <div>Total Count: {count }</div> <br />
      <button onClick={ toggleClickerClick }>{ hasClicker ? 'Hide' : 'Show' } Clicker</button>
      { hasClicker &&
        <>
          <Clicker increment={ increment } keyName='countA' color='red'/>
          <Clicker increment={ increment } keyName='countB' color='green'/>
          <Clicker increment={ increment } keyName='countC' color='yellow'/>
        </>
      }
    </>
  )
}