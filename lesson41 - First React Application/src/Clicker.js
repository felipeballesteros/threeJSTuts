import { useEffect, useState } from 'react'

export default function Clicker() {

  const [count, setCount] = useState(parseInt(localStorage.getItem('count') ?? 0))

  // First Time Render
  useEffect(() => {
    console.log('component created')

    // Function executed when component is being destroyed
    return () => {
      console.log('component destroyed')
      localStorage.removeItem('count')
    }
  }, [])

  // Any other re-render besides the first one
  useEffect(() => {
    localStorage.setItem('count', count)
  }, [ count ])
  
  const buttonClick = () => {
    setCount( count + 1 )
  }

  return(
    <div>
      <div>Click Count: {count}</div>
      <button onClick={ buttonClick }>Click Me</button>
    </div>
  ) 
}