import { useEffect, useState, useRef } from 'react'

export default function Clicker({ increment, keyName, color = 'white'}) {

  const [count, setCount] = useState(parseInt(localStorage.getItem(keyName) ?? 0))
  const buttonRef = useRef()

  // First Time Render
  useEffect(() => {
    //console.log('component created')

    //update buttonRef after first pass
    buttonRef.current.style.backgroundColor = 'papayawhip'
    buttonRef.current.style.color = 'salmon'

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
    increment()
  }

  return(
    <div>
      <div style={{color}}>Click Count: {count}</div>
      <button ref={ buttonRef } onClick={ buttonClick }>Click Me</button>
    </div>
  ) 
}