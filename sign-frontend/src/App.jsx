import { useState } from 'react'
import reactLogo from './assets/react.svg'
import ShowUser from './components/ShowUser'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ShowUser/>
    </>
  )
}

export default App
