import Clicker from "./Clicker"
import { useState, useMemo } from 'react'

export default function App({ clickersCount, children }){

  const [ hasClicker, setHasClicker ] = useState(true)
  const [ count, setCount] = useState(0)

  const toggleClickerClick = () => {
    setHasClicker(!hasClicker)
  }

  const increment = () => {
    setCount(count + 1)
  }
  
  const colors = useMemo(() => {

    // By default only called once
    const colors = []
    for (let i = 0; i < clickersCount; i++){
      colors.push(`hsl(${ Math.random() * 360 }deg, 100%, 70%)`)
    }
    return colors
  }, 
  // Dependencies that force a re-run of useMemo
  [clickersCount])


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
              keyName={ `count${index}` } 
              color={ colors[index] }
            />
          )}
        </>
      }
    </>
  )
}