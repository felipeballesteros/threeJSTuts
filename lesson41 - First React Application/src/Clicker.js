import { useEffect, useState } from 'react'

export default function Clicker({ keyName, color = 'white'}) {

  const [count, setCount] = useState(parseInt(localStorage.getItem(keyName) ?? 0))

  // First Time Render
  useEffect(() => {
    //console.log('component created')

    // Function executed when component is being destroyed
    return () => {
      //console.log('component destroyed')
      localStorage.removeItem(keyName)
    }
  }, [])

  // Any other re-render besides the first one
  useEffect(() => {
    localStorage.setItem(keyName, count)
  }, [ count ])
  
  const buttonClick = () => {
    setCount( count + 1 )
  }

  return(
    <div>
      <div style={{color}}>Click Count: {count}</div>
      <button onClick={ buttonClick }>Click Me</button>
    </div>
  ) 
}