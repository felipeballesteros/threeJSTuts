import { useEffect, useState } from "react"

export default function People() {

  const [people, setPeople] = useState([])

  const getPeople = async () => {
    const data = await fetch('https://jsonplaceholder.typicode.com/users')
    const jsonResponse = await data.json()
    setPeople(jsonResponse)
  }

  // Keep in mind getPeople needs to be called inside of a function
  useEffect( () => { getPeople() }, [])

  return (
  <div>
    <h2>People</h2>
    <ul>
      { people.map( person =>
        <li key={ person.id }>{ person.name }</li>
      )}
    </ul>
  </div>)
}