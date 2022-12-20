import Clicker from "./Clicker"
import { useState } from 'react'

export default function App({ clickersCount, children }){

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
          {[...Array(clickersCount)].map( (value, index) => 
            <Clicker
              key={ index }
              increment={ increment } 
              keyName={`count${index}`} 
              color='red'
            />
          )}
        </>
      }
    </>
  )
}