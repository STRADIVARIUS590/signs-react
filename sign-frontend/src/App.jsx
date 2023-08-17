import { useState } from 'react'
import reactLogo from './assets/react.svg'
import NavBar from './components/NavBar'
import ShowUser from './components/ShowUser'
import Home from './pages/home'
import Login from './pages/Login'
import Register from './pages/Register'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Login/>
    </>
  )
}

export default App
